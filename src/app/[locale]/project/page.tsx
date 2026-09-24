import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProjectPage } from "@/pages-layer/project";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";
import { toProjectCard } from "@/shared/content/project";
import { getProjects } from "@/shared/content/project-source";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/project">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/project",
    title: "Projects | Manjoong Kim",
    description:
      "Browse frontend case studies covering product UX, agent tooling, interaction design, and delivery outcomes.",
    keywords: [
      "frontend case studies",
      "portfolio projects",
      "product engineering",
      "agent tooling",
      "cli workflows",
    ],
  });
}

export default async function Page({ params }: PageProps<"/[locale]/project">) {
  setRequestLocale((await params).locale);
  const projects = await getProjects();

  return <ProjectPage projects={projects.map(toProjectCard)} />;
}
