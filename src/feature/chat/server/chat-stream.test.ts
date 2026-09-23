// @vitest-environment node
import { APICallError } from "ai";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_FREE_MODELS,
  NO_TEXT_CONTENT_ERROR,
  isProviderUnavailable,
  resolveFreeModels,
  streamResultToUiChunks,
  toCoreMessages,
} from "./chat-stream";

type MockPart = { type: string; [key: string]: unknown };

function createResult(parts: MockPart[], thrown?: unknown) {
  return {
    fullStream: (async function* () {
      for (const part of parts) yield part;
      if (thrown) throw thrown;
    })(),
  };
}

async function collect(result: ReturnType<typeof createResult>, question = "hi") {
  const chunks = [];
  for await (const chunk of streamResultToUiChunks(result, "text-1", question)) {
    chunks.push(chunk);
  }
  return chunks;
}

function apiError(statusCode: number, message = "Rate limit exceeded") {
  return new APICallError({
    message,
    url: "https://openrouter.ai/api/v1/chat/completions",
    requestBodyValues: {},
    statusCode,
  });
}

const rateLimitError = () => apiError(429);

describe("toCoreMessages", () => {
  it("keeps only non-empty user/assistant text content", () => {
    expect(
      toCoreMessages([
        { role: "system", content: "ignore" },
        { role: "user", parts: [{ type: "text", text: "hello" }] },
        { role: "assistant", parts: [{ type: "data-spec" }] },
        { role: "assistant", content: "answer" },
      ]),
    ).toEqual([
      { role: "user", content: "hello" },
      { role: "assistant", content: "answer" },
    ]);
  });

  it("caps history length and per-message size", () => {
    const many = Array.from({ length: 20 }, (_, i) => ({
      role: "user",
      content: `${i}`.padEnd(5000, "x"),
    }));
    const result = toCoreMessages(many);
    expect(result).toHaveLength(12);
    expect(result[0].content.startsWith("8")).toBe(true);
    expect(result[0].content).toHaveLength(2000);
  });
});

describe("resolveFreeModels", () => {
  it("falls back to defaults when unset or blank", () => {
    expect(resolveFreeModels(undefined)).toEqual([...DEFAULT_FREE_MODELS]);
    expect(resolveFreeModels(" , ")).toEqual([...DEFAULT_FREE_MODELS]);
  });

  it("parses a comma-separated override in order", () => {
    expect(resolveFreeModels("a/b:free, c/d:free")).toEqual([
      "a/b:free",
      "c/d:free",
    ]);
  });
});

describe("isProviderUnavailable", () => {
  it("detects rate limits and provider-side failures", () => {
    expect(isProviderUnavailable(rateLimitError())).toBe(true);
    expect(isProviderUnavailable(apiError(401, "API key expired."))).toBe(true);
    expect(isProviderUnavailable(apiError(404, "No endpoints found"))).toBe(true);
    expect(
      isProviderUnavailable(new Error("Rate limit exceeded: free-models-per-day")),
    ).toBe(true);
  });

  it("leaves request bugs and unknown errors as visible errors", () => {
    expect(isProviderUnavailable(apiError(400, "Bad request"))).toBe(false);
    expect(isProviderUnavailable(new Error("boom"))).toBe(false);
  });
});

describe("streamResultToUiChunks", () => {
  it("streams text and appends project links found in the answer", async () => {
    const chunks = await collect(
      createResult([
        { type: "text-delta", text: "POCAZ는 " },
        { type: "text-delta", text: "리메이크 프로젝트입니다." },
        { type: "finish", finishReason: "stop" },
      ]),
    );

    expect(chunks.map((c) => c.type)).toEqual([
      "start",
      "text-start",
      "text-delta",
      "text-delta",
      "text-end",
      "data-spec",
      "finish",
    ]);
    expect(chunks.at(-1)).toEqual({ type: "finish", finishReason: "stop" });
  });

  it("emits an error when the model produces no visible text", async () => {
    const chunks = await collect(createResult([{ type: "finish" }]));
    expect(chunks).toEqual([{ type: "error", errorText: NO_TEXT_CONTENT_ERROR }]);
  });

  it("closes the open text part before surfacing mid-stream errors", async () => {
    const chunks = await collect(
      createResult([{ type: "text-delta", text: "partial" }], new Error("socket closed")),
    );
    expect(chunks.slice(-2)).toEqual([
      { type: "text-end", id: "text-1" },
      { type: "error", errorText: "socket closed" },
    ]);
  });

  it("answers with a static fallback when the free quota is exhausted", async () => {
    const chunks = await collect(
      createResult([{ type: "error", error: rateLimitError() }]),
      "포카즈 프로젝트 알려줘",
    );

    expect(chunks.map((c) => c.type)).toEqual([
      "start",
      "text-start",
      "text-delta",
      "text-end",
      "data-spec",
      "finish",
    ]);
    const delta = chunks.find((c) => c.type === "text-delta");
    expect(delta && "delta" in delta && delta.delta).toContain("한도");
    const spec = chunks.find((c) => c.type === "data-spec");
    expect(JSON.stringify(spec)).toContain("pocaz-remake");
  });

  it("falls back to page links in English for unmatched English questions", async () => {
    const chunks = await collect(
      createResult([], rateLimitError()),
      "What do you work on?",
    );
    const spec = JSON.stringify(chunks.find((c) => c.type === "data-spec"));
    expect(spec).toContain("/en/project");
    expect(spec).toContain("/en/about");
  });
});
