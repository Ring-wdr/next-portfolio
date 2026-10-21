import type { FitStreamEvent } from "./report";

/**
 * Reads the NDJSON body /api/fit streams and calls `onEvent` per line.
 * Lines can be split across network chunks, so the trailing fragment waits
 * for the next read.
 */
export async function readFitStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (event: FitStreamEvent) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const flush = (text: string) => {
    const line = text.trim();
    if (line) onEvent(JSON.parse(line) as FitStreamEvent);
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    lines.forEach(flush);
  }
  flush(buffer + decoder.decode());
}
