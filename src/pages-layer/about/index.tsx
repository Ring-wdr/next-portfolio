import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
	CareerTimeline,
	CoreStrengthKeys,
	FocusAreas,
	WorkingPrinciples,
} from "@/shared/constant/profile";
import { projectList } from "@/shared/constant/project";
import { TechStack } from "@/shared/constant/tech-stack";
import { PretextStatement } from "@/shared/ui/pretext-statement";

export function AboutPage() {
	const locale = useLocale();
	const t = useTranslations("AboutPage");
	const stats = [
		{
			label: t("stats.projects"),
			value: `${projectList.length}+`,
		},
		{
			label: t("stats.technologies"),
			value: `${TechStack.length}+`,
		},
		{
			label: t("stats.years"),
			value: "3+",
		},
	] as const;
	const focusLabels = FocusAreas.map((focus) => t(focus.labelKey));

	return (
		<main className="flex flex-1 flex-col">
			<section
				className="section-shell editorial-section-shell pt-10 md:pt-14"
				data-testid="about-hero"
			>
				<div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_21rem] lg:items-end">
					<div className="space-y-8">
						<p className="editorial-kicker text-muted-foreground">
							{t("heroEyebrow")}
						</p>
						<PretextStatement
							as="h1"
							locale={locale}
							text={t("heroStatement")}
							className="max-w-[14ch] text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.06em]"
						/>
						<div className="max-w-2xl space-y-4 border-t border-border/70 pt-6">
							<p className="text-base font-medium tracking-[-0.02em] text-foreground/90 md:text-lg">
								{t("role")}
							</p>
							<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
								{t("intro")}
							</p>
						</div>
						<dl className="grid gap-5 border-t border-border/70 pt-6 sm:grid-cols-3">
							{stats.map((item) => (
								<div key={item.label} className="space-y-1">
									<dt className="editorial-kicker text-muted-foreground/72">
										{item.label}
									</dt>
									<dd className="text-lg font-semibold tracking-[-0.03em] text-foreground md:text-xl">
										{item.value}
									</dd>
								</div>
							))}
						</dl>
					</div>

					<div className="space-y-4 lg:pb-3">
						<div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary/40">
							<Image
								src="https://avatars.githubusercontent.com/u/70439662?v=4"
								alt={t("portraitAlt")}
								className="object-cover"
								fill
								sizes="(max-width: 1024px) 100vw, 336px"
								priority
							/>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0)_45%,rgba(12,14,18,0.28)_100%)]" />
						</div>
						<p className="max-w-sm text-sm leading-6 text-muted-foreground">
							{t("portraitCaption")}
						</p>
					</div>
				</div>
			</section>

			<section className="section-shell editorial-section-shell editorial-section-reveal">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<div className="lg:sticky lg:top-24 lg:self-start">
						<p className="editorial-kicker text-muted-foreground">
							{t("narrativeEyebrow")}
						</p>
						<h2 className="mt-4 max-w-[12ch] text-3xl font-semibold tracking-[-0.04em] md:text-4xl xl:text-[2.75rem]">
							{t("aboutMeTitle")}
						</h2>
					</div>

					<div className="space-y-10">
						<p className="max-w-3xl text-base leading-8 tracking-[-0.02em] text-foreground/88 md:text-lg">
							{t("aboutMeDescription")}
						</p>

						<div className="grid gap-10 border-t border-border/70 pt-8 md:grid-cols-2">
							<div>
								<p className="editorial-kicker text-muted-foreground">
									{t("strengthsTitle")}
								</p>
								<div className="mt-5 grid gap-4 sm:grid-cols-2">
									{CoreStrengthKeys.map((strength) => (
										<p
											key={strength}
											className="border-t border-border/70 pt-3 text-base font-medium tracking-[-0.02em]"
										>
											{t(strength)}
										</p>
									))}
								</div>
							</div>

							<div data-testid="about-focus">
								<p className="editorial-kicker text-muted-foreground">
									{t("focusTitle")}
								</p>
								<p className="mt-5 text-base leading-8 tracking-[-0.02em] text-foreground/84 md:text-lg">
									{focusLabels.join(" / ")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				className="section-shell editorial-section-shell editorial-section-reveal"
				data-testid="about-timeline"
			>
				<div className="border-t border-border/70 pt-8">
					<div className="max-w-2xl space-y-4">
						<p className="editorial-kicker text-muted-foreground">
							{t("timelineEyebrow")}
						</p>
						<h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl xl:text-[2.75rem]">
							{t("timelineTitle")}
						</h2>
					</div>

					<div className="mt-10 grid gap-8 lg:grid-cols-3">
						{CareerTimeline.map((item) => (
							<article key={item.id} className="border-t border-border/70 pt-5">
								<p className="editorial-kicker text-primary">{item.period}</p>
								<h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] md:text-[1.625rem]">
									{t(item.titleKey)}
								</h3>
								<p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
									{t(item.descriptionKey)}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section-shell pb-12 pt-4 md:pb-16">
				<div className="border-t border-border/70 pt-8">
					<div className="max-w-2xl space-y-4">
						<p className="editorial-kicker text-muted-foreground">
							{t("principlesEyebrow")}
						</p>
						<h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl xl:text-[2.75rem]">
							{t("principlesTitle")}
						</h2>
					</div>

					<div className="mt-10 grid gap-6 md:grid-cols-3">
						{WorkingPrinciples.map((principle, index) => (
							<article key={principle.id} className="border-t border-border/70 pt-4">
								<p className="editorial-kicker text-muted-foreground/72">
									{`0${index + 1}`}
								</p>
								<h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] md:text-[1.625rem]">
									{t(principle.titleKey)}
								</h3>
								<p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
									{t(principle.descriptionKey)}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
