import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { env } from "@/env";
import { getLocalProjects } from "./local-projects";
import {
	MANIFEST_BLOB_PREFIX,
	PROJECTS_CACHE_TAG,
	projectManifestSchema,
	type Project,
} from "./project-schema";

// Safety net in case a publish forgets to call /api/revalidate.
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Reads the newest manifest. Manifests are immutable, timestamp-named files
 * (see scripts/content/publish.mts), so the Blob CDN never serves a stale copy:
 * the listing API is uncached and picks the latest one.
 */
async function loadPublishedProjects(): Promise<Project[] | null> {
	const { blobs } = await list({ prefix: MANIFEST_BLOB_PREFIX });
	const latest = blobs.toSorted((a, b) =>
		b.pathname.localeCompare(a.pathname),
	)[0];

	if (!latest) return null;

	const response = await fetch(latest.url);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch project manifest ${latest.pathname}: ${response.status}`,
		);
	}

	return projectManifestSchema.parse(await response.json()).projects;
}

const source = env.BLOB_STORE_ID || env.BLOB_READ_WRITE_TOKEN ? "blob" : "local";

const loadProjects = unstable_cache(
	async (): Promise<Project[]> => {
		if (source === "blob") {
			const published = await loadPublishedProjects();
			if (published) return published;
			console.warn(
				"[content] No published manifest in Blob yet; using content/projects.json.",
			);
		}
		return getLocalProjects();
	},
	// The data cache outlives builds, so key by source: a result cached from
	// content/ must not be served once a Blob store is configured.
	["project-manifest", source],
	{ tags: [PROJECTS_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

export function getProjects(): Promise<Project[]> {
	return loadProjects();
}

export async function getProjectBySlug(slug: string) {
	const projects = await getProjects();
	return projects.find((project) => project.slug === slug);
}
