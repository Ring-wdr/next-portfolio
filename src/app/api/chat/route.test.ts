// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const envMock = vi.hoisted(() => ({
  OPENROUTER_API_KEY: undefined as string | undefined,
  OPENROUTER_FREE_MODELS: undefined as string | undefined,
}));
vi.mock("@/env", () => ({ env: envMock }));

const streamTextMock = vi.hoisted(() => vi.fn());
vi.mock("ai", async (importOriginal) => ({
  ...(await importOriginal<typeof import("ai")>()),
  streamText: streamTextMock,
}));

import { POST } from "./route";

function createRequest(body?: unknown) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? "{" : JSON.stringify(body),
  });
}

async function readChunks(response: Response) {
  const payload = await response.text();
  return payload
    .split("\n\n")
    .map((line) => line.replace(/^data:\s*/, "").trim())
    .filter((line) => line.length > 0 && line !== "[DONE]")
    .map((line) => JSON.parse(line));
}

const userMessage = {
  messages: [{ role: "user", parts: [{ type: "text", text: "역대카 알려줘" }] }],
};

describe("POST /api/chat", () => {
  beforeEach(() => {
    envMock.OPENROUTER_API_KEY = undefined;
    envMock.OPENROUTER_FREE_MODELS = undefined;
    streamTextMock.mockReset();
  });

  it("rejects malformed JSON and empty conversations", async () => {
    expect((await POST(createRequest())).status).toBe(400);
    expect((await POST(createRequest({ messages: [] }))).status).toBe(400);
  });

  it("serves the static fallback without calling a model when no key is set", async () => {
    const chunks = await readChunks(await POST(createRequest(userMessage)));

    expect(streamTextMock).not.toHaveBeenCalled();
    expect(chunks.map((c) => c.type)).toContain("data-spec");
    expect(JSON.stringify(chunks)).toContain("alltime-car.com");
  });

  it("streams the model answer through the configured free-model chain", async () => {
    envMock.OPENROUTER_API_KEY = "test-key";
    envMock.OPENROUTER_FREE_MODELS = "a/primary:free,b/backup:free";
    streamTextMock.mockReturnValue({
      fullStream: (async function* () {
        yield { type: "text-delta", text: "안녕하세요" };
        yield { type: "finish", finishReason: "stop" };
      })(),
    });

    const response = await POST(createRequest(userMessage));
    const chunks = await readChunks(response);

    expect(response.headers.get("content-type")).toContain("text/event-stream");
    const { model } = streamTextMock.mock.calls[0][0];
    expect(model.modelId).toBe("a/primary:free");
    expect(model.settings.models).toEqual(["a/primary:free", "b/backup:free"]);
    expect(chunks.filter((c) => c.type === "text-delta")).toEqual([
      expect.objectContaining({ delta: "안녕하세요" }),
    ]);
  });

  it("passes persona and project context into the system prompt", async () => {
    envMock.OPENROUTER_API_KEY = "test-key";
    streamTextMock.mockReturnValue({
      fullStream: (async function* () {
        yield { type: "text-delta", text: "ok" };
      })(),
    });

    await readChunks(
      await POST(
        createRequest({
          ...userMessage,
          context: { locale: "ko", persona: "recruiter", projectSlug: "alltime-car" },
        }),
      ),
    );

    const { system } = streamTextMock.mock.calls[0][0];
    expect(system).toContain("채용 담당자");
    expect(system).toContain('"역대카" 케이스 스터디');
  });
});
