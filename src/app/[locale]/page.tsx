import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { MainPage } from "@/pages-layer/main";
import { buildPageMetadata, siteConfig, type AppLocale } from "@/shared/constant/site";
import { toProjectCard } from "@/shared/content/project";
import { getProjects } from "@/shared/content/project-source";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: ["frontend portfolio", "case study", "next.js", "react"],
  });
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  setRequestLocale((await params).locale);
  const projects = await getProjects();

  return <MainPage projects={projects.map(toProjectCard)} />;
}
