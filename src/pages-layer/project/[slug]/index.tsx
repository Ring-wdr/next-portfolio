"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import { ProjectAsk } from "@/feature/chat/ui/project-ask";
import { Link } from "@/i18n/routing";
import type { Project } from "@/shared/content/project";
import { ImageGallery } from "@/shared/ui/image-gallery";
import { isSvgSource } from "@/shared/utils/image";

type ProjectDetailPageProps = {
	project: Project;
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
	const t = useTranslations("ProjectDetailPage");
	const facts = [
		{ label: t("organization"), value: project.organization },
		{ label: t("period"), value: project.period },
		{ label: t("team"), value: project.team },
		{ label: t("role"), value: project.role },
	].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));
	const { metrics, feedback, improvements } = project.achievements;
	const hasAchievements = Boolean(
		metrics?.length || feedback?.length || improvements?.length,
	);
	const visibleGallery = project.gallery.filter((image) => !image.hidden);
	// A diagram used as the thumbnail is shown once, in the hero slot.
	const heroDiagram =
		project.diagram?.src === project.thumbnail ? project.diagram : undefined;
	const thumbnailIsSvg = isSvgSource(project.thumbnail);
	const briefRows = (
		["audience", "problem", "contribution", "outcome"] as const
	).flatMap((key) => {
		const value = project.brief?.[key];
		return value ? [{ key, label: t(`brief.${key}`), value }] : [];
	});

	return (
		<main className="flex flex-1 justify-center py-6 md:py-10">
			<div className="section-shell flex w-full max-w-6xl flex-col gap-4">
				<section className="glass-panel rounded-3xl p-6 md:p-8">
					<div className="flex flex-col gap-3">
						<ViewTransition
							name={`project-detail-title-${project.slug}`}
							default="vt-project-title"
							enter="vt-project-title"
							exit="vt-project-title"
							share="vt-project-title"
							update="vt-project-title"
						>
							<h1 className="text-4xl font-bold tracking-tight">
								{project.title}
							</h1>
						</ViewTransition>
						<p className="text-lg text-muted-foreground md:text-xl">
							{project.summary}
						</p>
					</div>

					<dl className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
						{facts.map((fact) => (
							<div
								key={fact.label}
								className="rounded-xl border border-border/70 bg-card/70 px-4 py-3"
							>
								<dt className="text-xs text-muted-foreground">{fact.label}</dt>
								<dd className="mt-1 text-sm font-semibold">{fact.value}</dd>
							</div>
						))}
					</dl>

					<div className="mt-5 flex flex-wrap gap-2">
						{project.links.github && (
							<a
								href={project.links.github}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
							>
								{t("github")}
							</a>
						)}
						{project.links.demo && (
							<a
								href={project.links.demo}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg border border-border bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
							>
								{t("liveDemo")}
							</a>
						)}
						{project.links.etc?.map((link) => (
							<a
								key={link.url}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg border border-border bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
							>
								{link.label}
							</a>
						))}
					</div>
				</section>

				{briefRows.length > 0 && (
					<section
						className="glass-panel rounded-2xl p-5 md:p-6"
						aria-labelledby="project-brief-title"
						data-testid="project-brief"
					>
						<h2 id="project-brief-title" className="sr-only">
							{t("brief.title")}
						</h2>
						<dl className="grid gap-5 md:grid-cols-2">
							{briefRows.map((row) => (
								<div key={row.key} className="space-y-1.5">
									<dt className="text-sm font-semibold text-primary">{row.label}</dt>
									<dd className="text-base leading-relaxed">{row.value}</dd>
								</div>
							))}
						</dl>
					</section>
				)}

				<ProjectAsk
					slug={project.slug}
					title={project.shortTitle ?? project.title}
				/>

				<figure className="glass-panel rounded-2xl p-4 md:p-5">
					<ViewTransition
						name={`project-detail-image-${project.slug}`}
						default="vt-project-image"
						enter="vt-project-image"
						exit="vt-project-image"
						share="vt-project-image"
						update="vt-project-image"
					>
						<div className="relative aspect-16/10 w-full overflow-hidden rounded-xl">
							<Image
								src={project.thumbnail}
								alt={heroDiagram?.alt ?? project.title}
								fill
								sizes="(min-width: 1024px) 1024px, 100vw"
								className={thumbnailIsSvg ? "bg-white object-contain" : "object-cover object-top"}
								unoptimized={thumbnailIsSvg}
								priority
							/>
						</div>
					</ViewTransition>
					{heroDiagram?.caption && (
						<figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
							{heroDiagram.caption}
						</figcaption>
					)}
				</figure>

				<section className="glass-panel rounded-2xl p-5 md:p-6">
					<h2 className="mb-5 text-2xl font-bold">{t("overview")}</h2>
					<div className="flex flex-col gap-6">
						<div>
							<h3 className="mb-2 text-sm font-semibold text-primary">
								{t("background")}
							</h3>
							<p className="text-base leading-relaxed">
								{project.overview.background}
							</p>
						</div>
						{project.overview.goal && (
							<div>
								<h3 className="mb-2 text-sm font-semibold text-primary">
									{t("goal")}
								</h3>
								<p className="text-base leading-relaxed">
									{project.overview.goal}
								</p>
							</div>
						)}
						{project.overview.features.length > 0 && (
							<div>
								<h3 className="mb-2 text-sm font-semibold text-primary">
									{t("features")}
								</h3>
								<ul className="list-disc list-inside space-y-2">
									{project.overview.features.map((feature) => (
										<li key={feature} className="text-base leading-relaxed">
											{feature}
										</li>
									))}
								</ul>
							</div>
						)}
						{project.diagram && !heroDiagram && (
							<figure className="space-y-3">
								<h3 className="text-sm font-semibold text-primary">
									{t("diagram")}
								</h3>
								<Image
									src={project.diagram.src}
									alt={project.diagram.alt}
									width={1600}
									height={1000}
									sizes="(min-width: 1024px) 1024px, 100vw"
									className="h-auto w-full rounded-xl border border-border/70 bg-white"
									unoptimized={isSvgSource(project.diagram.src)}
								/>
								{project.diagram.caption && (
									<figcaption className="text-sm leading-relaxed text-muted-foreground">
										{project.diagram.caption}
									</figcaption>
								)}
							</figure>
						)}
					</div>
				</section>

				{project.narrative?.map((section) => (
					<section
						key={section.title}
						className="glass-panel rounded-2xl p-5 md:p-6"
					>
						<h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
						<p className="text-base leading-relaxed">{section.description}</p>
					</section>
				))}

				{project.tech.challenges.length > 0 && (
				<section className="glass-panel rounded-2xl p-5 md:p-6">
					<h2 className="mb-6 text-2xl font-bold">
						{t("challengesAndSolutions")}
					</h2>
					<div className="flex flex-col gap-8">
						{project.tech.challenges.map((challenge, index) => (
							<article
								key={challenge.title}
								className="rounded-xl border border-border/70 bg-card/60 p-4"
							>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<span className="text-sm font-bold text-primary">
											{t("challenge")} {index + 1}
										</span>
										<h3 className="text-lg font-semibold">{challenge.title}</h3>
									</div>
									{challenge.plain && (
										<p className="text-base font-medium leading-relaxed">
											<span className="sr-only">{t("plainLabel")}: </span>
											{challenge.plain}
										</p>
									)}
									<p className="text-base leading-relaxed text-muted-foreground">
										{challenge.description}
									</p>
								</div>

								{project.tech.solutions[index] && (
									<div className="mt-4 flex flex-col gap-2 border-l-2 border-primary/60 pl-4">
										<div className="flex items-center gap-2">
											<span className="text-sm font-bold text-primary">
												{t("solution")}
											</span>
											<h4 className="text-lg font-semibold">
												{project.tech.solutions[index].title}
											</h4>
										</div>
										<p className="text-base leading-relaxed">
											{project.tech.solutions[index].description}
										</p>
									</div>
								)}
							</article>
						))}
					</div>
				</section>
				)}

				{hasAchievements && (
				<section className="glass-panel rounded-2xl p-5 md:p-6">
					<h2 className="mb-6 text-2xl font-bold">{t("achievements")}</h2>
					<div className="flex flex-col gap-6">
						{metrics && metrics.length > 0 && (
							<div>
								<h3 className="mb-4 text-lg font-semibold text-muted-foreground">
									{t("metrics")}
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{metrics.map((metric) => (
										<div
											key={metric.label}
											className="rounded-lg border border-border bg-secondary p-4"
										>
											<div className="mb-1 text-sm text-muted-foreground">
												{metric.label}
											</div>
											<div className="text-2xl font-bold">{metric.value}</div>
										</div>
									))}
								</div>
							</div>
						)}

						{feedback && feedback.length > 0 && (
							<div>
								<h3 className="mb-4 text-lg font-semibold text-muted-foreground">
									{t("feedback")}
								</h3>
								<ul className="space-y-2">
									{feedback.map((item) => (
										<li
											key={item}
											className="text-base leading-relaxed flex items-start gap-2"
										>
											<span className="text-primary">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						)}

						{improvements && improvements.length > 0 && (
							<div>
								<h3 className="mb-4 text-lg font-semibold text-muted-foreground">
									{t("improvements")}
								</h3>
								<ul className="space-y-2">
									{improvements.map((item) => (
										<li
											key={item}
											className="text-base leading-relaxed flex items-start gap-2"
										>
											<span className="text-primary">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</section>
				)}

				{visibleGallery.length > 0 && (
					<section className="glass-panel rounded-2xl p-5 md:p-6">
						<h2 className="mb-6 text-2xl font-bold">{t("screenshots")}</h2>
						<ImageGallery images={visibleGallery} />
					</section>
				)}

				{project.tech.stack.length > 0 && (
					<section className="glass-panel rounded-2xl p-5 md:p-6">
						<h2 className="mb-4 text-lg font-semibold">{t("techStack")}</h2>
						<ul className="flex flex-wrap gap-2">
							{project.tech.stack.map((tech) => (
								<li
									key={tech}
									className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium"
								>
									{tech}
								</li>
							))}
						</ul>
					</section>
				)}

				<section className="pb-2 pt-1">
					<Link
						href="/project"
						className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
					>
						<span>←</span>
						<span>{t("backToProjects")}</span>
					</Link>
				</section>
			</div>
		</main>
	);
}
