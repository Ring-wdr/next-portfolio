import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { env } from "@/env";
import { getFixtureProjects } from "./fixture-projects";
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
 * (published by Ring-wdr/portfolio-content), so the Blob CDN never serves a stale copy:
 * the listing API is uncached and picks the latest one.
 */
async function loadPublishedProjects(): Promise<Project[]> {
	const { blobs } = await list({ prefix: MANIFEST_BLOB_PREFIX });
	const latest = blobs.toSorted((a, b) =>
		b.pathname.localeCompare(a.pathname),
	)[0];

	if (!latest) {
		throw new Error(
			`No project manifest under ${MANIFEST_BLOB_PREFIX}; publish from portfolio-content first.`,
		);
	}

	const response = await fetch(latest.url);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch project manifest ${latest.pathname}: ${response.status}`,
		);
	}

	return projectManifestSchema.parse(await response.json()).projects;
}

const source = env.BLOB_STORE_ID || env.BLOB_READ_WRITE_TOKEN ? "blob" : "fixture";

const loadProjects = unstable_cache(
	async (): Promise<Project[]> => {
		// A failed read throws, so ISR keeps serving the last good pages.
		if (source === "blob") return loadPublishedProjects();

		console.warn("[content] No Blob store configured; using fixture projects.");
		return getFixtureProjects();
	},
	// The data cache outlives builds, so key by source: fixture results must
	// never be served once a Blob store is configured.
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
