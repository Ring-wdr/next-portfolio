import type { PortfolioSpec } from "../lib/spec";

type ProjectLink = { label: string; url: string };

const PROJECT_LINKS: { keywords: string[]; links: ProjectLink[] }[] = [
  {
    keywords: ["pocaz", "포카즈"],
    links: [
      { label: "GitHub", url: "https://github.com/Ring-wdr/pocaz-remake" },
      { label: "Demo", url: "https://pocaz-remake.vercel.app/" },
    ],
  },
  {
    keywords: ["법률사무소", "대도"],
    links: [{ label: "Demo", url: "https://www.daedolaw.com/" }],
  },
  {
    keywords: ["메뉴 고르기", "카페 메뉴"],
    links: [{ label: "Demo", url: "https://choose-menu.vercel.app/" }],
  },
  {
    keywords: ["역대카", "렌트카"],
    links: [{ label: "Demo", url: "https://alltime-car.com/" }],
  },
  {
    keywords: ["프론트엔드 주니어 스터디", "frontend-junior-study"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Ring-wdr/frontend-junior-study",
      },
      {
        label: "Demo",
        url: "https://ring-wdr.github.io/frontend-junior-study/",
      },
    ],
  },
  {
    keywords: ["react-devtool-cli", "react devtool"],
    links: [
      { label: "GitHub", url: "https://github.com/Ring-wdr/react-devtool-cli" },
      { label: "npm", url: "https://www.npmjs.com/package/react-devtool-cli" },
    ],
  },
];

export function extractProjectLinks(text: string): ProjectLink[] {
  const lower = text.toLowerCase();
  for (const project of PROJECT_LINKS) {
    if (project.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return project.links;
    }
  }
  return [];
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
