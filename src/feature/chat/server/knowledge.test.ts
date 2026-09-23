// @vitest-environment node
import { describe, expect, it } from "vitest";
import { projectDetailList } from "@/shared/constant/project-detail";
import {
  PROJECT_KNOWLEDGE,
  buildSourceLinks,
  findMentionedProjects,
  projectIndex,
} from "./knowledge";

describe("projectIndex", () => {
  it("covers every case study so links never drift from project data", () => {
    expect(projectIndex.map((p) => p.slug)).toEqual(
      projectDetailList.map((p) => p.slug),
    );
  });
});

describe("findMentionedProjects", () => {
  it("matches titles, slugs, and Korean aliases in order of first mention", () => {
    expect(
      findMentionedProjects("렌트카 서비스와 포카즈, 그리고 react-devtool-cli").map(
        (p) => p.slug,
      ),
    ).toEqual(["alltime-car", "pocaz", "react-devtool-cli"]);
  });

  it("returns nothing for unrelated text and respects the limit", () => {
    expect(findMentionedProjects("안녕하세요")).toEqual([]);
    expect(
      findMentionedProjects("pocaz 대도 역대카 메뉴 고르기", 2),
    ).toHaveLength(2);
  });
});

describe("buildSourceLinks", () => {
  it("labels multi-project links with titles", () => {
    const projects = findMentionedProjects("pocaz 역대카");
    expect(buildSourceLinks(projects, "ko")).toEqual([
      { label: "POCAZ Remake", url: "/project/pocaz" },
      { label: "역대카", url: "/project/alltime-car" },
    ]);
  });
});

describe("PROJECT_KNOWLEDGE", () => {
  it("includes each case study's challenges and solutions", () => {
    for (const project of projectDetailList) {
      expect(PROJECT_KNOWLEDGE).toContain(`### ${project.title}`);
      for (const item of [...project.tech.challenges, ...project.tech.solutions]) {
        expect(PROJECT_KNOWLEDGE).toContain(item.title);
      }
    }
  });
});
