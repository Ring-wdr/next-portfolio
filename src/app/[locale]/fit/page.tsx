import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FitPage } from "@/pages-layer/fit";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";
import { getProjects } from "@/shared/content/project-source";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/fit">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/fit",
    title: "Role Fit | Manjoong Kim",
    description:
      "Paste a job description and get an evidence-linked fit report against Manjoong Kim's case studies, including honest gaps.",
    keywords: ["job description match", "frontend role fit", "recruiter tool"],
  });
}

export default async function Page({ params }: PageProps<"/[locale]/fit">) {
  setRequestLocale((await params).locale);
  const projects = await getProjects();
  const projectTitles = Object.fromEntries(
    projects.map((project) => [project.slug, project.title]),
  );

  return <FitPage projectTitles={projectTitles} />;
}
