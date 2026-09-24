import localManifest from "@/../content/projects.json";
import {
	isAbsoluteUrl,
	projectManifestSchema,
	type Project,
} from "./project-schema";

/** Serves content/images/** when projects come from the local source. */
export const LOCAL_CONTENT_ROUTE = "/api/content/local";

function resolveLocalImage(ref: string) {
	return isAbsoluteUrl(ref) ? ref : `${LOCAL_CONTENT_ROUTE}/${ref}`;
}

/**
 * Projects from the checked-in content/projects.json. Used when no Blob store
 * is configured (CI, local dev without `vercel env pull`), before the first
 * publish, and as the fixture for unit tests.
 */
export function getLocalProjects(): Project[] {
	return projectManifestSchema.parse(localManifest).projects.map((project) => ({
		...project,
		thumbnail: resolveLocalImage(project.thumbnail),
		gallery: project.gallery.map((image) => ({
			...image,
			src: resolveLocalImage(image.src),
		})),
	}));
}
