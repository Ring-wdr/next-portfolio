"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import type { ProjectProps } from "@/shared/constant/project";
import { TransitionLink } from "@/shared/ui/transition-link";

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
						className="group relative aspect-16/10 w-full overflow-hidden @xl:w-[360px] @xl:min-w-[360px] @xl:aspect-auto"
					>
						<Image
							src={src}
							alt={title}
							fill
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</TransitionLink>
				</ViewTransition>
				<div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-4 p-5 @xl:px-6">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
							{t("storyLabel")}
						</span>
						<span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
							{t(`categories.${category}`)}
						</span>
						<span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
							{year}
						</span>
						<span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
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
					<div className="flex flex-col gap-2">
						<div className="line-clamp-3 text-sm leading-normal text-muted-foreground">
							{description}
						</div>
						<p className="text-sm leading-normal text-muted-foreground">
							<span className="font-semibold text-foreground">
								{t("impactLabel")}:{" "}
							</span>
							{impact}
						</p>
						<p className="text-sm leading-normal text-muted-foreground">
							<span className="font-semibold text-foreground">
								{t("resultLabel")}:{" "}
							</span>
							{result}
						</p>
						<p className="text-sm leading-normal text-muted-foreground">
							<span className="font-semibold text-foreground">
								{t("stackLabel")}:{" "}
							</span>
							{techStack.join(" • ")}
						</p>
					</div>

					<div className="mt-2 flex flex-wrap items-center gap-3">
						<TransitionLink
							href={`/project/${slug}`}
							className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary"
						>
							{t("openDetail")}
						</TransitionLink>
						{href && (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
							>
								<span>{tDetail("externalLink")}</span>
								<span>↗</span>
							</a>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}
