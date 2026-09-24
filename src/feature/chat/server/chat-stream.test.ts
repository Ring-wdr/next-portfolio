// @vitest-environment node
import { APICallError } from "ai";
import { describe, expect, it } from "vitest";
import {
  NO_TEXT_CONTENT_ERROR,
  isProviderUnavailable,
  streamResultToUiChunks,
  toCoreMessages,
  type StreamOptions,
} from "./chat-stream";
import { getFixtureProjects } from "@/shared/content/fixture-projects";
import { buildProjectIndex } from "./knowledge";

const projectIndex = buildProjectIndex(getFixtureProjects());

type MockPart = { type: string; [key: string]: unknown };

function createResult(parts: MockPart[], thrown?: unknown) {
  return {
    fullStream: (async function* () {
      for (const part of parts) yield part;
      if (thrown) throw thrown;
    })(),
  };
}

async function collect(
  result: ReturnType<typeof createResult>,
  options: Partial<StreamOptions> = {},
) {
  const chunks = [];
  for await (const chunk of streamResultToUiChunks(result, {
    textId: "text-1",
    question: "hi",
    locale: "ko",
    projectIndex,
    ...options,
  })) {
    chunks.push(chunk);
  }
  return chunks;
}

function specUrls(chunks: unknown[]) {
  const spec = chunks.find(
    (c): c is { type: "data-spec"; data: { spec: { elements: Record<string, { props: { url?: string } }> } } } =>
      (c as { type: string }).type === "data-spec",
  );
  return spec
    ? Object.values(spec.data.spec.elements)
        .map((element) => element.props.url)
        .filter(Boolean)
    : [];
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
  it("streams text and links the mentioned project's case study first", async () => {
    const chunks = await collect(
      createResult([
        { type: "text-delta", text: "POCAZ Remake는 " },
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
    expect(specUrls(chunks)).toEqual([
      "/project/pocaz",
      "https://github.com/Ring-wdr/pocaz-remake",
      "https://pocaz-remake.vercel.app/",
    ]);
    expect(chunks.at(-1)).toEqual({ type: "finish", finishReason: "stop" });
  });

  it("links every mentioned project's case study, localized", async () => {
    const chunks = await collect(
      createResult([
        { type: "text-delta", text: "Both 역대카 and POCAZ use Next.js." },
      ]),
      { locale: "en" },
    );
    expect(specUrls(chunks)).toEqual([
      "/en/project/alltime-car",
      "/en/project/pocaz",
    ]);
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
      { question: "포카즈 프로젝트 알려줘" },
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
    expect(specUrls(chunks)).toContain("/project/pocaz");
  });

  it("falls back to page links in the requested locale for unmatched questions", async () => {
    const chunks = await collect(createResult([], rateLimitError()), {
      question: "What do you work on?",
      locale: "en",
    });
    expect(specUrls(chunks)).toEqual(["/en/project", "/en/about"]);
  });
});
