import { describe, expect, it } from "vitest";
import fixture from "./fixture/projects.json";
import { getFixtureProjects } from "./fixture-projects";
import {
	getFeaturedProjects,
	getProjectPrimaryHref,
	getProjectYearFromPeriod,
	toProjectCard,
} from "./project";
import { projectManifestSchema } from "./project-schema";

const projects = getFixtureProjects();
const cards = projects.map(toProjectCard);

describe("project content", () => {
	it("fixture satisfies the manifest schema", () => {
		expect(projectManifestSchema.safeParse(fixture).success).toBe(true);
	});

	it("rejects duplicate slugs", () => {
		const [first] = fixture.projects;
		const result = projectManifestSchema.safeParse({ projects: [first, first] });
		expect(result.success).toBe(false);
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
