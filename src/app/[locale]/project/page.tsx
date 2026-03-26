import type { Metadata } from "next";
import { ProjectPage } from "@/pages-layer/project";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/project">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/project",
    title: "Projects | Manjoong Kim",
    description:
      "Browse frontend case studies covering product UX, interaction design, and delivery outcomes.",
    keywords: ["frontend case studies", "portfolio projects", "product engineering"],
  });
}

export default ProjectPage;
