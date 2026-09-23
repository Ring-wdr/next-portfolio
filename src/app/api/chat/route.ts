import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createUIMessageStreamResponse, streamText, type UIMessageChunk } from "ai";
import { env } from "@/env";
import {
  SYSTEM_PROMPT,
  fallbackChunks,
  resolveFreeModels,
  streamResultToUiChunks,
  toCoreMessages,
  type UIMessageLike,
} from "@/feature/chat/server/chat-stream";
import { siteConfig } from "@/shared/constant/site";

// Hobby + Fluid Compute allows up to 300s; free models normally finish well within it.
export const maxDuration = 300;

function toReadableStream(
  chunks: AsyncIterable<UIMessageChunk> | Iterable<UIMessageChunk>,
): ReadableStream<UIMessageChunk> {
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  let rawMessages: UIMessageLike[];
  try {
    const body = (await request.json()) as { messages?: UIMessageLike[] };
    rawMessages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = toCoreMessages(rawMessages);
  if (messages.length === 0) {
    return new Response("No valid messages", { status: 400 });
  }

  const question = messages.findLast((m) => m.role === "user")?.content ?? "";
  const textId = crypto.randomUUID();

  if (!env.OPENROUTER_API_KEY) {
    return createUIMessageStreamResponse({
      stream: toReadableStream(fallbackChunks(question, textId)),
    });
  }

  const openrouter = createOpenRouter({
    apiKey: env.OPENROUTER_API_KEY,
    headers: {
      "HTTP-Referer": siteConfig.siteUrl,
      "X-Title": "Kim Manjoong Portfolio Chat",
    },
  });
  const models = resolveFreeModels(env.OPENROUTER_FREE_MODELS);

  const result = streamText({
    model: openrouter(models[0], { models }),
    system: SYSTEM_PROMPT,
    messages,
    maxRetries: 1,
    abortSignal: request.signal,
  });

  return createUIMessageStreamResponse({
    stream: toReadableStream(streamResultToUiChunks(result, textId, question)),
  });
}
