import { describe, expect, it } from "vitest";
import {
	getFeaturedProjects,
	getProjectPrimaryHref,
	getProjectYearFromPeriod,
	projectList,
} from "./project";
import { projectDetailList } from "./project-detail";

describe("project constants", () => {
	it("featured project helper only returns featured entries", () => {
		expect(getFeaturedProjects(10).every((project) => project.featured)).toBe(true);
	});

	it("project and detail slugs stay in sync", () => {
		const listSlugs = projectList.map((project) => project.slug).sort();
		const detailSlugs = projectDetailList.map((project) => project.slug).sort();

		expect(detailSlugs).toEqual(listSlugs);
	});

	it("recruiter-facing project facts stay aligned with detail data", () => {
		for (const detail of projectDetailList) {
			const listProject = projectList.find((project) => project.slug === detail.slug);

			expect(listProject).toBeDefined();
			expect(listProject).toMatchObject({
				title: detail.title,
				description: detail.summary,
				techStack: detail.tech.stack,
				role: detail.role,
				href: getProjectPrimaryHref(detail),
				year: getProjectYearFromPeriod(detail.period),
			});
		}
	});

	it("every project card metadata entry resolves to a usable year", () => {
		for (const project of projectList) {
			expect(Number.isNaN(project.year)).toBe(false);
		}
	});
});
