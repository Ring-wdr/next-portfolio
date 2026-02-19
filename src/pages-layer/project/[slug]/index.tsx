"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import { Link } from "@/i18n/routing";
import type { ProjectDetail } from "@/shared/constant/project-detail";
import { ImageGallery } from "@/shared/ui/image-gallery";

type ProjectDetailPageProps = {
	project: ProjectDetail;
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
	const t = useTranslations("ProjectDetailPage");

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

					<div className="mt-5 grid gap-2 sm:grid-cols-3">
						<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
							<p className="text-xs text-muted-foreground">{t("period")}</p>
							<p className="mt-1 text-sm font-semibold">{project.period}</p>
						</div>
						<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
							<p className="text-xs text-muted-foreground">{t("team")}</p>
							<p className="mt-1 text-sm font-semibold">{project.team}</p>
						</div>
						<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
							<p className="text-xs text-muted-foreground">{t("role")}</p>
							<p className="mt-1 text-sm font-semibold">{project.role}</p>
						</div>
					</div>

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

				<section className="glass-panel rounded-2xl p-4 md:p-5">
					<ViewTransition
						name={`project-detail-image-${project.slug}`}
						default="vt-project-image"
						enter="vt-project-image"
						exit="vt-project-image"
						share="vt-project-image"
						update="vt-project-image"
					>
						<div className="relative aspect-video w-full overflow-hidden rounded-xl">
							<Image
								src={project.thumbnail}
								alt={project.title}
								fill
								className="object-cover"
								priority
							/>
						</div>
					</ViewTransition>
				</section>

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
						<div>
							<h3 className="mb-2 text-sm font-semibold text-primary">
								{t("goal")}
							</h3>
							<p className="text-base leading-relaxed">
								{project.overview.goal}
							</p>
						</div>
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
					</div>
				</section>

				<section className="glass-panel rounded-2xl p-5 md:p-6">
					<h2 className="mb-5 text-2xl font-bold">{t("techStack")}</h2>
					<div className="flex flex-wrap gap-3">
						{project.tech.stack.map((tech) => (
							<span
								key={tech}
								className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium"
							>
								{tech}
							</span>
						))}
					</div>
				</section>

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

				<section className="glass-panel rounded-2xl p-5 md:p-6">
					<h2 className="mb-6 text-2xl font-bold">{t("achievements")}</h2>
					<div className="flex flex-col gap-6">
						{project.achievements.metrics && (
							<div>
								<h3 className="mb-4 text-lg font-semibold text-muted-foreground">
									{t("metrics")}
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{project.achievements.metrics.map((metric) => (
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

						{project.achievements.feedback && (
							<div>
								<h3 className="mb-4 text-lg font-semibold text-muted-foreground">
									{t("feedback")}
								</h3>
								<ul className="space-y-2">
									{project.achievements.feedback.map((item) => (
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

						{project.achievements.improvements && (
							<div>
								<h3 className="mb-4 text-lg font-semibold text-muted-foreground">
									{t("improvements")}
								</h3>
								<ul className="space-y-2">
									{project.achievements.improvements.map((item) => (
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

				{project.gallery.length > 0 && (
					<section className="glass-panel rounded-2xl p-5 md:p-6">
						<h2 className="mb-6 text-2xl font-bold">{t("screenshots")}</h2>
						<ImageGallery images={project.gallery} />
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
