"use client";

import { useState } from "react";
import type { TechStackEnum } from "@/shared/constant/tech-stack";
import { projectList } from "@/shared/constant/project";
import { classNames } from "@/shared/utils/classnames";
import { ProjectItem } from "./item";

const frameworks = ["All", "Next.js", "SvelteKit", "React"] satisfies Array<
  TechStackEnum | "All"
>;

export function ProjectPage() {
  const [selectedFramework, setSelectedFramework] = useState<
    TechStackEnum | "All"
  >("All");

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="tracking-light text-[32px] font-bold leading-tight">
              Projects
            </p>
            <p className="text-[#9cabba] text-sm font-normal leading-normal">
              Explore a selection of my recent projects, showcasing my skills in
              front-end development. Each project includes a brief description,
              screenshots, and links to live demos or repositories.
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          {frameworks.map((framework) => (
            <button
              key={framework}
              type="button"
              className={classNames(
                "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer",
                selectedFramework === framework
                  ? "bg-primary text-background"
                  : "bg-secondary text-primary"
              )}
              onClick={() => setSelectedFramework(framework)}
            >
              <p className="text-sm font-medium leading-normal">{framework}</p>
            </button>
          ))}
        </div>
        {projectList
          .filter((project) => {
            if (selectedFramework === "All") return true;
            return project.techStack.includes(selectedFramework);
          })
          .map((project) => (
            <ProjectItem
              key={project.title}
              src={project.src}
              title={project.title}
              href={project.href}
              techStack={project.techStack}
              description={project.description}
            />
          ))}
      </div>
    </div>
  );
}
