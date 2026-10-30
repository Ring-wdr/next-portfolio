import {
	ArrowRight,
	ArrowUpRight,
	FileCode2,
	FileText,
	FlaskConical,
	Layers3,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { contactEmail, resumeHref } from "@/shared/constant/contact";
import { siteConfig } from "@/shared/constant/site";
import { TechStack } from "@/shared/constant/tech-stack";
import { getFeaturedProjects, type ProjectCard } from "@/shared/content/project";
import { CopyEmailButton } from "@/shared/ui/copy-email-button";
import { GithubIcon, LinkedinIcon } from "@/shared/ui/icon/brand";
import { HeroAsk } from "./hero-ask";
import { OpenChatButton } from "./open-chat-button";
import { SelectedWork } from "./selected-work";

export function MainPage({ projects }: { projects: ProjectCard[] }) {
	const t = useTranslations("HomePage");
	const contactT = useTranslations("ContactPage");
	const featuredProjects = getFeaturedProjects(projects, 4);
	const spotlightTech = TechStack.slice(0, 8);
	// One block color per career fact, in the same order the tiles use below
	const summaryItems = [
		{ text: t("summary.years"), color: "bg-butter" },
		{ text: t("summary.domain"), color: "bg-mint" },
		{ text: t("summary.migration"), color: "bg-tangerine" },
	] as const;
	const principles = [
		{
			icon: Layers3,
			color: "bg-cobalt text-on-cobalt",
			title: t("pillars.architecture.title"),
			description: t("pillars.architecture.description"),
		},
		{
			icon: FileCode2,
			color: "bg-tangerine text-on-block",
			title: t("pillars.apiContract.title"),
			description: t("pillars.apiContract.description"),
		},
		{
			icon: FlaskConical,
			color: "bg-mint text-on-block",
			title: t("pillars.testing.title"),
			description: t("pillars.testing.description"),
		},
	] as const;

	return (
		<main className="flex flex-1 flex-col">
			<section className="bg-hero-bg text-hero-fg" data-testid="home-hero">
				<div className="section-shell flex flex-col gap-10 pt-10 pb-12 md:gap-14 md:pt-16 md:pb-16">
					<div className="rise @container flex flex-col gap-5">
						<p className="kicker w-fit rounded-full border-2 border-on-cobalt/36 px-3.5 py-1.5">
							{t("eyebrow")}
						</p>
						<h1 className="type-display display-fit-xl">
							<span className="block">Manjoong</span>{" "}
							<span className="block">Kim</span>
						</h1>
					</div>
					<div className="rise grid grid-cols-1 gap-10 [animation-delay:120ms] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
						<div className="flex flex-col gap-5">
							<p className="max-w-[30ch] font-heading text-[clamp(1.25rem,2.3vw,1.75rem)] leading-snug font-extrabold tracking-[-0.03em] break-keep">
								{t("greeting")}
							</p>
							<p className="max-w-xl text-sm leading-6 text-on-cobalt/80 md:text-base md:leading-7">
								{t("description")}
							</p>
							<div className="flex flex-wrap gap-2.5 pt-1">
								<Link
									href="/project"
									className="inline-flex h-12 items-center gap-2 rounded-full bg-on-cobalt px-6 text-sm font-bold text-cobalt transition-transform hover:-translate-y-0.5"
								>
									{t("viewProjects")}
									<ArrowRight size={16} aria-hidden />
								</Link>
								<Link
									href="/fit"
									className="inline-flex h-12 items-center rounded-full border-2 border-on-cobalt/50 px-6 text-sm font-bold transition-colors hover:border-on-cobalt hover:bg-on-cobalt hover:text-cobalt"
								>
									{t("fitCta")}
								</Link>
							</div>
						</div>
						<HeroAsk />
					</div>
				</div>
			</section>

			<section className="section-shell pt-3" aria-label={t("summaryLabel")}>
				<ul className="grid gap-3 sm:grid-cols-3" data-testid="home-summary">
					{summaryItems.map((item) => (
						<li
							key={item.text}
							className={`${item.color} flex min-h-20 items-end rounded-[1.75rem] p-5 sm:min-h-28 font-heading text-xl leading-tight font-extrabold tracking-[-0.03em] text-on-block break-keep md:min-h-36 md:text-2xl`}
						>
							{item.text}
						</li>
					))}
				</ul>
			</section>

			<section className="section-shell section-pad" data-testid="home-selected-work">
				<div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
					<div className="flex max-w-2xl flex-col gap-4">
						<p className="kicker text-primary">{t("selectedWorkEyebrow")}</p>
						<h2 className="type-display text-[clamp(2.25rem,6vw,4.5rem)]">{t("featuredProjects")}</h2>
						<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
							{t("selectedWorkDescription")}
						</p>
					</div>
					<Link
						href="/project"
						className="inline-flex h-11 w-fit items-center gap-2 rounded-full border-2 border-foreground px-5 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
					>
						{t("viewAll")}
						<ArrowRight size={16} aria-hidden />
					</Link>
				</div>
				<SelectedWork projects={featuredProjects} />
			</section>

			<section className="bg-card">
				<div className="section-shell section-pad">
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
						<div className="flex flex-col gap-4">
							<p className="kicker text-primary">{t("craftEyebrow")}</p>
							<h2 className="max-w-[18ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] break-keep type-heading">
								{t("craftTitle")}
							</h2>
						</div>
						<p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
							{t("craftDescription")}
						</p>
					</div>

					<ul className="mt-10 grid gap-3 md:grid-cols-3">
						{principles.map(({ icon: Icon, color, title, description }) => (
							<li key={title} className="flex flex-col gap-10 rounded-[1.75rem] bg-background p-6 md:p-7">
								<span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
									<Icon size={24} aria-hidden />
								</span>
								<div className="flex flex-col gap-2">
									<h3 className="text-2xl type-heading">{title}</h3>
									<p className="text-sm leading-6 text-muted-foreground break-keep md:text-[0.9375rem] md:leading-7">
										{description}
									</p>
								</div>
							</li>
						))}
					</ul>

					<div className="mt-10 flex flex-col gap-4 md:flex-row md:items-baseline md:gap-10">
						<p className="kicker shrink-0 text-muted-foreground">{t("stackLabel")}</p>
						<ul className="flex flex-wrap gap-2">
							{spotlightTech.map((tech) => (
								<li
									key={tech.name}
									className="inline-flex h-10 items-center gap-2 rounded-full bg-background px-4 text-sm font-bold [&_svg]:h-4 [&_svg]:w-4"
								>
									{tech.icon}
									{tech.name}
								</li>
							))}
							<li>
								<Link
									href="/tech-stack"
									className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-primary hover:underline"
								>
									{t("techStack")}
									<ArrowRight size={15} aria-hidden />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="section-shell section-pad">
				<div className="flex flex-col gap-4">
					<p className="kicker text-primary">{t("tools.eyebrow")}</p>
					<h2 className="max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] break-keep type-heading">
						{t("tools.title")}
					</h2>
				</div>
				<div className="mt-10 grid gap-3 md:grid-cols-2">
					<div className="@container flex min-w-0 flex-col gap-6 rounded-[2rem] bg-tangerine p-7 text-on-block md:p-9">
						<h3 className="type-display text-[clamp(1.5rem,8cqi,2.75rem)]">{t("tools.fitTitle")}</h3>
						<p className="max-w-md text-sm leading-6 font-medium md:text-base md:leading-7">
							{t("tools.fitDescription")}
						</p>
						<Link
							href="/fit"
							className="mt-auto inline-flex h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
						>
							{t("tools.fitCta")}
							<ArrowRight size={16} aria-hidden />
						</Link>
					</div>
					<div className="@container flex min-w-0 flex-col gap-6 rounded-[2rem] bg-mint p-7 text-on-block md:p-9">
						<h3 className="type-display text-[clamp(1.5rem,8cqi,2.75rem)]">{t("tools.askTitle")}</h3>
						<p className="max-w-md text-sm leading-6 font-medium md:text-base md:leading-7">
							{t("tools.askDescription")}
						</p>
						<div className="mt-auto">
							<OpenChatButton label={t("tools.askCta")} />
						</div>
					</div>
				</div>
			</section>

			<section className="section-shell pb-14 md:pb-20">
				<div className="grid grid-cols-1 gap-8 rounded-[2rem] bg-cobalt p-7 text-on-cobalt md:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
					<div className="flex flex-col gap-5">
						<p className="kicker text-on-cobalt/80">{t("finalEyebrow")}</p>
						<h2 className="max-w-[20ch] text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] break-keep type-heading">
							{t("finalTitle")}
						</h2>
						<p className="max-w-xl text-sm leading-6 text-on-cobalt/80 md:text-base md:leading-7">
							{t("finalDescription")}
						</p>
					</div>

					{/* Direct channels, so reaching out doesn't need a second page */}
					<div className="flex flex-col gap-5 rounded-[1.5rem] bg-paper p-5 text-on-block md:p-6">
						<div className="flex flex-col gap-1">
							<p className="text-xs font-bold text-on-block/60">{contactT("emailLabel")}</p>
							<a
								href={`mailto:${contactEmail}`}
								className="text-xl font-extrabold tracking-[-0.03em] break-all underline-offset-4 hover:underline md:text-2xl"
							>
								{contactEmail}
							</a>
						</div>
						<div className="flex flex-wrap gap-2">
							<Link
								href="/contact"
								className="inline-flex h-11 items-center gap-1.5 rounded-full bg-cobalt px-5 text-sm font-bold text-on-cobalt transition-transform hover:-translate-y-0.5"
							>
								{t("contactCta")}
								<ArrowRight size={15} aria-hidden />
							</Link>
							<CopyEmailButton email={contactEmail} />
						</div>
						<ul className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-on-block/12 pt-3 text-sm font-bold">
							<li>
								<a
									href={siteConfig.social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-11 items-center gap-2 hover:underline"
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
									className="inline-flex min-h-11 items-center gap-2 hover:underline"
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
										className="inline-flex min-h-11 items-center gap-2 hover:underline"
									>
										<FileText size={16} aria-hidden />
										{contactT("resume")}
										<ArrowUpRight size={14} aria-hidden />
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
