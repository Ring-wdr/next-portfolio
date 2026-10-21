import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { Project } from "../content/project";
import { repositoryConfig } from "./repository";

export type AppLocale = (typeof routing.locales)[number];

export const siteConfig = {
  name: "Manjoong Kim Portfolio",
  title: "Manjoong Kim | Frontend · Product Engineer",
  description:
    "Frontend and product engineer with four years of experience, including three years on a data analysis and visualization SaaS where I designed the architecture of its move from jQuery to Next.js.",
  defaultDescription:
    "Case studies from Manjoong Kim: a jQuery to Next.js migration at a data visualization SaaS, and personal products built and run end to end.",
  siteUrl: "https://next-portfolio-ringring.vercel.app",
  repositoryUrl: repositoryConfig.url,
  social: {
    github: "https://github.com/Ring-wdr",
    linkedin: "https://www.linkedin.com/in/dust-shooter-408560340/",
  },
} as const;

const localeToOgLocale: Record<AppLocale, string> = {
  ko: "ko_KR",
  en: "en_US",
};

export function getBaseUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return siteConfig.siteUrl;
  }

  return configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;
}

export function localizePath(locale: AppLocale, pathname = "/") {
  const normalizedPath =
    pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;

  if (locale === routing.defaultLocale) {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
}

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, getBaseUrl()).toString();
}

export function getLanguageAlternates(pathname = "/") {
  return {
    "ko-KR": localizePath("ko", pathname),
    "en-US": localizePath("en", pathname),
    "x-default": localizePath(routing.defaultLocale, pathname),
  } as const;
}

type PageMetadataInput = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords = [],
}: PageMetadataInput): Metadata {
  const localizedPath = localizePath(locale, pathname);

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    keywords,
    alternates: {
      canonical: localizedPath,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath),
      siteName: siteConfig.name,
      locale: localeToOgLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getProjectPath(slug: string) {
  return `/project/${slug}`;
}

export function buildPersonJsonLd(locale: AppLocale) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl(localizePath(locale, "/")),
      inLanguage: locale,
      description: siteConfig.defaultDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Manjoong Kim",
      url: absoluteUrl(localizePath(locale, "/")),
      jobTitle: "Frontend · Product Engineer",
      sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Frontend Architecture",
        "Performance Optimization",
        "Data Visualization",
        "OpenAPI",
      ],
    },
  ];
}

export function buildProjectJsonLd(project: Project, locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(localizePath(locale, getProjectPath(project.slug))),
    codeRepository: project.links.github,
    programmingLanguage: project.tech.stack,
    keywords: project.metadata.tags.join(", "),
    datePublished: project.metadata.publishedAt,
    dateModified: project.metadata.updatedAt ?? project.metadata.publishedAt,
    author: {
      "@type": "Person",
      name: "Manjoong Kim",
    },
  };
}
