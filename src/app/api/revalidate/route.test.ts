// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const envMock = vi.hoisted(() => ({
  CONTENT_REVALIDATE_SECRET: "test-secret-1234567890" as string | undefined,
}));
vi.mock("@/env", () => ({ env: envMock }));

const cacheMock = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));
vi.mock("next/cache", () => cacheMock);

import { POST } from "./route";

function request(authorization?: string) {
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: authorization ? { authorization } : {},
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    envMock.CONTENT_REVALIDATE_SECRET = "test-secret-1234567890";
    cacheMock.revalidatePath.mockClear();
    cacheMock.revalidateTag.mockClear();
  });

  it("rejects requests without the shared secret", async () => {
    const response = await POST(request("Bearer wrong"));
    expect(response.status).toBe(401);
    expect(cacheMock.revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 503 when no secret is configured", async () => {
    envMock.CONTENT_REVALIDATE_SECRET = undefined;
    const response = await POST(request("Bearer anything"));
    expect(response.status).toBe(503);
  });

  it("expires the projects tag and the sitemap", async () => {
    const response = await POST(request("Bearer test-secret-1234567890"));
    expect(response.status).toBe(200);
    expect(cacheMock.revalidateTag).toHaveBeenCalledWith("projects", { expire: 0 });
    expect(cacheMock.revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
  });
});
