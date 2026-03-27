import type { Metadata } from "next";
import { MainPage } from "@/pages-layer/main";
import { buildPageMetadata, siteConfig, type AppLocale } from "@/shared/constant/site";

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

export default MainPage;
