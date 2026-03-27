import type { Metadata } from "next";
import { AboutPage } from "@/pages-layer/about";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/about",
    title: "About | Manjoong Kim",
    description:
      "Career timeline, working principles, and frontend strengths behind Manjoong Kim's portfolio work.",
    keywords: ["about frontend engineer", "career timeline", "working principles"],
  });
}

export default AboutPage;
