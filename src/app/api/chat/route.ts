import { createUIMessageStreamResponse, streamText } from "ai";
import { env } from "@/env";
import { parseChatContext } from "@/feature/chat/lib/context";
import {
  detectLocale,
  fallbackChunks,
  streamResultToUiChunks,
  toCoreMessages,
  type UIMessageLike,
} from "@/feature/chat/server/chat-stream";
import { createFreeModel } from "@/feature/chat/server/model";
import { buildSystemPrompt } from "@/feature/chat/server/prompt";
import { toReadableStream } from "@/feature/chat/server/ui-stream";

// Hobby + Fluid Compute allows up to 300s; free models normally finish well within it.
export const maxDuration = 300;

export async function POST(request: Request) {
  let body: { messages?: UIMessageLike[]; context?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = toCoreMessages(
    Array.isArray(body.messages) ? body.messages : [],
  );
  if (messages.length === 0) {
    return new Response("No valid messages", { status: 400 });
  }

  const context = parseChatContext(body.context);
  const question = messages.findLast((m) => m.role === "user")?.content ?? "";
  const options = {
    textId: crypto.randomUUID(),
    question,
    locale: context.locale ?? detectLocale(question),
  };

  if (!env.OPENROUTER_API_KEY) {
    return createUIMessageStreamResponse({
      stream: toReadableStream(fallbackChunks(options)),
    });
  }

  const result = streamText({
    model: createFreeModel(env.OPENROUTER_API_KEY, env.OPENROUTER_FREE_MODELS),
    system: buildSystemPrompt(context),
    messages,
    maxRetries: 1,
    abortSignal: request.signal,
  });

  return createUIMessageStreamResponse({
    stream: toReadableStream(streamResultToUiChunks(result, options)),
  });
}
