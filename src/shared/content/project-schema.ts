// Contract for the project manifest published to Vercel Blob by the
// Ring-wdr/portfolio-content repository. Its scripts/schema.ts mirrors this
// file, so change both together.
import { z } from "zod";

const text = z.string().trim().min(1);

/**
 * An image URL or site path. In the content repo this may be a relative
 * `images/…` path; the publish script uploads it and rewrites it to a Blob URL.
 */
const imageRef = text;

const titledItem = z.object({ title: text, description: text });

export const projectSchema = z.object({
  /** URL segment for /project/[slug] */
  slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug"),
  title: text,
  thumbnail: imageRef,
  /** One-line summary */
  summary: text,
  period: text,
  team: text,
  role: text,

  /** Project card / list page metadata */
  card: z.object({
    category: z.enum(["Product", "Client", "Study"]),
    featured: z.boolean(),
    status: z.enum(["Live", "Prototype", "Archived"]),
    impact: text,
    result: text,
  }),

  /** Extra names visitors (and models) use for this project in chat */
  aliases: z.array(text).default([]),

  links: z.object({
    github: z.url().optional(),
    demo: z.url().optional(),
    etc: z.array(z.object({ label: text, url: z.url() })).optional(),
  }),

  overview: z.object({
    background: text,
    goal: text,
    features: z.array(text),
  }),

  tech: z.object({
    stack: z.array(text),
    challenges: z.array(titledItem),
    solutions: z.array(titledItem),
  }),

  achievements: z.object({
    metrics: z.array(z.object({ label: text, value: text })).optional(),
    feedback: z.array(text).optional(),
    improvements: z.array(text).optional(),
  }),

  gallery: z.array(
    z.object({ src: imageRef, alt: text, caption: text.optional() }),
  ),

  metadata: z.object({
    publishedAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().optional(),
    tags: z.array(text),
  }),
});

export const projectManifestSchema = z
  .object({ projects: z.array(projectSchema) })
  .superRefine(({ projects }, ctx) => {
    const seen = new Set<string>();
    projects.forEach((project, index) => {
      if (seen.has(project.slug)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate slug: ${project.slug}`,
          path: ["projects", index, "slug"],
        });
      }
      seen.add(project.slug);
    });
  });

export type Project = z.infer<typeof projectSchema>;
export type ProjectManifest = z.infer<typeof projectManifestSchema>;

/** Blob pathname prefixes used by the publish script and the site loader. */
export const CONTENT_BLOB_PREFIX = "portfolio";
export const MANIFEST_BLOB_PREFIX = `${CONTENT_BLOB_PREFIX}/manifests/`;
export const IMAGE_BLOB_PREFIX = `${CONTENT_BLOB_PREFIX}/images/`;

/** Cache tag revalidated after every publish. */
export const PROJECTS_CACHE_TAG = "projects";

export function isAbsoluteUrl(ref: string) {
  return /^https?:\/\//.test(ref);
}
