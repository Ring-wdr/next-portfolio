import { generateText } from "ai";
import { z } from "zod";
import { env } from "@/env";
import { isProviderUnavailable } from "@/feature/chat/server/chat-stream";
import { createFreeModel } from "@/feature/chat/server/model";
import {
  FIT_JD_MAX_LENGTH,
  FIT_JD_MIN_LENGTH,
  type FitApiResponse,
} from "@/feature/fit/lib/report";
import {
  buildFitSystemPrompt,
  buildFitUserPrompt,
  parseFitReport,
} from "@/feature/fit/server/analyze";
import { getProjects } from "@/shared/content/project-source";

export const maxDuration = 300;

const requestSchema = z.object({
  jd: z.string().trim().min(FIT_JD_MIN_LENGTH).max(FIT_JD_MAX_LENGTH),
  locale: z.enum(["ko", "en"]).default("ko"),
});

// Free models occasionally return malformed JSON; one retry is worth the quota.
const MAX_ATTEMPTS = 2;

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

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const { text } = await generateText({
        model,
        system: buildFitSystemPrompt(input.data.locale, projects),
        prompt: buildFitUserPrompt(input.data.jd),
        maxRetries: 1,
        abortSignal: request.signal,
      });

      const report = parseFitReport(text, projects);
      if (report) {
        return json({ ok: true, report }, 200);
      }
      console.error(`[fit] unparseable model output (attempt ${attempt})`);
    } catch (error) {
      if (isProviderUnavailable(error)) {
        console.error("[fit] provider unavailable:", error);
        return json({ ok: false, error: "unavailable" }, 503);
      }
      throw error;
    }
  }

  return json({ ok: false, error: "invalid_output" }, 502);
}
