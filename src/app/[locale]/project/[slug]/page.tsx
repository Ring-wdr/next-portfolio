import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/pages-layer/project/[slug]";
import { projectDetailList } from "@/shared/constant/project-detail";
import { buildPageMetadata, buildProjectJsonLd, getProjectPath, type AppLocale } from "@/shared/constant/site";

export async function generateStaticParams() {
  return projectDetailList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/project/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projectDetailList.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested case study could not be found.",
    };
  }

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: getProjectPath(project.slug),
    title: `${project.title} | Manjoong Kim`,
    description: project.summary,
    keywords: project.metadata.tags,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/project/[slug]">) {
  const { locale, slug } = await params;
  const project = projectDetailList.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProjectJsonLd(project, locale as AppLocale)),
        }}
      />
      <ProjectDetailPage project={project} />
    </>
  );
}
