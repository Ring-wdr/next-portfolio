import { projectList } from "@/shared/constant/project";
import { projectDetailList } from "@/shared/constant/project-detail";
import {
  getProjectPath,
  localizePath,
  type AppLocale,
} from "@/shared/constant/site";
import type { PortfolioSpec } from "../lib/spec";

type ProjectLink = { label: string; url: string };

export type ProjectIndexEntry = {
  slug: string;
  title: string;
  keywords: string[];
  externalLinks: ProjectLink[];
};

// Names visitors (and models) use that differ from the canonical title/slug.
const PROJECT_ALIASES: Record<string, string[]> = {
  pocaz: ["포카즈", "pocaz"],
  "daedo-law": ["법률사무소", "대도", "daedo"],
  "choose-menu": ["메뉴 고르기", "카페 메뉴", "choose menu"],
  "alltime-car": ["역대카", "렌트카", "alltime"],
  "frontend-junior-study": ["주니어 스터디", "junior study"],
  "react-devtool-cli": ["react devtool", "devtool cli", "devtool-cli"],
};

export const projectIndex: ProjectIndexEntry[] = projectDetailList.map(
  (project) => {
    const externalLinks: ProjectLink[] = [];
    if (project.links.github) {
      externalLinks.push({ label: "GitHub", url: project.links.github });
    }
    if (project.links.demo) {
      externalLinks.push({ label: "Demo", url: project.links.demo });
    }
    for (const link of project.links.etc ?? []) {
      externalLinks.push(link);
    }

    return {
      slug: project.slug,
      title: project.title,
      keywords: [
        project.slug,
        project.title,
        ...(PROJECT_ALIASES[project.slug] ?? []),
      ].map((kw) => kw.toLowerCase()),
      externalLinks,
    };
  },
);

const list = (items: string[] | undefined) =>
  items && items.length > 0 ? items.join(", ") : undefined;

/**
 * Case-study knowledge rendered from the same data the project pages use, so
 * the assistant can't drift from what visitors read on the site.
 */
export const PROJECT_KNOWLEDGE = projectDetailList
  .map((project) => {
    const card = projectList.find((item) => item.slug === project.slug);
    const lines = [
      `### ${project.title} (${project.period})`,
      `- 분류: ${project.team}`,
      `- 역할: ${project.role}`,
      `- 개요: ${project.summary}`,
      `- 배경: ${project.overview.background}`,
      `- 목표: ${project.overview.goal}`,
      `- 주요 기능: ${list(project.overview.features)}`,
      `- 기술 스택: ${list(project.tech.stack)}`,
      ...project.tech.challenges.map(
        (item) => `- 챌린지 — ${item.title}: ${item.description}`,
      ),
      ...project.tech.solutions.map(
        (item) => `- 해결 — ${item.title}: ${item.description}`,
      ),
      card?.impact && `- 임팩트: ${card.impact}`,
      card?.result && `- 결과: ${card.result}`,
      project.achievements.metrics &&
        `- 지표: ${project.achievements.metrics
          .map((metric) => `${metric.label} ${metric.value}`)
          .join(", ")}`,
      project.achievements.improvements &&
        `- 개선: ${list(project.achievements.improvements)}`,
      project.achievements.feedback &&
        `- 피드백: ${list(project.achievements.feedback)}`,
      card?.status && `- 상태: ${card.status}`,
    ];
    return lines.filter(Boolean).join("\n");
  })
  .join("\n\n");

export function findProjectBySlug(slug: string | undefined) {
  return slug ? projectIndex.find((p) => p.slug === slug) : undefined;
}

/** Projects mentioned in `text`, ordered by first mention. */
export function findMentionedProjects(
  text: string,
  limit = 3,
): ProjectIndexEntry[] {
  const lower = text.toLowerCase();
  return projectIndex
    .map((project) => ({
      project,
      position: Math.min(
        ...project.keywords.map((kw) => {
          const index = lower.indexOf(kw);
          return index === -1 ? Number.POSITIVE_INFINITY : index;
        }),
      ),
    }))
    .filter(({ position }) => Number.isFinite(position))
    .sort((a, b) => a.position - b.position)
    .slice(0, limit)
    .map(({ project }) => project);
}

const CASE_STUDY_LABEL: Record<AppLocale, string> = {
  ko: "케이스 스터디",
  en: "Case study",
};

/**
 * Source links for an answer: the in-site case study first, then external
 * links when a single project is discussed.
 */
export function buildSourceLinks(
  projects: ProjectIndexEntry[],
  locale: AppLocale,
): ProjectLink[] {
  const caseStudy = (project: ProjectIndexEntry, label: string) => ({
    label,
    url: localizePath(locale, getProjectPath(project.slug)),
  });

  if (projects.length === 1) {
    const [project] = projects;
    return [
      caseStudy(project, CASE_STUDY_LABEL[locale]),
      ...project.externalLinks,
    ];
  }

  return projects.map((project) => caseStudy(project, project.title));
}

export function buildLinkSpec(links: ProjectLink[]): PortfolioSpec {
  const children = links.map((_, i) => `link-${i}`);
  const elements: PortfolioSpec["elements"] = {
    "link-group": { type: "LinkGroup", props: {}, children },
  };
  links.forEach((link, i) => {
    elements[`link-${i}`] = {
      type: "LinkButton",
      props: { label: link.label, url: link.url },
      children: [],
    };
  });
  return { root: "link-group", elements };
}
