import type { UIMessageChunk } from "ai";

export function toReadableStream(
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
