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
			<section
				className="section-shell editorial-section-shell pt-10 md:pt-14"
				data-testid="about-hero"
			>
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
					<div className="space-y-6">
						<p className="editorial-kicker text-muted-foreground">
							{t("heroEyebrow")}
						</p>
						<h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.05em]">
							{t("name")}
						</h1>
						<p className="text-base font-medium tracking-[-0.02em] text-foreground/90 md:text-lg">
							{t("role")}
						</p>
						<p className="max-w-3xl text-base leading-8 tracking-[-0.02em] text-foreground/88 md:text-lg">
							{t("intro")}
						</p>
						<dl className="grid grid-cols-3 gap-5 border-t border-border/70 pt-6">
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

					<div className="relative hidden aspect-square w-40 overflow-hidden rounded-[1.5rem] bg-secondary/40 sm:block lg:w-full">
						<Image
							src="https://avatars.githubusercontent.com/u/70439662?v=4"
							alt={t("portraitAlt")}
							className="object-cover"
							fill
							sizes="(max-width: 1024px) 160px, 256px"
							priority
						/>
					</div>
				</div>
			</section>

			<section
				className="section-shell editorial-section-shell editorial-section-reveal"
				data-testid="about-career"
			>
				<div className="border-t border-border/70 pt-8">
					<p className="editorial-kicker text-muted-foreground">
						{t("careerEyebrow")}
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
						{t("careerTitle")}
					</h2>

					<ol className="mt-10 space-y-10">
						{Career.map((job) => {
							const highlights = t.raw(`career.${job.id}.highlights`) as string[];
							const summary = t.has(`career.${job.id}.summary`)
								? t(`career.${job.id}.summary`)
								: null;

							return (
								<li
									key={job.id}
									className="grid gap-4 border-t border-border/70 pt-6 md:grid-cols-[13rem_minmax(0,1fr)]"
								>
									<p className="editorial-kicker text-primary">{job.period}</p>
									<article className="space-y-3">
										<h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
											{t(`career.${job.id}.company`)}
											<span className="ml-2 text-base font-medium text-muted-foreground">
												{t(`career.${job.id}.role`)}
											</span>
										</h3>
										{summary && (
											<p className="text-sm leading-6 text-muted-foreground md:text-base">
												{summary}
											</p>
										)}
										<ul className="list-disc space-y-2 pl-5 marker:text-primary">
											{highlights.map((item) => (
												<li
													key={item}
													className="text-sm leading-6 text-foreground/88 md:text-base md:leading-7"
												>
													{item}
												</li>
											))}
										</ul>
										{"projectSlug" in job && (
											<Link
												href={`/project/${job.projectSlug}`}
												className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline"
											>
												{t("careerCaseStudy")}
											</Link>
										)}
									</article>
								</li>
							);
						})}
					</ol>
				</div>
			</section>

			<section className="section-shell editorial-section-shell editorial-section-reveal">
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
			</section>

			<section className="section-shell pb-12 pt-4 md:pb-16">
				<div className="border-t border-border/70 pt-8">
					<div className="max-w-2xl space-y-4">
						<p className="editorial-kicker text-muted-foreground">
							{t("principlesEyebrow")}
						</p>
						<h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
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
