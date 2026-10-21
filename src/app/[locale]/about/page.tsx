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
      "Manjoong Kim's experience: four years of frontend work, including three years on a data analysis and visualization SaaS at ScatterX.",
    keywords: [
      "frontend engineer",
      "product engineer",
      "career",
      "next.js migration",
      "data visualization",
    ],
  });
}

export default async function Page({ params }: PageProps<"/[locale]/about">) {
  setRequestLocale((await params).locale);
  const projects = await getProjects();

  const publicProjects = projects.filter(
    (project) => project.card.category !== "Work",
  );

  return <AboutPage projectCount={publicProjects.length} />;
}
