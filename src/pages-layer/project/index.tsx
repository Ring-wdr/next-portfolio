"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { TechStackEnum } from "@/shared/constant/tech-stack";
import { projectList, type ProjectProps } from "@/shared/constant/project";
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
  const [selectedTech, setSelectedTech] = useState<TechStackEnum | "All">("All");

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

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="tracking-light text-[32px] font-bold leading-tight">
              {t("title")}
            </p>
            <p className="text-muted-foreground text-sm font-normal leading-normal">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 px-4 pb-2">
          {viewModes.map((mode) => (
            <button
              key={mode}
              type="button"
              className={classNames(
                "flex h-8 shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors",
                viewMode === mode
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-foreground hover:border-primary"
              )}
              onClick={() => setViewMode(mode)}
            >
              {mode === "All" ? t("all") : t("featured")}
            </button>
          ))}
        </div>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          {categoryFilters.map((category) => (
            <button
              key={category}
              type="button"
              className={classNames(
                "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer",
                selectedCategory === category
                  ? "bg-primary text-background"
                  : "bg-secondary text-primary"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              <p className="text-sm font-medium leading-normal">
                {category === "All" ? t("allCategory") : t(`categories.${category}`)}
              </p>
            </button>
          ))}
        </div>
        <div className="flex gap-2 px-4 pb-4 flex-wrap">
          {techFilters.map((tech) => (
            <button
              key={tech}
              type="button"
              className={classNames(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                selectedTech === tech
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-primary"
              )}
              onClick={() => setSelectedTech(tech)}
            >
              {tech === "All" ? t("allTech") : tech}
            </button>
          ))}
        </div>
        <p className="px-4 pb-2 text-sm text-muted-foreground">
          {t("results", { count: filteredProjects.length })}
        </p>
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
        {filteredProjects.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center mx-4">
            <p className="text-base font-medium">{t("emptyTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("emptyDescription")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
