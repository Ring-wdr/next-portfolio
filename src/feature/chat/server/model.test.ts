// @vitest-environment node
import { describe, expect, it } from "vitest";
import { DEFAULT_FREE_MODELS, resolveFreeModels } from "./model";

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
