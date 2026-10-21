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
      "Case studies: the XMORSE 2.0 move from jQuery to Next.js at ScatterX, and personal products built and run end to end.",
    keywords: [
      "case studies",
      "next.js migration",
      "product engineering",
      "full stack",
      "portfolio projects",
    ],
  });
}

export default async function Page({ params }: PageProps<"/[locale]/project">) {
  setRequestLocale((await params).locale);
  const projects = await getProjects();

  return <ProjectPage projects={projects.map(toProjectCard)} />;
}
