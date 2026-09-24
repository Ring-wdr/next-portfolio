import type { Project } from "./project-schema";

export type { Project } from "./project-schema";

export type ProjectCategory = Project["card"]["category"];
export type ProjectStatus = Project["card"]["status"];

/** Flattened shape the project cards and list filters render. */
export type ProjectCard = {
	src: string;
	title: string;
	href: string;
	slug: string;
	description: string;
	techStack: string[];
	featured: boolean;
	category: ProjectCategory;
	year: number;
	role: string;
	impact: string;
	result: string;
	status: ProjectStatus;
};

export function getProjectPrimaryHref(project: Project) {
	return (
		project.links.demo ??
		project.links.github ??
		project.links.etc?.[0]?.url ??
		`/project/${project.slug}`
	);
}

export function getProjectYearFromPeriod(period: string) {
	const matchedYear = period.match(/\d{4}/)?.[0];

	if (matchedYear) {
		return Number.parseInt(matchedYear, 10);
	}

	return Number.NaN;
}

export function toProjectCard(project: Project): ProjectCard {
	return {
		src: project.thumbnail,
		title: project.title,
		href: getProjectPrimaryHref(project),
		slug: project.slug,
		description: project.summary,
		techStack: project.tech.stack,
		featured: project.card.featured,
		category: project.card.category,
		year: getProjectYearFromPeriod(project.period),
		role: project.role,
		impact: project.card.impact,
		result: project.card.result,
		status: project.card.status,
	};
}

export function getFeaturedProjects(projects: ProjectCard[], limit = 3) {
	return projects
		.filter((project) => project.featured)
		.toReversed()
		.slice(0, limit);
}
