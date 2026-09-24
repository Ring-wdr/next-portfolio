import fixture from "./fixture/projects.json";
import { projectManifestSchema, type Project } from "./project-schema";

/**
 * Stand-in projects for unit tests and for builds without a Blob store (CI,
 * local dev before `vercel env pull`). Real content lives in the
 * Ring-wdr/portfolio-content repository and is published to Blob.
 */
export function getFixtureProjects(): Project[] {
	return projectManifestSchema.parse(fixture).projects;
}
