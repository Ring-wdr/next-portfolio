import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TechStack } from "@/shared/constant/tech-stack";
import { getFeaturedProjects, type ProjectCard } from "@/shared/content/project";
import { HeroAsk } from "./hero-ask";
import { HeroCanvas } from "./hero-canvas";
import { SelectedWork } from "./selected-work";

export function MainPage({ projects }: { projects: ProjectCard[] }) {
	const t = useTranslations("HomePage");
	const supportingProjects = getFeaturedProjects(projects, 4);
	const spotlightTech = TechStack.slice(0, 8).map((tech) => tech.name);
	const summaryItems = [
		t("summary.years"),
		t("summary.domain"),
		t("summary.migration"),
	] as const;
	const principles = [
		{
			id: "01",
			title: t("pillars.architecture.title"),
			description: t("pillars.architecture.description"),
		},
		{
			id: "02",
			title: t("pillars.apiContract.title"),
			description: t("pillars.apiContract.description"),
		},
		{
			id: "03",
			title: t("pillars.testing.title"),
			description: t("pillars.testing.description"),
		},
	] as const;

	return (
		<main className="flex flex-1 flex-col">
			<section
				className="relative isolate overflow-hidden md:min-h-[calc(100svh-4.5rem)]"
				data-testid="home-hero"
			>
				<div className="absolute inset-0 -z-20 bg-hero-bg" />
				{/* Kept to the right of the copy on desktop; a faint backdrop behind it on mobile */}
				<HeroCanvas className="absolute inset-y-0 right-0 -z-10 w-full opacity-35 lg:w-[36%] lg:opacity-100" />
				<div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--hero-bg),transparent_8%)_0%,color-mix(in_oklch,var(--hero-bg),transparent_40%)_55%,transparent_100%)] lg:hidden" />
				<div className="section-shell relative z-10 flex items-end md:min-h-[calc(100svh-4.5rem)] pt-16 pb-12 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16">
					<div className="home-hero-copy flex w-full min-w-0 max-w-[46rem] flex-col gap-6 text-hero-fg md:gap-7">
						<p className="home-kicker text-hero-fg/72">{t("eyebrow")}</p>
						<h1 className="max-w-[12ch] text-[clamp(3.2rem,7vw,5.6rem)] font-bold leading-[0.9] tracking-[-0.06em] text-hero-fg">
							<span className="block">Manjoong Kim</span>
							<span className="mt-4 block max-w-[34ch] break-keep text-[clamp(1.25rem,2.4vw,1.625rem)] font-medium leading-snug tracking-[-0.03em] text-hero-fg/88">
								{t("greeting")}
							</span>
						</h1>
						<p className="max-w-2xl text-sm leading-6 text-hero-fg/78 md:text-base md:leading-7">
							{t("description")}
						</p>
						<div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
							<Link
								href="/project"
								className="inline-flex h-11 items-center gap-1.5 rounded-full bg-hero-fg px-5 text-hero-bg transition-transform duration-300 hover:-translate-y-0.5"
							>
								{t("viewProjects")}
								<ArrowRight size={15} />
							</Link>
							<Link
								href="/fit"
								className="inline-flex h-11 items-center gap-1.5 rounded-full border border-hero-fg/24 px-5 text-hero-fg transition-colors hover:bg-hero-fg/8"
							>
								{t("fitCta")}
							</Link>
							<Link
								href="/about"
								className="hidden h-11 items-center px-2 text-hero-fg/72 sm:inline-flex underline-offset-4 transition-colors hover:text-hero-fg hover:underline"
							>
								{t("aboutCta")}
							</Link>
						</div>
						<HeroAsk />
						<ul
							aria-label={t("summaryLabel")}
							className="flex flex-col gap-1 border-t border-hero-fg/18 pt-5 text-sm font-semibold text-hero-fg sm:flex-row sm:flex-wrap sm:gap-x-3 md:text-base"
							data-testid="home-summary"
						>
							{summaryItems.map((item, index) => (
								<li key={item} className="flex items-center gap-3">
									{index > 0 && (
										<span aria-hidden className="hidden text-hero-fg/50 sm:inline">
											·
										</span>
									)}
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section
				className="section-shell home-section-shell home-section-reveal"
				data-testid="home-selected-work"
			>
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl space-y-4">
						<p className="home-kicker text-muted-foreground">
							{t("selectedWorkEyebrow")}
						</p>
						<h2 className="max-w-[12ch] text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
							{t("featuredProjects")}
						</h2>
						<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
							{t("selectedWorkDescription")}
						</p>
					</div>
					<Link
						href="/project"
						className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						{t("viewAll")}
						<ArrowRight size={16} />
					</Link>
				</div>

				<SelectedWork projects={supportingProjects} />
			</section>

			<section className="section-shell home-section-shell home-section-reveal">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<div className="lg:sticky lg:top-24 lg:self-start">
						<p className="home-kicker text-muted-foreground">
							{t("craftEyebrow")}
						</p>
						<h2 className="mt-5 max-w-[16ch] text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
							{t("craftTitle")}
						</h2>
					</div>

					<div className="space-y-10">
						<div className="space-y-4 border-t border-border/70 pt-8">
							<p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
								{t("craftDescription")}
							</p>
						</div>

						<div className="space-y-6">
							{principles.map((principle) => (
								<article
									key={principle.id}
									className="grid gap-4 border-t border-border/70 pt-6 md:grid-cols-[4rem_minmax(0,1fr)]"
								>
									<p className="home-kicker text-muted-foreground/70">
										{principle.id}
									</p>
									<div className="space-y-2">
										<h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
											{principle.title}
										</h3>
										<p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
											{principle.description}
										</p>
									</div>
								</article>
							))}
						</div>

						<div className="border-t border-border/70 pt-8">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<p className="home-kicker text-muted-foreground">
									{t("stackLabel")}
								</p>
								<Link
									href="/tech-stack"
									className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
								>
									{t("techStack")}
									<ArrowRight size={16} />
								</Link>
							</div>
							<p className="mt-5 max-w-3xl text-base leading-8 tracking-[-0.02em] text-foreground/86 md:text-lg">
								{spotlightTech.join(" · ")}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="section-shell pb-12 pt-4 md:pb-16">
				<div className="home-cta-shell home-section-reveal flex flex-col gap-8 rounded-[2rem] border border-border/70 px-6 py-8 md:px-10 md:py-10 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl space-y-4">
						<p className="home-kicker text-muted-foreground">
							{t("finalEyebrow")}
						</p>
						<h2 className="max-w-[16ch] text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
							{t("finalTitle")}
						</h2>
						<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
							{t("finalDescription")}
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link
							href="/project"
							className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
						>
							{t("viewProjects")}
						</Link>
						<Link
							href="/contact"
							className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
						>
							{t("contactCta")}
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
