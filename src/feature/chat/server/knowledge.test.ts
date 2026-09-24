// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getLocalProjects } from "@/shared/content/local-projects";
import {
  buildProjectIndex,
  buildProjectKnowledge,
  buildSourceLinks,
  findMentionedProjects,
} from "./knowledge";

const projects = getLocalProjects();
const projectIndex = buildProjectIndex(projects);

describe("buildProjectIndex", () => {
  it("covers every case study so links never drift from project data", () => {
    expect(projectIndex.map((p) => p.slug)).toEqual(
      projects.map((p) => p.slug),
    );
  });
});

describe("findMentionedProjects", () => {
  it("matches titles, slugs, and Korean aliases in order of first mention", () => {
    expect(
      findMentionedProjects(
        projectIndex,
        "렌트카 서비스와 포카즈, 그리고 react-devtool-cli",
      ).map((p) => p.slug),
    ).toEqual(["alltime-car", "pocaz", "react-devtool-cli"]);
  });

  it("returns nothing for unrelated text and respects the limit", () => {
    expect(findMentionedProjects(projectIndex, "안녕하세요")).toEqual([]);
    expect(
      findMentionedProjects(projectIndex, "pocaz 대도 역대카 메뉴 고르기", 2),
    ).toHaveLength(2);
  });
});

describe("buildSourceLinks", () => {
  it("labels multi-project links with titles", () => {
    const mentioned = findMentionedProjects(projectIndex, "pocaz 역대카");
    expect(buildSourceLinks(mentioned, "ko")).toEqual([
      { label: "POCAZ Remake", url: "/project/pocaz" },
      { label: "역대카", url: "/project/alltime-car" },
    ]);
  });
});

describe("buildProjectKnowledge", () => {
  it("includes each case study's challenges and solutions", () => {
    const knowledge = buildProjectKnowledge(projects);
    for (const project of projects) {
      expect(knowledge).toContain(`### ${project.title}`);
      for (const item of [...project.tech.challenges, ...project.tech.solutions]) {
        expect(knowledge).toContain(item.title);
      }
    }
  });
});
