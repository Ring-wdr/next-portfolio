"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { type ProjectProps, projectList } from "@/shared/constant/project";
import type { TechStackEnum } from "@/shared/constant/tech-stack";
import { classNames } from "@/shared/utils/classnames";
import { ProjectItem } from "./item";

type ProjectViewMode = "All" | "Featured";
type ProjectCategoryFilter = "All" | ProjectProps["category"];

const viewModes: ProjectViewMode[] = ["Featured", "All"];

export function ProjectPage() {
	const t = useTranslations("ProjectsPage");
	const [viewMode, setViewMode] = useState<ProjectViewMode>("Featured");
	const [selectedCategory, setSelectedCategory] =
		useState<ProjectCategoryFilter>("All");
	const [selectedTech, setSelectedTech] = useState<TechStackEnum | "All">(
		"All",
	);

	const categoryFilters: ProjectCategoryFilter[] = [
		"All",
		...new Set(projectList.map((project) => project.category)),
	];

	const techFilters: Array<TechStackEnum | "All"> = [
		"All",
		...new Set(projectList.flatMap((project) => project.techStack)),
	];

	const filteredProjects = projectList.filter((project) => {
		if (viewMode === "Featured" && !project.featured) return false;
		if (selectedCategory !== "All" && project.category !== selectedCategory) {
			return false;
		}
		if (selectedTech !== "All" && !project.techStack.includes(selectedTech)) {
			return false;
		}
		return true;
	});

	const featuredCount = projectList.filter(
		(project) => project.featured,
	).length;

	return (
		<main className="flex flex-1 justify-center py-6 md:py-10">
			<div className="section-shell flex w-full flex-col gap-6">
				<section className="glass-panel rounded-3xl p-6 md:p-8">
					<div className="space-y-3">
						<h1 className="text-3xl font-bold leading-tight md:text-4xl">
							{t("title")}
						</h1>
						<p className="max-w-3xl text-sm text-muted-foreground md:text-base">
							{t("description")}
						</p>
					</div>

					<div className="mt-6 grid gap-2 sm:grid-cols-3">
						<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
							<p className="text-lg font-semibold">{projectList.length}</p>
							<p className="text-xs text-muted-foreground">
								{t("stats.total")}
							</p>
						</div>
						<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
							<p className="text-lg font-semibold">{featuredCount}</p>
							<p className="text-xs text-muted-foreground">
								{t("stats.featured")}
							</p>
						</div>
						<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
							<p className="text-lg font-semibold">{filteredProjects.length}</p>
							<p className="text-xs text-muted-foreground">
								{t("stats.filtered")}
							</p>
						</div>
					</div>
				</section>

				<section className="glass-panel rounded-2xl p-4">
					<div className="flex flex-wrap items-center gap-2">
						{viewModes.map((mode) => (
							<button
								key={mode}
								type="button"
								className={classNames(
									"flex h-8 shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors",
									viewMode === mode
										? "border-primary bg-primary text-primary-foreground"
										: "border-border bg-secondary text-foreground hover:border-primary",
								)}
								onClick={() => setViewMode(mode)}
							>
								{mode === "All" ? t("all") : t("featured")}
							</button>
						))}
					</div>
					<div className="mt-3 flex flex-wrap gap-2">
						{categoryFilters.map((category) => (
							<button
								key={category}
								type="button"
								className={classNames(
									"flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-lg px-4",
									selectedCategory === category
										? "bg-primary text-primary-foreground"
										: "bg-secondary text-foreground",
								)}
								onClick={() => setSelectedCategory(category)}
							>
								<p className="text-sm font-medium leading-normal">
									{category === "All"
										? t("allCategory")
										: t(`categories.${category}`)}
								</p>
							</button>
						))}
					</div>
					<div className="mt-3 flex flex-wrap gap-2">
						{techFilters.map((tech) => (
							<button
								key={tech}
								type="button"
								className={classNames(
									"rounded-full border px-3 py-1 text-xs font-medium transition-colors",
									selectedTech === tech
										? "border-primary text-primary"
										: "border-border text-muted-foreground hover:border-primary",
								)}
								onClick={() => setSelectedTech(tech)}
							>
								{tech === "All" ? t("allTech") : tech}
							</button>
						))}
					</div>
					<p className="mt-3 text-sm text-muted-foreground">
						{t("results", { count: filteredProjects.length })}
					</p>
				</section>

				<section className="space-y-3">
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
					<div className="mx-4 rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
						<p className="text-base font-medium">{t("emptyTitle")}</p>
						<p className="mt-2 text-sm text-muted-foreground">
							{t("emptyDescription")}
						</p>
					</div>
				)}
			</div>
		</main>
	);
}
