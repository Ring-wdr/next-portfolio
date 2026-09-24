// @vitest-environment node
import { describe, expect, it } from "vitest";
import { parseChatContext } from "../lib/context";
import { getFixtureProjects } from "@/shared/content/fixture-projects";
import { buildBasePrompt, buildSystemPrompt } from "./prompt";

const projects = getFixtureProjects();
const SYSTEM_PROMPT = buildBasePrompt(projects);

describe("buildSystemPrompt", () => {
  it("returns the base prompt without context", () => {
    expect(buildSystemPrompt({}, projects)).toBe(SYSTEM_PROMPT);
  });

  it("adds persona guidance and the current case study", () => {
    const prompt = buildSystemPrompt(
      { persona: "engineer", projectSlug: "pocaz" },
      projects,
    );
    expect(prompt).toContain("방문자는 엔지니어입니다");
    expect(prompt).toContain('"POCAZ Remake" 케이스 스터디');
  });

  it("ignores unknown project slugs", () => {
    expect(buildSystemPrompt({ projectSlug: "nope" }, projects)).toBe(SYSTEM_PROMPT);
  });
});

describe("parseChatContext", () => {
  it("drops invalid context instead of failing the request", () => {
    expect(parseChatContext({ persona: "ceo" })).toEqual({});
    expect(parseChatContext(undefined)).toEqual({});
    expect(parseChatContext({ locale: "en", persona: "recruiter" })).toEqual({
      locale: "en",
      persona: "recruiter",
    });
  });
});
