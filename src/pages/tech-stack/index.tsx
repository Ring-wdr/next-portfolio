import { TechStack, TechStackCategory } from "@/shared/constant/tech-stack";
import { Fragment } from "react";

export function TechStackPage() {
  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="tracking-light text-[32px] font-bold leading-tight">
              Skills
            </p>
            <p className="text-[#9cabba] text-sm font-normal leading-normal">
              I&apos;m proficient in a variety of front-end technologies and
              tools, constantly expanding my knowledge to stay current with
              industry trends.
            </p>
          </div>
        </div>
        {TechStackCategory.map((category) => (
          <Fragment key={category}>
            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              {category}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-4">
              {TechStack.filter((tech) =>
                tech.category.some((_category) => _category === category)
              ).map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-secondary p-4 items-center"
                >
                  {tech.icon}
                  <h2 className="text-base font-bold leading-tight">
                    {tech.name}
                  </h2>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
