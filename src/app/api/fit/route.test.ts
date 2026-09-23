// @vitest-environment node
import { APICallError } from "ai";
import { beforeEach, describe, expect, it, vi } from "vitest";

const envMock = vi.hoisted(() => ({
  OPENROUTER_API_KEY: "test-key" as string | undefined,
  OPENROUTER_FREE_MODELS: undefined as string | undefined,
}));
vi.mock("@/env", () => ({ env: envMock }));

const generateTextMock = vi.hoisted(() => vi.fn());
vi.mock("ai", async (importOriginal) => ({
  ...(await importOriginal<typeof import("ai")>()),
  generateText: generateTextMock,
}));

import { POST } from "./route";

const jd = "React와 Next.js 기반 프론트엔드 개발. TypeScript 3년 이상, 테스트 작성 경험, 디자인 시스템 운영 경험 우대.".repeat(2);

const report = {
  summary: "요약",
  requirements: [{ requirement: "React", match: "strong", evidence: "근거", projectSlugs: ["pocaz"] }],
  gaps: [],
  questions: [],
};

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/fit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/fit", () => {
  beforeEach(() => {
    envMock.OPENROUTER_API_KEY = "test-key";
    generateTextMock.mockReset();
  });

  it("rejects job descriptions outside the length bounds", async () => {
    const response = await post({ jd: "too short" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: "invalid_input" });
  });

  it("returns a validated report", async () => {
    generateTextMock.mockResolvedValue({ text: `\`\`\`json\n${JSON.stringify(report)}\n\`\`\`` });
    const response = await post({ jd, locale: "ko" });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, report });
  });

  it("retries once on malformed output, then gives up", async () => {
    generateTextMock.mockResolvedValue({ text: "not json" });
    const response = await post({ jd });
    expect(generateTextMock).toHaveBeenCalledTimes(2);
    expect(response.status).toBe(502);
  });

  it("reports unavailability when the provider is rate limited", async () => {
    generateTextMock.mockRejectedValue(
      new APICallError({ message: "Rate limit exceeded", url: "x", requestBodyValues: {}, statusCode: 429 }),
    );
    const response = await post({ jd });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: "unavailable" });
  });

  it("does not call a model without an API key", async () => {
    envMock.OPENROUTER_API_KEY = undefined;
    const response = await post({ jd });
    expect(response.status).toBe(503);
    expect(generateTextMock).not.toHaveBeenCalled();
  });
});
