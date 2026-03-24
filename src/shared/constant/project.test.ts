import { describe, expect, it } from "vitest";
import { getFeaturedProjects, projectList } from "./project";
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
});
