import { ArrowRight, FileCode2, FileText, FlaskConical, Layers3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { contactEmail, resumeHref } from "@/shared/constant/contact";
import { siteConfig } from "@/shared/constant/site";
import { TechStack } from "@/shared/constant/tech-stack";
import { getFeaturedProjects, type ProjectCard } from "@/shared/content/project";
import { CopyEmailButton } from "@/shared/ui/copy-email-button";
import { GithubIcon, LinkedinIcon } from "@/shared/ui/icon/brand";
import { HeroAsk } from "./hero-ask";
import { HeroCanvas } from "./hero-canvas";
import { SelectedWork } from "./selected-work";

export function MainPage({ projects }: { projects: ProjectCard[] }) {
	const t = useTranslations("HomePage");
	const contactT = useTranslations("ContactPage");
	const supportingProjects = getFeaturedProjects(projects, 4);
	const spotlightTech = TechStack.slice(0, 8);
	const summaryItems = [
		t("summary.years"),
		t("summary.domain"),
		t("summary.migration"),
	] as const;
	const principles = [
		{
			id: "01",
			icon: Layers3,
			title: t("pillars.architecture.title"),
			description: t("pillars.architecture.description"),
		},
		{
			id: "02",
			icon: FileCode2,
			title: t("pillars.apiContract.title"),
			description: t("pillars.apiContract.description"),
		},
		{
			id: "03",
			icon: FlaskConical,
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
				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
					<div className="space-y-5">
						<p className="home-kicker text-muted-foreground">
							{t("craftEyebrow")}
						</p>
						<h2 className="max-w-[16ch] break-keep text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
							{t("craftTitle")}
						</h2>
					</div>
					<p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
						{t("craftDescription")}
					</p>
				</div>

				<ol className="mt-12 grid gap-4 md:grid-cols-3">
					{principles.map(({ id, icon: Icon, title, description }) => (
						<li
							key={id}
							className="flex flex-col gap-8 rounded-[1.75rem] border border-border/70 bg-secondary/24 p-6 md:gap-12 md:p-7"
						>
							<div className="flex items-center justify-between">
								<span className="text-4xl font-semibold tracking-[-0.06em] text-foreground/24 md:text-5xl">
									{id}
								</span>
								<span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground/80">
									<Icon size={18} aria-hidden />
								</span>
							</div>
							<div className="space-y-2">
								<h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
									{title}
								</h3>
								<p className="break-keep text-sm leading-6 text-muted-foreground md:text-[0.9375rem] md:leading-7">
									{description}
								</p>
							</div>
						</li>
					))}
				</ol>

				<div className="mt-10 flex flex-col gap-4 border-t border-border/70 pt-8 md:flex-row md:items-baseline md:gap-10">
					<p className="home-kicker shrink-0 text-muted-foreground">
						{t("stackLabel")}
					</p>
					<ul className="flex flex-wrap gap-2">
						{spotlightTech.map((tech) => (
							<li
								key={tech.name}
								className="inline-flex h-9 items-center gap-2 rounded-full border border-border/70 px-3 text-sm text-foreground/86 [&_svg]:h-4 [&_svg]:w-4"
							>
								{tech.icon}
								{tech.name}
							</li>
						))}
						<li>
							<Link
								href="/tech-stack"
								className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							>
								{t("techStack")}
								<ArrowRight size={15} />
							</Link>
						</li>
					</ul>
				</div>
			</section>

			<section className="section-shell pb-12 pt-4 md:pb-16">
				<div className="home-cta-shell home-section-reveal grid gap-10 rounded-[2rem] border border-border/70 px-6 py-8 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
					<div className="space-y-4">
						<p className="home-kicker text-muted-foreground">
							{t("finalEyebrow")}
						</p>
						<h2 className="max-w-[20ch] break-keep text-3xl font-semibold leading-[1.15] tracking-[-0.04em] md:text-[2.75rem]">
							{t("finalTitle")}
						</h2>
						<p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
							{t("finalDescription")}
						</p>
					</div>

					{/* Direct channels, so reaching out doesn't need a second page */}
					<div className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-background/70 p-5 md:p-6">
						<div className="space-y-1">
							<p className="text-xs font-semibold text-muted-foreground">
								{contactT("emailLabel")}
							</p>
							<a
								href={`mailto:${contactEmail}`}
								className="block break-all text-xl font-semibold tracking-[-0.03em] underline-offset-4 hover:underline md:text-2xl"
							>
								{contactEmail}
							</a>
						</div>
						<div className="flex flex-wrap gap-2">
							<Link
								href="/contact"
								className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
							>
								{t("contactCta")}
								<ArrowRight size={15} />
							</Link>
							<CopyEmailButton email={contactEmail} />
						</div>
						<ul className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/70 pt-4 text-sm font-medium text-muted-foreground">
							<li>
								<a
									href={siteConfig.social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-foreground"
								>
									<LinkedinIcon width={16} height={16} aria-hidden />
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href={siteConfig.social.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-foreground"
								>
									<GithubIcon width={16} height={16} aria-hidden />
									GitHub
								</a>
							</li>
							{resumeHref && (
								<li>
									<a
										href={resumeHref}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-foreground"
									>
										<FileText size={16} aria-hidden />
										{contactT("resume")}
									</a>
								</li>
							)}
						</ul>
					</div>
				</div>
			</section>
		</main>
	);
}
