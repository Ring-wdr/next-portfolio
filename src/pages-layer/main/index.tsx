import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getFeaturedProjects, projectList } from "@/shared/constant/project";
import { TechStack } from "@/shared/constant/tech-stack";
import { PretextStatement } from "@/shared/ui/pretext-statement";

export function MainPage() {
	const locale = useLocale();
	const t = useTranslations("HomePage");
	const categoryT = useTranslations("ProjectsPage.categories");
	const featuredProjects = getFeaturedProjects(4);
	const mainProject = featuredProjects[0];
	const supportingProjects = featuredProjects.slice(1);
	const spotlightTech = TechStack.slice(0, 8).map((tech) => tech.name);
	const proofItems = [
		{
			label: t("stats.projects"),
			value: `${projectList.length}+`,
		},
		{
			label: t("stats.tech"),
			value: `${TechStack.length}+`,
		},
		{
			label: t("stats.currentFocus"),
			value: t("stats.currentFocusValue"),
		},
	] as const;
	const principles = [
		{
			id: "01",
			title: t("pillars.productThinking.title"),
			description: t("pillars.productThinking.description"),
		},
		{
			id: "02",
			title: t("pillars.modernFrontend.title"),
			description: t("pillars.modernFrontend.description"),
		},
		{
			id: "03",
			title: t("pillars.deliveryFocus.title"),
			description: t("pillars.deliveryFocus.description"),
		},
	] as const;

	if (!mainProject) {
		return null;
	}

	return (
		<main className="flex flex-1 flex-col">
			<section
				className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden"
				data-testid="home-hero"
			>
				<Image
					src={mainProject.src}
					alt={mainProject.title}
					fill
					priority
					sizes="100vw"
					className="scale-[1.02] object-cover"
				/>
				<div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(8,10,14,0.88)_10%,rgba(8,10,14,0.52)_45%,rgba(8,10,14,0.22)_70%,rgba(8,10,14,0.72)_100%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(116,222,206,0.26),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(96,117,255,0.18),transparent_25%)]" />
				<div className="section-shell relative z-10 flex min-h-[calc(100svh-4.5rem)] items-end pt-24 pb-14 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20">
					<div className="home-hero-copy flex max-w-[42rem] flex-col gap-7 text-white md:gap-8">
						<p className="home-kicker text-white/72">{t("eyebrow")}</p>
						<h1 className="max-w-[12ch] text-[clamp(3.7rem,9vw,7.2rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white">
							<span className="block">Manjoong Kim</span>
							<span className="mt-4 block max-w-[12ch] text-[clamp(1.3rem,3vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-white/88">
								{t("greeting")}
							</span>
						</h1>
						<p className="max-w-2xl text-sm leading-6 text-white/78 md:text-base md:leading-7">
							{t("description")}
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Link
								href="/project"
								className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
							>
								{t("viewProjects")}
							</Link>
							<Link
								href="/about"
								className="inline-flex h-11 items-center justify-center rounded-full border border-white/24 bg-white/8 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/14"
							>
								{t("aboutCta")}
							</Link>
						</div>
						<dl className="grid gap-5 border-t border-white/18 pt-6 text-white sm:grid-cols-3">
							{proofItems.map((item) => (
								<div key={item.label} className="space-y-1">
									<dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/58">
										{item.label}
									</dt>
									<dd className="text-lg font-semibold tracking-[-0.03em] text-white md:text-xl">
										{item.value}
									</dd>
								</div>
							))}
						</dl>
						<div className="flex flex-wrap items-center gap-3 border-t border-white/18 pt-5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/68">
							<span>{t("featuredLabel")}</span>
							<span className="hidden h-px min-w-12 flex-1 bg-white/15 sm:block" />
							<span className="text-white/84">{mainProject.title}</span>
							<span className="text-white/52">
								{mainProject.techStack.slice(0, 3).join(" · ")}
							</span>
						</div>
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
						className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						{t("viewAll")}
						<ArrowRight size={16} />
					</Link>
				</div>

				<div className="mt-12 border-t border-border/70">
					{supportingProjects.map((project) => (
						<article
							key={project.slug}
							className="group border-b border-border/65 py-6 md:py-8"
						>
							<Link
								href={`/project/${project.slug}`}
								className="grid gap-6 md:grid-cols-[minmax(0,1fr)_17rem] md:items-center"
							>
								<div className="space-y-3">
									<p className="home-kicker text-muted-foreground/72">
										{categoryT(project.category)} · {project.year}
									</p>
									<div className="flex items-start justify-between gap-4">
										<h3 className="max-w-[15ch] text-2xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-foreground/82 md:text-4xl">
											{project.title}
										</h3>
										<span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-foreground">
											<ArrowUpRight size={18} />
										</span>
									</div>
									<p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
										{project.techStack.slice(0, 4).join(" · ")}
									</p>
								</div>
								<div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-secondary/40">
									<Image
										src={project.src}
										alt={project.title}
										fill
										sizes="(max-width: 768px) 100vw, 272px"
										className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
									/>
									<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0)_30%,rgba(12,14,18,0.24)_100%)]" />
								</div>
							</Link>
						</article>
					))}
				</div>
			</section>

			<section className="section-shell home-section-shell home-section-reveal">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<div className="lg:sticky lg:top-24 lg:self-start">
						<p className="home-kicker text-muted-foreground">
							{t("craftEyebrow")}
						</p>
						<PretextStatement
							locale={locale}
							text={t("craftStatement")}
							className="mt-5 max-w-[19ch]"
						/>
					</div>

					<div className="space-y-10">
						<div className="space-y-4 border-t border-border/70 pt-8">
							<h2 className="max-w-[12ch] text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
								{t("craftTitle")}
							</h2>
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
									className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
