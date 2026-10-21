"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import type { ProjectCard } from "@/shared/content/project";
import { TransitionLink } from "@/shared/ui/transition-link";
import { isSvgSource } from "@/shared/utils/image";

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
	result,
	status,
}: ProjectCard) {
	const t = useTranslations("ProjectsPage");
	const tDetail = useTranslations("ProjectDetailPage");

	return (
		<div className="@container">
			<article className="glass-panel flex flex-col items-stretch justify-start overflow-hidden rounded-2xl @xl:flex-row @xl:items-stretch">
				<ViewTransition
					default="vt-project-image"
					enter="vt-project-image"
					exit="vt-project-image"
					share="vt-project-image"
					update="vt-project-image"
				>
					<TransitionLink
						href={`/project/${slug}`}
						className="group relative aspect-16/10 w-full shrink-0 self-start overflow-hidden @xl:w-[360px]"
						tabIndex={-1}
						aria-hidden
					>
						<Image
							src={src}
							alt=""
							fill
							sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
							className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
							unoptimized={isSvgSource(src)}
						/>
					</TransitionLink>
				</ViewTransition>
				<div className="flex w-full min-w-0 grow flex-col items-stretch justify-center gap-3 p-5 @xl:px-6">
					<p className="text-xs font-medium text-muted-foreground">
						{[t(`categories.${category}`), year, t(`status.${status}`)].join(" · ")}
					</p>
					<TransitionLink href={`/project/${slug}`}>
						<ViewTransition
							name={`project-card-title-${slug}`}
							default="vt-project-title"
							enter="vt-project-title"
							exit="vt-project-title"
							share="vt-project-title"
							update="vt-project-title"
						>
							<h2 className="text-lg font-bold leading-tight tracking-[-0.015em] transition-colors hover:text-primary">
								{title}
							</h2>
						</ViewTransition>
					</TransitionLink>
					<p className="text-sm leading-relaxed text-foreground/88">{description}</p>
					<p className="text-sm leading-relaxed text-muted-foreground">{result}</p>
					{role && (
						<p className="text-xs text-muted-foreground">
							{t("roleLabel")}: {role}
						</p>
					)}
					<ul className="flex flex-wrap gap-1.5" aria-label={t("stackLabel")}>
						{techStack.map((tech) => (
							<li
								key={tech}
								className="rounded-md bg-secondary px-2 py-0.5 text-[0.75rem] text-muted-foreground"
							>
								{tech}
							</li>
						))}
					</ul>

					<div className="mt-1 flex flex-wrap items-center gap-3">
						<TransitionLink
							href={`/project/${slug}`}
							className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card/60 px-4 text-sm font-medium transition-colors hover:bg-secondary"
						>
							{t("openDetail")}
						</TransitionLink>
						{href && !href.startsWith("/") && (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-11 items-center gap-1 px-1 text-sm text-primary hover:underline"
							>
								<span>{tDetail("externalLink")}</span>
								<ArrowUpRight size={14} aria-hidden />
							</a>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}
