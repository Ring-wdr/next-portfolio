import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/pages-layer/about";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";
import { getProjects } from "@/shared/content/project-source";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/about",
    title: "About | Manjoong Kim",
    description:
      "Career timeline, working principles, and agent-ready frontend engineering strengths behind Manjoong Kim's portfolio work.",
    keywords: [
      "about frontend engineer",
      "career timeline",
      "working principles",
      "agent workflows",
      "engineering systems",
    ],
  });
}

export default async function Page({ params }: PageProps<"/[locale]/about">) {
  setRequestLocale((await params).locale);
  const projects = await getProjects();

  return <AboutPage projectCount={projects.length} />;
}
