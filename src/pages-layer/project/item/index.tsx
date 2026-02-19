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
  category,
  year,
  role,
  impact,
  result,
  status,
}: ProjectProps) {
  const t = useTranslations("ProjectsPage");
  const tDetail = useTranslations("ProjectDetailPage");

  return (
    <div className="p-4 @container">
      <article className="flex flex-col items-stretch justify-start rounded-xl border border-border bg-card/70 backdrop-blur-sm @xl:flex-row @xl:items-stretch">
        <ViewTransition
          default="vt-project-image"
          enter="vt-project-image"
          exit="vt-project-image"
          share="vt-project-image"
          update="vt-project-image"
        >
          <TransitionLink
            href={`/project/${slug}`}
            className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl group @xl:w-[360px] @xl:min-w-[360px] @xl:aspect-auto @xl:rounded-l-xl @xl:rounded-tr-none"
          >
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </TransitionLink>
        </ViewTransition>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-3 p-5 @xl:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
              {t(`categories.${category}`)}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {year}
            </span>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {t(`status.${status}`)}
            </span>
          </div>
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
          <p className="text-sm font-medium text-muted-foreground">
            {t("roleLabel")}: {role}
          </p>
          <div className="flex items-end gap-3 justify-between">
            <div className="flex flex-col gap-2">
              <div className="text-sm leading-normal text-muted-foreground line-clamp-3">
                {description}
              </div>
              <p className="text-sm leading-normal text-muted-foreground">
                <span className="font-semibold text-foreground">{t("impactLabel")}: </span>
                {impact}
              </p>
              <p className="text-sm leading-normal text-muted-foreground">
                <span className="font-semibold text-foreground">{t("resultLabel")}: </span>
                {result}
              </p>
              <p className="text-sm font-normal leading-normal text-muted-foreground">
                {techStack.join(" • ")}
              </p>
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
                <span>{tDetail("externalLink")}</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
