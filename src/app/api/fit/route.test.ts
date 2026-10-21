// @vitest-environment node
import { APICallError } from "ai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FitStreamEvent } from "@/feature/fit/lib/report";

const envMock = vi.hoisted(() => ({
  OPENROUTER_API_KEY: "test-key" as string | undefined,
  OPENROUTER_FREE_MODELS: undefined as string | undefined,
}));
vi.mock("@/env", () => ({ env: envMock }));
vi.mock("@/shared/content/project-source", async () => {
  const { getFixtureProjects } = await import("@/shared/content/fixture-projects");
  return { getProjects: async () => getFixtureProjects() };
});

const streamTextMock = vi.hoisted(() => vi.fn());
vi.mock("ai", async (importOriginal) => ({
  ...(await importOriginal<typeof import("ai")>()),
  streamText: streamTextMock,
}));

import { POST } from "./route";

const jd = "React와 Next.js 기반 프론트엔드 개발. TypeScript 3년 이상, 테스트 작성 경험, 디자인 시스템 운영 경험 우대.".repeat(2);

const report = {
  summary: "요약",
  requirements: [
    { requirement: "React", match: "strong", evidence: "근거", projectSlugs: ["pocaz"] },
    { requirement: "Vue", match: "gap", evidence: "없음", projectSlugs: [] },
  ],
  gaps: [],
  questions: [],
};

/** A fake streamText result that emits `text` in small deltas. */
function textStream(text: string, chunkSize = 8) {
  return {
    fullStream: (async function* () {
      for (let i = 0; i < text.length; i += chunkSize) {
        yield { type: "text-delta", text: text.slice(i, i + chunkSize) };
      }
      yield { type: "finish", finishReason: "stop" };
    })(),
  };
}

function failingStream(error: unknown) {
  return {
    fullStream: (async function* () {
      yield { type: "error", error };
    })(),
  };
}

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/fit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

async function readEvents(response: Response): Promise<FitStreamEvent[]> {
  const body = await response.text();
  return body
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as FitStreamEvent);
}

describe("POST /api/fit", () => {
  beforeEach(() => {
    envMock.OPENROUTER_API_KEY = "test-key";
    streamTextMock.mockReset();
  });

  it("rejects job descriptions outside the length bounds", async () => {
    const response = await post({ jd: "too short" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: "invalid_input" });
  });

  it("streams progress and ends with the validated report", async () => {
    // Each delta counts as a second later, so the progress throttle never skips one.
    let clock = 0;
    const now = vi.spyOn(Date, "now").mockImplementation(() => (clock += 1000));
    streamTextMock.mockReturnValue(
      textStream(`\`\`\`json\n${JSON.stringify(report)}\n\`\`\``),
    );
    const response = await post({ jd, locale: "ko" });

    expect(response.headers.get("content-type")).toMatch(/ndjson/);
    const events = await readEvents(response);
    now.mockRestore();
    expect(events.at(-1)).toEqual({ type: "done", report });

    const progress = events.filter((event) => event.type === "progress");
    expect(progress.length).toBeGreaterThan(0);
    for (const event of progress) {
      if (event.type !== "progress") continue;
      // Rows only appear once the model has moved past them.
      expect(report.requirements).toEqual(
        expect.arrayContaining(event.partial.requirements),
      );
    }
  });

  it("retries once on malformed output, then reports invalid output", async () => {
    streamTextMock.mockImplementation(() => textStream("not json"));
    const events = await readEvents(await post({ jd }));
    expect(streamTextMock).toHaveBeenCalledTimes(2);
    expect(events).toEqual([{ type: "retry" }, { type: "error", error: "invalid_output" }]);
  });

  it("reports unavailability when the provider is rate limited", async () => {
    streamTextMock.mockReturnValue(
      failingStream(
        new APICallError({ message: "Rate limit exceeded", url: "x", requestBodyValues: {}, statusCode: 429 }),
      ),
    );
    const events = await readEvents(await post({ jd }));
    expect(events).toEqual([{ type: "error", error: "unavailable" }]);
  });

  it("does not call a model without an API key", async () => {
    envMock.OPENROUTER_API_KEY = undefined;
    const response = await post({ jd });
    expect(response.status).toBe(503);
    expect(streamTextMock).not.toHaveBeenCalled();
  });
});
