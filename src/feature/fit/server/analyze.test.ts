// @vitest-environment node
import { describe, expect, it } from "vitest";
import { summarizeCoverage } from "../lib/report";
import { getFixtureProjects } from "@/shared/content/fixture-projects";
import {
  buildFitSystemPrompt,
  describeFitParseFailure,
  extractJsonObject,
  parseFitReport,
} from "./analyze";

const projects = getFixtureProjects();

const validReport = {
  summary: "React 중심 역할에 잘 맞습니다.",
  requirements: [
    {
      requirement: "React 실무 3년",
      match: "strong",
      evidence: "여러 React 프로젝트",
      projectSlugs: ["pocaz", "made-up-project", "pocaz"],
    },
    { requirement: "Vue 경험", match: "gap", evidence: "근거 없음", projectSlugs: [] },
    { requirement: "성능 개선", match: "partial" },
  ],
  gaps: ["Vue"],
  questions: ["팀 규모는?"],
};

describe("extractJsonObject", () => {
  it("tolerates code fences and preambles", () => {
    expect(extractJsonObject('Here you go:\n```json\n{"a":1}\n```')).toEqual({ a: 1 });
    expect(extractJsonObject("no json here")).toBeUndefined();
    expect(extractJsonObject("{broken")).toBeUndefined();
  });

  it("ignores trailing notes that contain braces", () => {
    expect(
      extractJsonObject('{"a":"x}"}\n\nNote: slugs use {kebab-case}.'),
    ).toEqual({ a: "x}" });
  });
});

describe("parseFitReport", () => {
  it("drops unknown and duplicate project slugs and fills defaults", () => {
    const report = parseFitReport(JSON.stringify(validReport), projects);
    expect(report?.requirements[0].projectSlugs).toEqual(["pocaz"]);
    expect(report?.requirements[2]).toMatchObject({ evidence: "", projectSlugs: [] });
  });

  it("rejects output that doesn't match the schema", () => {
    expect(parseFitReport(JSON.stringify({ summary: "x", requirements: [] }), projects)).toBeNull();
    expect(
      parseFitReport(
        JSON.stringify({
          ...validReport,
          requirements: [{ requirement: "x", match: "excellent" }],
        }),
        projects,
      ),
    ).toBeNull();
  });
});

describe("parseFitReport leniency", () => {
  it("clips over-long text and extra items instead of rejecting the report", () => {
    const report = parseFitReport(
      JSON.stringify({
        ...validReport,
        summary: "가".repeat(900),
        requirements: [
          { requirement: "React", match: "Strong", evidence: "나".repeat(700), projectSlugs: null },
        ],
        questions: ["1", "2", "3", "4", "5", "6"],
      }),
      projects,
    );
    expect(report?.summary).toHaveLength(800);
    expect(report?.requirements[0]).toMatchObject({ match: "strong", projectSlugs: [] });
    expect(report?.requirements[0].evidence).toHaveLength(600);
    expect(report?.questions).toHaveLength(5);
  });

  it("explains rejected output for the server log", () => {
    expect(describeFitParseFailure("sorry, no report")).toMatch(/no JSON object/);
    expect(describeFitParseFailure(JSON.stringify({ summary: "x", requirements: [] }))).toMatch(
      /requirements/,
    );
  });
});

describe("summarizeCoverage", () => {
  it("scores strong=1, partial=0.5, gap=0", () => {
    const report = parseFitReport(JSON.stringify(validReport), projects)!;
    expect(summarizeCoverage(report.requirements)).toEqual({
      strong: 1,
      partial: 1,
      gap: 1,
      total: 3,
      coverage: 50,
    });
  });
});

describe("buildFitSystemPrompt", () => {
  it("lists real project slugs and pins the output language", () => {
    const prompt = buildFitSystemPrompt("en", projects);
    expect(prompt).toContain("- pocaz: POCAZ Remake");
    expect(prompt).toContain("English");
  });
});
