"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { categoryBlockClassName, type ProjectCard } from "@/shared/content/project";
import { StatGrid } from "@/shared/ui/stat-grid";
import { classNames } from "@/shared/utils/classnames";
import { ProjectItem } from "./item";

type ProjectViewMode = "All" | "Featured";
type ProjectCategoryFilter = "All" | ProjectCard["category"];

const viewModes: ProjectViewMode[] = ["All", "Featured"];

export function ProjectPage({ projects }: { projects: ProjectCard[] }) {
	const t = useTranslations("ProjectsPage");
	const [viewMode, setViewMode] = useState<ProjectViewMode>("All");
	const [selectedCategory, setSelectedCategory] =
		useState<ProjectCategoryFilter>("All");
	const [selectedTech, setSelectedTech] = useState<string>(
		"All",
	);
	const [isTechFilterOpen, setIsTechFilterOpen] = useState(false);

	const categoryFilters: ProjectCategoryFilter[] = [
		"All",
		...new Set(projects.map((project) => project.category)),
	];

	const techFilters: string[] = [
		"All",
		...new Set(projects.flatMap((project) => project.techStack)),
	];

	const filteredProjects = projects.filter((project) => {
		if (viewMode === "Featured" && !project.featured) return false;
		if (selectedCategory !== "All" && project.category !== selectedCategory) {
			return false;
		}
		if (selectedTech !== "All" && !project.techStack.includes(selectedTech)) {
			return false;
		}
		return true;
	});

	const featuredCount = projects.filter(
		(project) => project.featured,
	).length;

	const stats = [
		{ value: `${projects.length}`, label: t("stats.total"), color: "bg-butter" },
		{ value: `${featuredCount}`, label: t("stats.featured"), color: "bg-mint" },
		{ value: `${filteredProjects.length}`, label: t("stats.filtered"), color: "bg-tangerine" },
	] as const;

	return (
		<main className="flex flex-1 flex-col">
			<section className="bg-hero-bg text-hero-fg">
				<div className="section-shell @container flex flex-col gap-6 pt-10 pb-10 md:pt-14 md:pb-14">
					<h1 className="type-display display-fit-xl">{t("title")}</h1>
					<p className="max-w-3xl text-sm leading-6 text-on-cobalt/84 md:text-base md:leading-7">
						{t("description")}
					</p>
				</div>
			</section>

			<div className="section-shell flex w-full flex-col gap-8 pt-3 pb-14 md:pb-20">
				<StatGrid stats={stats} className="hidden sm:grid" />

				<section className="flex flex-col gap-4 border-b border-border pb-6">
					<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
						<div className="flex rounded-full bg-card p-1">
							{viewModes.map((mode) => (
								<button
									key={mode}
									type="button"
									aria-pressed={viewMode === mode}
									className={classNames(
										"flex h-10 items-center rounded-full px-4 text-sm font-bold transition-colors",
										viewMode === mode
											? "bg-foreground text-background"
											: "text-muted-foreground hover:text-foreground",
									)}
									onClick={() => setViewMode(mode)}
								>
									{mode === "All" ? t("all") : t("featured")}
								</button>
							))}
						</div>
						<div className="flex flex-wrap gap-2">
							{categoryFilters.map((category) => (
								<button
									key={category}
									type="button"
									aria-pressed={selectedCategory === category}
									className={classNames(
										"flex h-10 items-center rounded-full px-4 text-sm font-bold transition-colors",
										selectedCategory === category
											? category === "All"
												? "bg-foreground text-background"
												: categoryBlockClassName[category]
											: "bg-card text-foreground hover:bg-surface-strong",
									)}
									onClick={() => setSelectedCategory(category)}
								>
									{category === "All"
										? t("allCategory")
										: t(`categories.${category}`)}
								</button>
							))}
						</div>
					</div>
					<div className="flex flex-wrap items-center justify-between gap-3">
						<button
							type="button"
							className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
							aria-expanded={isTechFilterOpen}
							aria-controls="project-tech-filter"
							onClick={() => setIsTechFilterOpen((open) => !open)}
						>
							{t("filterByTech")}
							{selectedTech !== "All" && (
								<span className="rounded-full bg-butter px-2.5 py-0.5 text-xs text-on-block">
									{selectedTech}
								</span>
							)}
							<ChevronDown
								size={16}
								aria-hidden
								className={classNames(
									"transition-transform",
									isTechFilterOpen && "rotate-180",
								)}
							/>
						</button>
						<p className="text-sm font-bold" aria-live="polite">
							{t("results", { count: filteredProjects.length })}
						</p>
					</div>
					{isTechFilterOpen && (
						<div id="project-tech-filter" className="flex flex-wrap gap-2">
							{techFilters.map((tech) => (
								<button
									key={tech}
									type="button"
									aria-pressed={selectedTech === tech}
									className={classNames(
										"min-h-10 rounded-full px-3.5 text-xs font-bold transition-colors",
										selectedTech === tech
											? "bg-butter text-on-block"
											: "bg-card text-muted-foreground hover:text-foreground",
									)}
									onClick={() => setSelectedTech(tech)}
								>
									{tech === "All" ? t("allTech") : tech}
								</button>
							))}
						</div>
					)}
				</section>

				<section className="grid grid-cols-1 gap-3 md:grid-cols-2">
					{filteredProjects.map((project) => (
						<ProjectItem
							key={project.title}
							src={project.src}
							title={project.title}
							href={project.href}
							slug={project.slug}
							techStack={project.techStack}
							description={project.description}
							category={project.category}
							featured={project.featured}
							year={project.year}
							role={project.role}
							impact={project.impact}
							result={project.result}
							status={project.status}
						/>
					))}
				</section>
				{filteredProjects.length === 0 && (
					<div className="rounded-[1.75rem] bg-card px-6 py-14 text-center">
						<p className="text-lg type-heading">{t("emptyTitle")}</p>
						<p className="mt-2 text-sm text-muted-foreground">
							{t("emptyDescription")}
						</p>
					</div>
				)}
			</div>
		</main>
	);
}
