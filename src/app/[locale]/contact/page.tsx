import type { Metadata } from "next";
import { ContactPage } from "@/pages-layer/contact";
import { buildPageMetadata, type AppLocale } from "@/shared/constant/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/contact",
    title: "Contact | Manjoong Kim",
    description:
      "Reach out for frontend roles, project inquiries, or collaboration opportunities.",
    keywords: ["contact frontend engineer", "hire frontend developer", "project inquiry"],
  });
}

export default ContactPage;
