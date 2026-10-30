"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import { categoryBlockClassName, type ProjectCard } from "@/shared/content/project";
import { TransitionLink } from "@/shared/ui/transition-link";
import { classNames } from "@/shared/utils/classnames";
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
	const shownStack = techStack.slice(0, 4);
	const hiddenStackCount = techStack.length - shownStack.length;

	return (
		<article className="group flex h-full flex-col gap-4 rounded-[1.75rem] bg-card p-3">
			{/* The image sits on its category's block color, framing it like a tile */}
			<ViewTransition
				default="vt-project-image"
				enter="vt-project-image"
				exit="vt-project-image"
				share="vt-project-image"
				update="vt-project-image"
			>
				<TransitionLink
					href={`/project/${slug}`}
					className={classNames(
						"relative block aspect-16/10 w-full overflow-hidden rounded-[1.25rem]",
						categoryBlockClassName[category],
					)}
					tabIndex={-1}
					aria-hidden
				>
					<Image
						src={src}
						alt=""
						fill
						sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
						className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
						unoptimized={isSvgSource(src)}
					/>
				</TransitionLink>
			</ViewTransition>
			<div className="flex flex-1 flex-col gap-3 px-2 pb-2">
				<div className="flex flex-wrap items-center gap-2 text-xs font-bold">
					<span className={classNames("rounded-full px-2.5 py-1", categoryBlockClassName[category])}>
						{t(`categories.${category}`)}
					</span>
					<span className="text-muted-foreground">
						{year} · {t(`status.${status}`)}
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
						<h2 className="text-2xl type-heading transition-colors hover:text-primary md:text-[1.75rem]">
							{title}
						</h2>
					</ViewTransition>
				</TransitionLink>
				<p className="text-sm leading-6 text-foreground/86">{description}</p>
				<p className="rounded-2xl bg-background px-4 py-3 text-sm leading-6 font-medium">{result}</p>
				{role && (
					<p className="text-xs leading-5 text-muted-foreground">
						<span className="font-bold text-foreground">{t("roleLabel")}</span> · {role}
					</p>
				)}
				<ul className="flex flex-wrap gap-1.5" aria-label={t("stackLabel")}>
					{shownStack.map((tech) => (
						<li
							key={tech}
							className="rounded-full bg-background px-3 py-1 text-xs font-bold"
						>
							{tech}
						</li>
					))}
					{hiddenStackCount > 0 && (
						<li className="px-1 py-1 text-xs font-bold text-muted-foreground">+{hiddenStackCount}</li>
					)}
				</ul>

				<div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
					<TransitionLink
						href={`/project/${slug}`}
						className="inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
					>
						{t("openDetail")}
					</TransitionLink>
					{href && !href.startsWith("/") && (
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-bold text-primary hover:underline"
						>
							<span>{tDetail("externalLink")}</span>
							<ArrowUpRight size={14} aria-hidden />
						</a>
					)}
				</div>
			</div>
		</article>
	);
}
