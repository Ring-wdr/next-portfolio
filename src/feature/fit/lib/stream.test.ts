import { describe, expect, it } from "vitest";
import type { FitStreamEvent } from "./report";
import { readFitStream } from "./stream";

function streamOf(chunks: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
}

describe("readFitStream", () => {
  it("joins lines split across chunks and keeps their order", async () => {
    const events: FitStreamEvent[] = [];
    await readFitStream(
      streamOf(['{"type":"ret', 'ry"}\n{"type":"error","error":"unavai', 'lable"}']),
      (event) => events.push(event),
    );
    expect(events).toEqual([
      { type: "retry" },
      { type: "error", error: "unavailable" },
    ]);
  });
});
