import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { routing } from "@/i18n/routing";
import { absoluteUrl, getLanguageAlternates, getProjectPath, localizePath } from "@/shared/constant/site";
import { getProjects } from "@/shared/content/project-source";

const staticRoutes = ["/", "/about", "/project", "/fit", "/contact", "/tech-stack"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Render per request: on Vercel the prerendered sitemap isn't purged when
  // the "projects" tag is revalidated, so new slugs would wait up to a day.
  // getProjects() is still served from the tagged data cache.
  await connection();
  const projects = await getProjects();

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
    projects.map((project) => ({
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
