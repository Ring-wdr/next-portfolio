"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import { TransitionLink } from "@/shared/ui/transition-link";
import type { ProjectProps } from "@/shared/constant/project";
import { useTranslations } from "next-intl";

export function ProjectItem({
  src,
  title,
  href,
  slug,
  techStack,
  description,
}: ProjectProps) {
  const t = useTranslations("ProjectDetailPage");

  return (
    <div className="p-4 @container">
      <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
        <ViewTransition
          default="vt-project-image"
          enter="vt-project-image"
          exit="vt-project-image"
          share="vt-project-image"
          update="vt-project-image"
        >
          <TransitionLink
            href={`/project/${slug}`}
            className="relative w-full aspect-video rounded-lg overflow-hidden group"
          >
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </TransitionLink>
        </ViewTransition>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <TransitionLink href={`/project/${slug}`}>
            <ViewTransition
              name={`project-card-title-${slug}`}
              default="vt-project-title"
              enter="vt-project-title"
              exit="vt-project-title"
              share="vt-project-title"
              update="vt-project-title"
            >
              <p className="text-lg font-bold leading-tight tracking-[-0.015em] hover:text-primary transition-colors">
                {title}
              </p>
            </ViewTransition>
          </TransitionLink>
          <div className="flex items-end gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[#9cabba] text-base font-normal leading-normal">
                {techStack.join(", ")}
              </p>
              <div className="text-[#9cabba] text-base font-normal leading-normal">
                {description}
              </div>
            </div>
          </div>
          {href && (
            <div className="mt-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span>{t("externalLink")}</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
