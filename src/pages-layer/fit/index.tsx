"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
	FIT_JD_MAX_LENGTH,
	FIT_JD_MIN_LENGTH,
	summarizeCoverage,
	type FitApiResponse,
	type FitMatchLevel,
	type FitReport,
} from "@/feature/fit/lib/report";
import { Link } from "@/i18n/routing";
import { classNames } from "@/shared/utils/classnames";

type FitError = Extract<FitApiResponse, { ok: false }>["error"] | "network";

type FitState =
	| { phase: "idle" }
	| { phase: "loading"; startedAt: number }
	| { phase: "error"; error: FitError }
	| { phase: "done"; report: FitReport };

// Strong → gap reads left to right, matching the ordinal ramp in globals.css.
const MATCH_ORDER: FitMatchLevel[] = ["strong", "partial", "gap"];

const MATCH_SWATCH: Record<FitMatchLevel, string> = {
	strong: "bg-fit-strong",
	partial: "bg-fit-partial",
	gap: "bg-fit-gap",
};

export function FitPage({
	projectTitles,
}: {
	projectTitles: Record<string, string>;
}) {
	const t = useTranslations("FitPage");
	const locale = useLocale();
	const [jd, setJd] = useState("");
	const [state, setState] = useState<FitState>({ phase: "idle" });
	const abortRef = useRef<AbortController | null>(null);
	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => () => abortRef.current?.abort(), []);

	useEffect(() => {
		if (state.phase === "done" || state.phase === "error") {
			resultRef.current?.focus();
		}
	}, [state.phase]);

	const length = jd.trim().length;
	const isLoading = state.phase === "loading";
	const canSubmit =
		!isLoading && length >= FIT_JD_MIN_LENGTH && length <= FIT_JD_MAX_LENGTH;

	async function analyze() {
		if (!canSubmit) return;
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;
		setState({ phase: "loading", startedAt: Date.now() });

		try {
			const response = await fetch("/api/fit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ jd: jd.trim(), locale }),
				signal: controller.signal,
			});
			const data = (await response.json()) as FitApiResponse;
			setState(
				data.ok
					? { phase: "done", report: data.report }
					: { phase: "error", error: data.error },
			);
		} catch (error) {
			if (controller.signal.aborted) return;
			console.error(error);
			setState({ phase: "error", error: "network" });
		}
	}

	return (
		<main className="flex flex-1 flex-col">
			<section className="section-shell editorial-section-shell pt-10 md:pt-14">
				<div className="max-w-3xl space-y-5">
					<p className="editorial-kicker text-muted-foreground">
						{t("eyebrow")}
					</p>
					<h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
						{t("title")}
					</h1>
					<p className="text-base leading-7 text-muted-foreground md:text-lg">
						{t("description")}
					</p>
					<p className="text-sm text-muted-foreground">{t("honesty")}</p>
				</div>

				<form
					className="glass-panel mt-10 rounded-3xl p-5 md:p-7"
					onSubmit={(event) => {
						event.preventDefault();
						void analyze();
					}}
				>
					<div className="flex flex-wrap items-center justify-between gap-2">
						<label htmlFor="fit-jd" className="text-sm font-semibold">
							{t("jdLabel")}
						</label>
						<button
							type="button"
							onClick={() => setJd(t("sampleJd"))}
							disabled={isLoading}
							className="text-sm font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50"
						>
							{t("useSample")}
						</button>
					</div>
					<textarea
						id="fit-jd"
						value={jd}
						onChange={(event) => setJd(event.target.value)}
						placeholder={t("jdPlaceholder")}
						maxLength={FIT_JD_MAX_LENGTH}
						rows={10}
						disabled={isLoading}
						aria-describedby="fit-jd-hint"
						className="mt-3 w-full resize-y rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm leading-6 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60 disabled:opacity-60"
					/>
					<div className="mt-3 flex flex-wrap items-center justify-between gap-3">
						<p
							id="fit-jd-hint"
							className={classNames(
								"text-xs",
								length > 0 && length < FIT_JD_MIN_LENGTH
									? "text-destructive-foreground"
									: "text-muted-foreground",
							)}
						>
							{t("lengthHint", {
								count: length,
								min: FIT_JD_MIN_LENGTH,
								max: FIT_JD_MAX_LENGTH,
							})}
						</p>
						<button
							type="submit"
							disabled={!canSubmit}
							className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
						>
							{isLoading ? (
								<LoaderCircle size={16} className="animate-spin" />
							) : null}
							{isLoading ? t("analyzing") : t("submit")}
						</button>
					</div>
				</form>

				<div
					ref={resultRef}
					tabIndex={-1}
					aria-live="polite"
					className="mt-8 outline-none"
					data-testid="fit-result"
				>
					{state.phase === "loading" ? (
						<LoadingNotice startedAt={state.startedAt} />
					) : null}
					{state.phase === "error" ? (
						<ErrorNotice error={state.error} onRetry={() => void analyze()} />
					) : null}
					{state.phase === "done" ? (
						<FitReportView report={state.report} projectTitles={projectTitles} />
					) : null}
				</div>
			</section>
		</main>
	);
}

