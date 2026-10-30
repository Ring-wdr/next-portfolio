import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
	Career,
	CoreStrengthKeys,
	FocusAreas,
	WorkingPrinciples,
} from "@/shared/constant/profile";
import { TechStack } from "@/shared/constant/tech-stack";

// Principles are parallel, not a sequence, so each gets a block color instead of a number
const principleColors = ["bg-cobalt text-on-cobalt", "bg-tangerine text-on-block", "bg-mint text-on-block"] as const;

export function AboutPage({ projectCount }: { projectCount: number }) {
	const t = useTranslations("AboutPage");
	const stats = [
		{
			label: t("stats.years"),
			value: t("stats.yearsValue"),
		},
		{
			label: t("stats.projects"),
			value: `${projectCount}`,
		},
		{
			label: t("stats.technologies"),
			value: `${TechStack.length}`,
		},
	] as const;
	const focusLabels = FocusAreas.map((focus) => t(focus.labelKey));

	return (
		<main className="flex flex-1 flex-col">
			<section className="bg-hero-bg text-hero-fg" data-testid="about-hero">
				<div className="section-shell grid grid-cols-1 gap-8 pt-10 pb-12 md:pt-14 md:pb-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end lg:gap-12">
					<div className="flex flex-col gap-6">
						<p className="kicker w-fit rounded-full border-2 border-on-cobalt/36 px-3.5 py-1.5">
							{t("heroEyebrow")}
						</p>
						<h1 className="type-display text-[clamp(3rem,10vw,7.5rem)]">{t("name")}</h1>
						<p className="font-heading text-lg font-extrabold tracking-[-0.02em] md:text-2xl">{t("role")}</p>
						<p className="max-w-3xl text-base leading-7 text-on-cobalt/84 md:text-lg md:leading-8">
							{t("intro")}
						</p>
					</div>

					<div className="relative aspect-square w-36 overflow-hidden rounded-[2rem] bg-tangerine p-2 sm:w-44 lg:w-full">
						<div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
							<Image
								src="https://avatars.githubusercontent.com/u/70439662?v=4"
								alt={t("portraitAlt")}
								className="object-cover"
								fill
								sizes="(max-width: 1024px) 176px, 272px"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="section-shell pt-3">
				<dl className="grid grid-cols-3 gap-3">
					{stats.map((item, index) => (
						<div
							key={item.label}
							className={`${["bg-butter", "bg-mint", "bg-tangerine"][index]} flex flex-col justify-between gap-6 rounded-[1.75rem] p-4 text-on-block md:p-6`}
						>
							<dt className="text-xs font-bold md:text-sm">{item.label}</dt>
							<dd className="type-display text-3xl tabular-nums md:text-5xl">{item.value}</dd>
						</div>
					))}
				</dl>
			</section>

			<section className="section-shell section-pad" data-testid="about-career">
				<div className="flex flex-col gap-4">
					<p className="kicker text-primary">{t("careerEyebrow")}</p>
					<h2 className="type-display text-[clamp(2.25rem,6vw,4.5rem)]">{t("careerTitle")}</h2>
				</div>

				<ol className="mt-10 flex flex-col gap-3">
					{Career.map((job) => {
						const highlights = t.raw(`career.${job.id}.highlights`) as string[];
						const summary = t.has(`career.${job.id}.summary`)
							? t(`career.${job.id}.summary`)
							: null;

						return (
							<li
								key={job.id}
								className="grid grid-cols-1 gap-4 rounded-[1.75rem] bg-card p-6 md:grid-cols-[13rem_minmax(0,1fr)] md:p-8"
							>
								<p className="h-fit w-fit rounded-full bg-butter px-3 py-1.5 text-xs font-bold tabular-nums text-on-block">
									{job.period}
								</p>
								<article className="flex flex-col gap-3">
									<h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xl type-heading">
										{t(`career.${job.id}.company`)}
										<span className="text-base font-bold tracking-normal text-muted-foreground">
											{t(`career.${job.id}.role`)}
										</span>
									</h3>
									{summary && (
										<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">{summary}</p>
									)}
									<ul className="flex flex-col gap-2">
										{highlights.map((item) => (
											<li key={item} className="flex gap-3 text-sm leading-6 md:text-base md:leading-7">
												<span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-tangerine" />
												{item}
											</li>
										))}
									</ul>
									{"projectSlug" in job && (
										<Link
											href={`/project/${job.projectSlug}`}
											className="mt-1 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-foreground px-5 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
										>
											{t("careerCaseStudy")}
											<ArrowRight size={15} aria-hidden />
										</Link>
									)}
								</article>
							</li>
						);
					})}
				</ol>
			</section>

			<section className="section-shell grid grid-cols-1 gap-3 md:grid-cols-2">
				<div className="flex flex-col gap-5 rounded-[2rem] bg-mint p-6 text-on-block md:p-8">
					<h2 className="kicker">{t("strengthsTitle")}</h2>
					<ul className="flex flex-wrap gap-2">
						{CoreStrengthKeys.map((strength) => (
							<li key={strength} className="rounded-full bg-paper px-4 py-2 text-sm font-bold">
								{t(strength)}
							</li>
						))}
					</ul>
				</div>

				<div className="flex flex-col gap-5 rounded-[2rem] bg-butter p-6 text-on-block md:p-8" data-testid="about-focus">
					<h2 className="kicker">{t("focusTitle")}</h2>
					<ul className="flex flex-wrap gap-2">
						{focusLabels.map((label) => (
							<li key={label} className="rounded-full bg-paper px-4 py-2 text-sm font-bold">
								{label}
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="section-shell section-pad">
				<div className="flex max-w-2xl flex-col gap-4">
					<p className="kicker text-primary">{t("principlesEyebrow")}</p>
					<h2 className="text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] break-keep type-heading">
						{t("principlesTitle")}
					</h2>
				</div>

				<ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
					{WorkingPrinciples.map((principle, index) => (
						<li key={principle.id} className="flex flex-col gap-3 rounded-[1.75rem] bg-card p-6 md:p-7">
							<span aria-hidden className={`h-3 w-12 rounded-full ${principleColors[index % principleColors.length]}`} />
							<h3 className="mt-6 text-2xl type-heading">{t(principle.titleKey)}</h3>
							<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
								{t(principle.descriptionKey)}
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
