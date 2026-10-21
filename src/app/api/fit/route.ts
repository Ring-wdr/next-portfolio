import { streamText } from "ai";
import { z } from "zod";
import { env } from "@/env";
import { isProviderUnavailable } from "@/feature/chat/server/chat-stream";
import { createFreeModel } from "@/feature/chat/server/model";
import {
  FIT_JD_MAX_LENGTH,
  FIT_JD_MIN_LENGTH,
  FIT_STREAM_CONTENT_TYPE,
  type FitApiResponse,
  type FitStreamEvent,
} from "@/feature/fit/lib/report";
import {
  buildFitSystemPrompt,
  buildFitUserPrompt,
  describeFitParseFailure,
  parseFitReport,
  parsePartialFitReport,
} from "@/feature/fit/server/analyze";
import { getProjects } from "@/shared/content/project-source";

export const maxDuration = 300;

const requestSchema = z.object({
  jd: z.string().trim().min(FIT_JD_MIN_LENGTH).max(FIT_JD_MAX_LENGTH),
  locale: z.enum(["ko", "en"]).default("ko"),
});

// Free models occasionally return malformed JSON; one retry is worth the quota.
const MAX_ATTEMPTS = 2;
// Re-parsing the growing reply on every token is wasteful; a few updates a second is enough.
const PROGRESS_INTERVAL_MS = 300;

function json(body: FitApiResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_input" }, 400);
  }

  const input = requestSchema.safeParse(raw);
  if (!input.success) {
    return json({ ok: false, error: "invalid_input" }, 400);
  }

  if (!env.OPENROUTER_API_KEY) {
    return json({ ok: false, error: "unavailable" }, 503);
  }

  const projects = await getProjects();
  const model = createFreeModel(
    env.OPENROUTER_API_KEY,
    env.OPENROUTER_FREE_MODELS,
  );
  const system = buildFitSystemPrompt(input.data.locale, projects);
  const prompt = buildFitUserPrompt(input.data.jd);
  const encoder = new TextEncoder();

  // Input errors above stay plain JSON; once the model is called, the page
  // reads NDJSON events so it can show rows as the model finishes them.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: FitStreamEvent) =>
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));

      try {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
          if (attempt > 1) send({ type: "retry" });

          const result = streamText({
            model,
            system,
            prompt,
            maxRetries: 1,
            abortSignal: request.signal,
          });

          let text = "";
          let finishReason: string | undefined;
          let lastSent = "";
          let lastParsedAt = 0;

          for await (const chunk of result.fullStream) {
            if (chunk.type === "text-delta") {
              text += chunk.text;
              const now = Date.now();
              if (now - lastParsedAt < PROGRESS_INTERVAL_MS) continue;
              lastParsedAt = now;
              const partial = await parsePartialFitReport(text, projects);
              const serialized = partial ? JSON.stringify(partial) : "";
              if (partial && serialized !== lastSent) {
                lastSent = serialized;
                send({ type: "progress", partial });
              }
            } else if (chunk.type === "finish") {
              finishReason = chunk.finishReason;
            } else if (chunk.type === "error") {
              throw chunk.error;
            } else if (chunk.type === "abort") {
              throw new Error("fit stream aborted");
            }
          }

          const report = parseFitReport(text, projects);
          if (report) {
            send({ type: "done", report });
            return;
          }
          console.error(
            `[fit] unparseable model output (attempt ${attempt}, finish: ${finishReason}): ${describeFitParseFailure(text)}`,
          );
        }

        send({ type: "error", error: "invalid_output" });
      } catch (error) {
        if (request.signal.aborted) return;
        if (isProviderUnavailable(error)) {
          console.error("[fit] provider unavailable:", error);
        } else {
          console.error("[fit] stream failed:", error);
        }
        send({ type: "error", error: "unavailable" });
      } finally {
        try {
          controller.close();
        } catch {
          // already closed because the visitor left
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": FIT_STREAM_CONTENT_TYPE,
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
