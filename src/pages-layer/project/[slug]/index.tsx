"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import { ProjectAsk } from "@/feature/chat/ui/project-ask";
import { Link } from "@/i18n/routing";
import { categoryBlockClassName, type Project } from "@/shared/content/project";
import { ImageGallery } from "@/shared/ui/image-gallery";
import { classNames } from "@/shared/utils/classnames";
import { isSvgSource } from "@/shared/utils/image";

type ProjectDetailPageProps = {
	project: Project;
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
	const t = useTranslations("ProjectDetailPage");
	const categoryT = useTranslations("ProjectsPage.categories");
	const block = categoryBlockClassName[project.card.category];
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
		<main className="flex flex-1 flex-col">
			{/* The opening band takes the project's category color */}
			<section className={block}>
				<div className="section-shell @container flex flex-col gap-6 pt-8 pb-10 md:pt-12 md:pb-14">
					<Link
						href="/project"
						className="inline-flex h-10 w-fit items-center gap-2 rounded-full border-2 border-current/30 px-4 text-sm font-bold transition-colors hover:border-current"
					>
						<span aria-hidden>←</span>
						<span>{t("backToProjects")}</span>
					</Link>
					<p className="kicker">
						{categoryT(project.card.category)} · {project.period}
					</p>
					<ViewTransition
						name={`project-detail-title-${project.slug}`}
						default="vt-project-title"
						enter="vt-project-title"
						exit="vt-project-title"
						share="vt-project-title"
						update="vt-project-title"
					>
						<h1 className="type-display text-[clamp(2rem,9cqi,5.5rem)]">
							{project.title}
						</h1>
					</ViewTransition>
					<p className="max-w-3xl text-lg leading-snug font-bold tracking-[-0.02em] md:text-2xl">
						{project.summary}
					</p>

					<dl className="flex flex-wrap overflow-hidden rounded-[1.25rem] border-2 border-current/20">
						{facts.map((fact) => (
							<div key={fact.label} className="flex min-w-[9rem] flex-1 flex-col gap-1 p-4">
								<dt className="text-xs font-bold opacity-70">{fact.label}</dt>
								<dd className="text-sm font-bold">{fact.value}</dd>
							</div>
						))}
					</dl>

					{(project.links.github || project.links.demo || project.links.etc?.length) && (
						<div className="flex flex-wrap gap-2">
							{project.links.demo && (
								<a
									href={project.links.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
								>
									{t("liveDemo")}
								</a>
							)}
							{project.links.github && (
								<a
									href={project.links.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-11 items-center rounded-full border-2 border-current/40 px-5 text-sm font-bold transition-colors hover:border-current"
								>
									{t("github")}
								</a>
							)}
							{project.links.etc?.map((link) => (
								<a
									key={link.url}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-11 items-center rounded-full border-2 border-current/40 px-5 text-sm font-bold transition-colors hover:border-current"
								>
									{link.label}
								</a>
							))}
						</div>
					)}
				</div>
			</section>

			<div className="section-shell flex w-full flex-col gap-14 pt-3 pb-14 md:gap-20 md:pb-20">
				<figure className="flex flex-col gap-3 rounded-[2rem] bg-card p-3">
					<ViewTransition
						name={`project-detail-image-${project.slug}`}
						default="vt-project-image"
						enter="vt-project-image"
						exit="vt-project-image"
						share="vt-project-image"
						update="vt-project-image"
					>
						<div className="relative aspect-16/10 w-full overflow-hidden rounded-[1.5rem]">
							<Image
								src={project.thumbnail}
								alt={heroDiagram?.alt ?? project.title}
								fill
								sizes="(min-width: 1152px) 1128px, 100vw"
								className={thumbnailIsSvg ? "bg-white object-contain" : "object-cover object-top"}
								unoptimized={thumbnailIsSvg}
								priority
							/>
						</div>
					</ViewTransition>
					{heroDiagram?.caption && (
						<figcaption className="px-3 pb-2 text-sm leading-relaxed text-muted-foreground">
							{heroDiagram.caption}
						</figcaption>
					)}
				</figure>

				{briefRows.length > 0 && (
					<section aria-labelledby="project-brief-title" data-testid="project-brief">
						<h2 id="project-brief-title" className="sr-only">
							{t("brief.title")}
						</h2>
						<dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
							{briefRows.map((row) => (
								<div key={row.key} className="flex flex-col gap-3 rounded-[1.75rem] bg-card p-6">
									<dt className="kicker text-primary">{row.label}</dt>
									<dd className="text-base leading-7 font-medium">{row.value}</dd>
								</div>
							))}
						</dl>
					</section>
				)}

				<ProjectAsk
					slug={project.slug}
					title={project.shortTitle ?? project.title}
				/>

				<DetailSection title={t("overview")}>
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-2">
							<h3 className="kicker text-primary">{t("background")}</h3>
							<p className="text-base leading-7">{project.overview.background}</p>
						</div>
						{project.overview.goal && (
							<div className="flex flex-col gap-2">
								<h3 className="kicker text-primary">{t("goal")}</h3>
								<p className="text-base leading-7">{project.overview.goal}</p>
							</div>
						)}
						{project.overview.features.length > 0 && (
							<div className="flex flex-col gap-3">
								<h3 className="kicker text-primary">{t("features")}</h3>
								<ul className="flex flex-col gap-2">
									{project.overview.features.map((feature) => (
										<li key={feature} className="flex gap-3 text-base leading-7">
											<span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-tangerine" />
											{feature}
										</li>
									))}
								</ul>
							</div>
						)}
						{project.diagram && !heroDiagram && (
							<figure className="flex flex-col gap-3">
								<h3 className="kicker text-primary">{t("diagram")}</h3>
								<Image
									src={project.diagram.src}
									alt={project.diagram.alt}
									width={1600}
									height={1000}
									sizes="(min-width: 1024px) 720px, 100vw"
									className="h-auto w-full rounded-[1.25rem] bg-white"
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
				</DetailSection>

				{project.narrative?.map((section) => (
					<DetailSection key={section.title} title={section.title}>
						<p className="text-base leading-7">{section.description}</p>
					</DetailSection>
				))}

				{project.tech.challenges.length > 0 && (
					<DetailSection title={t("challengesAndSolutions")}>
						<ol className="flex flex-col gap-3">
							{project.tech.challenges.map((challenge, index) => (
								<li key={challenge.title} className="flex flex-col gap-4 rounded-[1.75rem] bg-card p-5 md:p-6">
									<div className="flex flex-col gap-2">
										<div className="flex flex-wrap items-center gap-3">
											<span className="flex h-8 shrink-0 items-center rounded-full bg-tangerine px-3 text-xs font-bold whitespace-nowrap text-on-block">
												{t("challenge")} {index + 1}
											</span>
											<h3 className="text-xl type-heading">{challenge.title}</h3>
										</div>
										{challenge.plain && (
											<p className="text-base leading-7 font-bold">
												<span className="sr-only">{t("plainLabel")}: </span>
												{challenge.plain}
											</p>
										)}
										<p className="text-base leading-7 text-muted-foreground">
											{challenge.description}
										</p>
									</div>

									{project.tech.solutions[index] && (
										<div className="flex flex-col gap-2 rounded-[1.25rem] bg-background p-4 md:p-5">
											<div className="flex flex-wrap items-center gap-3">
												<span className="flex h-8 shrink-0 items-center rounded-full bg-cobalt px-3 text-xs font-bold whitespace-nowrap text-on-cobalt">
													{t("solution")}
												</span>
												<h4 className="text-lg type-heading">
													{project.tech.solutions[index].title}
												</h4>
											</div>
											<p className="text-base leading-7">
												{project.tech.solutions[index].description}
											</p>
										</div>
									)}
								</li>
							))}
						</ol>
					</DetailSection>
				)}

				{hasAchievements && (
					<DetailSection title={t("achievements")}>
						<div className="flex flex-col gap-8">
							{metrics && metrics.length > 0 && (
								<div className="flex flex-col gap-3">
									<h3 className="kicker text-primary">{t("metrics")}</h3>
									<ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
										{metrics.map((metric, index) => (
											<li
												key={metric.label}
												className={classNames(
													"flex flex-col justify-between gap-6 rounded-[1.5rem] p-5 text-on-block",
													["bg-butter", "bg-mint", "bg-tangerine"][index % 3],
												)}
											>
												<span className="text-sm font-bold">{metric.label}</span>
												<span className="text-3xl type-heading">{metric.value}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							{feedback && feedback.length > 0 && (
								<BulletList title={t("feedback")} items={feedback} />
							)}

							{improvements && improvements.length > 0 && (
								<BulletList title={t("improvements")} items={improvements} />
							)}
						</div>
					</DetailSection>
				)}

				{visibleGallery.length > 0 && (
					<section className="flex flex-col gap-6">
						<h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] type-heading">{t("screenshots")}</h2>
						<ImageGallery images={visibleGallery} />
					</section>
				)}

				{project.tech.stack.length > 0 && (
					<DetailSection title={t("techStack")}>
						<ul className="flex flex-wrap gap-2">
							{project.tech.stack.map((tech) => (
								<li key={tech} className="rounded-full bg-card px-4 py-2 text-sm font-bold">
									{tech}
								</li>
							))}
						</ul>
					</DetailSection>
				)}

				<Link
					href="/project"
					className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
				>
					<span aria-hidden>←</span>
					<span>{t("backToProjects")}</span>
				</Link>
			</div>
		</main>
	);
}

/** Title in a narrow left column, content in the wide right one; stacks on phones. */
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="grid grid-cols-1 gap-6 border-t-2 border-foreground pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
			<h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] type-heading">{title}</h2>
			<div className="min-w-0">{children}</div>
		</section>
	);
}

function BulletList({ title, items }: { title: string; items: string[] }) {
	return (
		<div className="flex flex-col gap-3">
			<h3 className="kicker text-primary">{title}</h3>
			<ul className="flex flex-col gap-2">
				{items.map((item) => (
					<li key={item} className="flex gap-3 text-base leading-7">
						<span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-tangerine" />
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
