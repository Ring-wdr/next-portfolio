import { describe, expect, it } from "vitest";
import localManifest from "@/../content/projects.json";
import { getLocalProjects, LOCAL_CONTENT_ROUTE } from "./local-projects";
import {
	getFeaturedProjects,
	getProjectPrimaryHref,
	getProjectYearFromPeriod,
	toProjectCard,
} from "./project";
import { projectManifestSchema } from "./project-schema";

const projects = getLocalProjects();
const cards = projects.map(toProjectCard);

describe("project content", () => {
	it("local content satisfies the manifest schema", () => {
		expect(projectManifestSchema.safeParse(localManifest).success).toBe(true);
	});

	it("rejects duplicate slugs", () => {
		const [first] = localManifest.projects;
		const result = projectManifestSchema.safeParse({ projects: [first, first] });
		expect(result.success).toBe(false);
	});

	it("resolves relative images to the local content route", () => {
		for (const project of projects) {
			for (const src of [project.thumbnail, ...project.gallery.map((g) => g.src)]) {
				expect(src.startsWith("https://") || src.startsWith(`${LOCAL_CONTENT_ROUTE}/images/`)).toBe(true);
			}
		}
	});

	it("featured project helper only returns featured entries", () => {
		expect(getFeaturedProjects(cards, 10).every((project) => project.featured)).toBe(true);
	});

	it("recruiter-facing card facts stay aligned with detail data", () => {
		for (const project of projects) {
			expect(toProjectCard(project)).toMatchObject({
				title: project.title,
				description: project.summary,
				techStack: project.tech.stack,
				role: project.role,
				href: getProjectPrimaryHref(project),
				year: getProjectYearFromPeriod(project.period),
			});
		}
	});

	it("every project card resolves to a usable year", () => {
		for (const card of cards) {
			expect(Number.isNaN(card.year)).toBe(false);
		}
	});
});
