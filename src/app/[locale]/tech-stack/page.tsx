import type { Metadata } from "next";
import { TechStackPage } from "@/pages-layer/tech-stack";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tech-stack">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/tech-stack",
    title: "Tech Stack | Manjoong Kim",
    description:
      "Technologies, AI-agent tooling, and verification practices used across Manjoong Kim's frontend and agent-engineering work.",
    keywords: [
      "next.js",
      "react",
      "typescript",
      "codex",
      "claude code",
      "agent engineering",
      "frontend tech stack",
    ],
  });
}

export default TechStackPage;
