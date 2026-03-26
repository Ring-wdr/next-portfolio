import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, getLanguageAlternates, getProjectPath, localizePath } from "@/shared/constant/site";
import { projectDetailList } from "@/shared/constant/project-detail";

const staticRoutes = ["/", "/about", "/project", "/contact", "/tech-stack"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "/" ? "weekly" : "monthly";

      return {
        url: absoluteUrl(localizePath(locale, route)),
        lastModified: new Date(),
        changeFrequency,
        priority: route === "/" ? 1 : 0.7,
        alternates: {
          languages: getLanguageAlternates(route),
        },
      };
    })
  );

  const projectEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    projectDetailList.map((project) => ({
      url: absoluteUrl(localizePath(locale, getProjectPath(project.slug))),
      lastModified: new Date(project.metadata.updatedAt ?? project.metadata.publishedAt),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates(getProjectPath(project.slug)),
      },
    }))
  );

  return [...staticEntries, ...projectEntries];
}