function LoadingNotice({ startedAt }: { startedAt: number }) {
	const t = useTranslations("FitPage");
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const id = window.setInterval(
			() => setSeconds(Math.floor((Date.now() - startedAt) / 1000)),
			1000,
		);
		return () => window.clearInterval(id);
	}, [startedAt]);

	return (
		<p className="rounded-2xl border border-border/70 bg-card/70 px-5 py-4 text-sm text-muted-foreground">
			{t("loading", { seconds })}
		</p>
	);
}

function ErrorNotice({
	error,
	onRetry,
}: {
	error: FitError;
	onRetry: () => void;
}) {
	const t = useTranslations("FitPage.errors");

	return (
		<div
			role="alert"
			className="flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm"
		>
			<p>{t(error)}</p>
			<div className="flex flex-wrap gap-4 font-medium">
				{error !== "invalid_input" ? (
					<button type="button" onClick={onRetry} className="underline underline-offset-4">
						{t("retry")}
					</button>
				) : null}
				<Link href="/project" className="underline underline-offset-4">
					{t("browseProjects")}
				</Link>
			</div>
		</div>
	);
}

function CoverageMeter({ report }: { report: FitReport }) {
	const t = useTranslations("FitPage.report");
	const summary = summarizeCoverage(report.requirements);

	return (
		<figure className="space-y-4" aria-labelledby="fit-coverage-caption">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p id="fit-coverage-caption" className="text-sm text-muted-foreground">
						{t("coverageLabel")}
					</p>
					<p className="text-5xl font-semibold tracking-[-0.04em] tabular-nums md:text-6xl">
						{summary.coverage}%
					</p>
				</div>
				<p className="max-w-xs break-keep text-xs text-muted-foreground">
					{t("coverageHint", { total: summary.total })}
				</p>
			</div>

			{/* Stacked meter: 2px surface gaps between segments, rounded outer ends. */}
			<div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-[4px]" aria-hidden="true">
				{MATCH_ORDER.map((level) =>
					summary[level] > 0 ? (
						<div
							key={level}
							className={MATCH_SWATCH[level]}
							style={{ flexGrow: summary[level] }}
							title={`${t(`levels.${level}`)}: ${summary[level]}`}
						/>
					) : null,
				)}
			</div>

			<figcaption>
				<ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
					{MATCH_ORDER.map((level) => (
						<li key={level} className="flex items-center gap-2">
							<span className={classNames("h-2.5 w-2.5 rounded-[2px]", MATCH_SWATCH[level])} />
							<span className="text-muted-foreground">{t(`levels.${level}`)}</span>
							<span className="font-semibold tabular-nums">{summary[level]}</span>
						</li>
					))}
				</ul>
			</figcaption>
		</figure>
	);
}

function FitReportView({
	report,
	projectTitles,
}: {
	report: FitReport;
	projectTitles: Record<string, string>;
}) {
	const t = useTranslations("FitPage.report");

	return (
		<article className="flex flex-col gap-6" data-testid="fit-report">
			<section className="glass-panel space-y-6 rounded-3xl p-6 md:p-8">
				<CoverageMeter report={report} />
				<p className="text-base leading-7">{report.summary}</p>
			</section>

			<section className="glass-panel rounded-3xl p-6 md:p-8">
				<h2 className="text-xl font-semibold">{t("requirementsTitle")}</h2>
				<ol className="mt-5 divide-y divide-border/70">
					{report.requirements.map((requirement, index) => (
						<li key={`${index}-${requirement.requirement}`} className="py-4 first:pt-0 last:pb-0">
							<div className="flex flex-wrap items-center gap-2">
								<span
									className={classNames(
										"h-2.5 w-2.5 shrink-0 rounded-[2px]",
										MATCH_SWATCH[requirement.match],
									)}
									aria-hidden="true"
								/>
								<span className="text-xs font-semibold text-muted-foreground">
									{t(`levels.${requirement.match}`)}
								</span>
								<h3 className="text-sm font-semibold md:text-base">
									{requirement.requirement}
								</h3>
							</div>
							{requirement.evidence ? (
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									{requirement.evidence}
								</p>
							) : null}
							{requirement.projectSlugs.length > 0 ? (
								<ul className="mt-2 flex flex-wrap gap-2" aria-label={t("evidenceLabel")}>
									{requirement.projectSlugs.map((slug) => (
										<li key={slug}>
											<Link
												href={`/project/${slug}`}
												className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card/70 px-2.5 py-1 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-secondary"
											>
												{projectTitles[slug] ?? slug}
												<ArrowRight size={12} />
											</Link>
										</li>
									))}
								</ul>
							) : null}
						</li>
					))}
				</ol>
			</section>

			<div className="grid gap-6 md:grid-cols-2">
				{report.gaps.length > 0 ? (
					<section className="glass-panel rounded-3xl p-6">
						<h2 className="text-lg font-semibold">{t("gapsTitle")}</h2>
						<ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
							{report.gaps.map((gap) => (
								<li key={gap}>{gap}</li>
							))}
						</ul>
					</section>
				) : null}
				{report.questions.length > 0 ? (
					<section className="glass-panel rounded-3xl p-6">
						<h2 className="text-lg font-semibold">{t("questionsTitle")}</h2>
						<ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
							{report.questions.map((question) => (
								<li key={question}>{question}</li>
							))}
						</ul>
					</section>
				) : null}
			</div>

			<div className="flex flex-wrap items-center gap-4">
				<Link
					href="/contact"
					className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
				>
					{t("contactCta")}
					<ArrowRight size={16} />
				</Link>
				<p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
			</div>
		</article>
	);
}
