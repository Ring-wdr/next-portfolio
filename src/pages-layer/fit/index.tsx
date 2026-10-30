"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
	FIT_JD_MAX_LENGTH,
	FIT_JD_MIN_LENGTH,
	summarizeCoverage,
	type FitApiResponse,
	type FitMatchLevel,
	type FitPartialReport,
	type FitReport,
	type FitRequirement,
} from "@/feature/fit/lib/report";
import { readFitStream } from "@/feature/fit/lib/stream";
import { Link } from "@/i18n/routing";
import { classNames } from "@/shared/utils/classnames";

type FitError = Extract<FitApiResponse, { ok: false }>["error"] | "network";

type FitState =
	| { phase: "idle" }
	| {
			phase: "loading";
			startedAt: number;
			/** What the model has finished so far; null until its first row. */
			partial: FitPartialReport | null;
			retrying: boolean;
	  }
	| { phase: "error"; error: FitError }
	| { phase: "done"; report: FitReport };

// Strong → gap reads left to right, matching the ordinal ramp in globals.css.
const MATCH_ORDER: FitMatchLevel[] = ["strong", "partial", "gap"];

const MATCH_SWATCH: Record<FitMatchLevel, string> = {
	strong: "bg-fit-strong",
	partial: "bg-fit-partial",
	gap: "bg-fit-gap",
};

type FeaturedProject = { slug: string; title: string };

export function FitPage({
	projectTitles,
	featured,
}: {
	projectTitles: Record<string, string>;
	featured: FeaturedProject[];
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
		} else if (state.phase === "loading") {
			// The submit button sits at the bottom of the form; bring the progress into view.
			resultRef.current?.scrollIntoView({ block: "nearest" });
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
		setState({
			phase: "loading",
			startedAt: Date.now(),
			partial: null,
			retrying: false,
		});

		try {
			const response = await fetch("/api/fit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ jd: jd.trim(), locale }),
				signal: controller.signal,
			});

			// Input and quota errors come back as JSON before any model call.
			if (
				!response.body ||
				response.headers.get("content-type")?.includes("application/json")
			) {
				const data = (await response.json()) as FitApiResponse;
				setState(
					data.ok
						? { phase: "done", report: data.report }
						: { phase: "error", error: data.error },
				);
				return;
			}

			let settled = false;
			await readFitStream(response.body, (event) => {
				if (event.type === "progress") {
					setState((prev) =>
						prev.phase === "loading"
							? { ...prev, partial: event.partial }
							: prev,
					);
				} else if (event.type === "retry") {
					setState((prev) =>
						prev.phase === "loading"
							? { ...prev, partial: null, retrying: true }
							: prev,
					);
				} else if (event.type === "done") {
					settled = true;
					setState({ phase: "done", report: event.report });
				} else {
					settled = true;
					setState({ phase: "error", error: event.error });
				}
			});
			if (!settled && !controller.signal.aborted) {
				setState({ phase: "error", error: "network" });
			}
		} catch (error) {
			if (controller.signal.aborted) return;
			console.error(error);
			setState({ phase: "error", error: "network" });
		}
	}

	function cancel() {
		abortRef.current?.abort();
		setState({ phase: "idle" });
	}

	return (
		<main className="flex flex-1 flex-col">
			<section className="bg-tangerine text-on-block">
				<div className="section-shell flex flex-col gap-5 pt-10 pb-10 md:pt-14 md:pb-14">
					<p className="kicker w-fit rounded-full border-2 border-on-block/30 px-3.5 py-1.5">
						{t("eyebrow")}
					</p>
					<h1 className="max-w-[18ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] break-keep type-heading">
						{t("title")}
					</h1>
					<p className="max-w-3xl text-base leading-7 font-medium md:text-lg">
						{t("description")}
					</p>
					<p className="w-fit rounded-2xl bg-on-block/8 px-4 py-2 text-sm font-bold">{t("honesty")}</p>
				</div>
			</section>

			<section className="section-shell pt-3 pb-14 md:pb-20">
				<form
					className="rounded-[2rem] bg-card p-5 md:p-7"
					onSubmit={(event) => {
						event.preventDefault();
						void analyze();
					}}
				>
					<div className="flex flex-wrap items-center justify-between gap-2">
						<label htmlFor="fit-jd" className="text-sm font-bold">
							{t("jdLabel")}
						</label>
						<button
							type="button"
							onClick={() => setJd(t("sampleJd"))}
							disabled={isLoading}
							className="inline-flex min-h-10 items-center rounded-full bg-butter px-4 text-sm font-bold text-on-block disabled:opacity-50"
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
						className="mt-3 w-full resize-y rounded-[1.25rem] border-2 border-transparent bg-background px-4 py-3 text-base leading-6 placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60 md:text-sm"
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
							className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
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
					className="mt-8 outline-none"
					data-testid="fit-result"
				>
					{state.phase === "loading" ? (
						<div className="flex flex-col gap-6">
							<AnalysisProgress
								startedAt={state.startedAt}
								partial={state.partial}
								retrying={state.retrying}
								featured={featured}
								onCancel={cancel}
							/>
							<PartialReportView
								partial={state.partial}
								projectTitles={projectTitles}
							/>
						</div>
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

type ProgressStep = "sent" | "reading" | "writing" | "done";
const PROGRESS_STEPS: ProgressStep[] = ["sent", "reading", "writing", "done"];

/**
 * Only shows states the page actually knows: the request went out, the model
 * has not written a row yet, or rows are arriving. No made-up percentages.
 */
function AnalysisProgress({
	startedAt,
	partial,
	retrying,
	featured,
	onCancel,
}: {
	startedAt: number;
	partial: FitPartialReport | null;
	retrying: boolean;
	featured: FeaturedProject[];
	onCancel: () => void;
}) {
	const t = useTranslations("FitPage.progress");
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const id = window.setInterval(
			() => setSeconds(Math.floor((Date.now() - startedAt) / 1000)),
			1000,
		);
		return () => window.clearInterval(id);
	}, [startedAt]);

	const current: ProgressStep = partial ? "writing" : "reading";
	const currentIndex = PROGRESS_STEPS.indexOf(current);
	const rows = partial?.requirements.length ?? 0;
	const title = retrying && !partial ? t("retryTitle") : partial ? t("writingTitle") : t("readingTitle");
	const body = partial ? t("writingBody", { count: rows }) : t("readingBody");

	return (
		<section
			className="rounded-[2rem] bg-card p-6 md:p-8"
			aria-labelledby="fit-progress-title"
			data-testid="fit-progress"
		>
			<ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium md:text-sm">
				{PROGRESS_STEPS.map((step, index) => {
					const status =
						index < currentIndex ? "done" : index === currentIndex ? "current" : "pending";
					return (
						<li
							key={step}
							aria-current={status === "current" ? "step" : undefined}
							className="flex items-center gap-2"
						>
							<span
								className={classNames(
									"flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
									status === "done" && "border-primary bg-primary text-primary-foreground",
									status === "current" && "border-primary text-primary",
									status === "pending" && "border-border text-muted-foreground",
								)}
								aria-hidden="true"
							>
								{status === "done" ? (
									<Check size={14} />
								) : status === "current" ? (
									<LoaderCircle size={14} className="animate-spin" />
								) : (
									index + 1
								)}
							</span>
							<span
								className={classNames(
									status === "pending" ? "text-muted-foreground" : "text-foreground",
								)}
							>
								{t(`steps.${step}`)}
							</span>
							{index < PROGRESS_STEPS.length - 1 ? (
								<span className="hidden h-px w-4 bg-border sm:block md:w-8" aria-hidden="true" />
							) : null}
						</li>
					);
				})}
			</ol>

			<div className="mt-6 space-y-2" aria-live="polite">
				<h2 id="fit-progress-title" className="text-xl type-heading md:text-2xl">
					{title}
				</h2>
				<p className="text-sm leading-6 text-muted-foreground md:text-base">{body}</p>
			</div>

			<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
				<span className="tabular-nums text-muted-foreground">
					{t("elapsed", { seconds })}
				</span>
				<button
					type="button"
					onClick={onCancel}
					className="inline-flex min-h-11 items-center rounded-full border-2 border-foreground px-4 font-bold transition-colors hover:bg-foreground hover:text-background"
				>
					{t("cancel")}
				</button>
			</div>

			{featured.length > 0 ? (
				<div className="mt-6 border-t border-border/70 pt-5">
					<p className="text-sm text-muted-foreground">{t("meanwhile")}</p>
					<ul className="mt-3 flex flex-wrap gap-2">
						{featured.map((project) => (
							<li key={project.slug}>
								<Link
									href={`/project/${project.slug}`}
									target="_blank"
									rel="noopener"
									className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-background px-4 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
								>
									{project.title}
									<ArrowRight size={14} aria-hidden />
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</section>
	);
}

/** Rows the model has finished, followed by placeholders for the ones still coming. */
function PartialReportView({
	partial,
	projectTitles,
}: {
	partial: FitPartialReport | null;
	projectTitles: Record<string, string>;
}) {
	const t = useTranslations("FitPage.report");
	const placeholders = Math.max(1, 3 - (partial?.requirements.length ?? 0));

	return (
		<div className="flex flex-col gap-6" data-testid="fit-partial">
			<section className="space-y-4 rounded-[2rem] bg-card p-6 md:p-8">
				{partial?.summary ? (
					<p className="text-base leading-7">{partial.summary}</p>
				) : (
					<div className="space-y-2" aria-hidden="true">
						<div className="h-4 w-11/12 animate-pulse rounded bg-secondary" />
						<div className="h-4 w-4/5 animate-pulse rounded bg-secondary" />
					</div>
				)}
			</section>

			<section className="rounded-[2rem] bg-card p-6 md:p-8">
				<h2 className="text-2xl type-heading">{t("requirementsTitle")}</h2>
				<RequirementRows
					requirements={partial?.requirements ?? []}
					projectTitles={projectTitles}
				/>
				<ul className="mt-4 space-y-4" aria-hidden="true">
					{Array.from({ length: placeholders }, (_, index) => (
						<li key={index} className="space-y-2 border-t border-border/70 pt-4 first:border-t-0 first:pt-0">
							<div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
							<div className="h-3.5 w-5/6 animate-pulse rounded bg-secondary" />
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

function RequirementRows({
	requirements,
	projectTitles,
}: {
	requirements: FitRequirement[];
	projectTitles: Record<string, string>;
}) {
	const t = useTranslations("FitPage.report");
	if (requirements.length === 0) return null;

	return (
		<ol className="mt-5 divide-y divide-border">
			{requirements.map((requirement, index) => (
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
										className="inline-flex min-h-9 items-center gap-1 rounded-full bg-background px-3 py-1 text-xs font-bold transition-colors hover:bg-foreground hover:text-background"
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
			className="flex flex-col gap-3 rounded-[1.5rem] bg-destructive/12 px-5 py-4 text-sm"
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
					<p className="type-display text-6xl tabular-nums md:text-7xl">
						{summary.coverage}%
					</p>
				</div>
				<p className="max-w-xs break-keep text-xs text-muted-foreground">
					{t("coverageHint", { total: summary.total })}
				</p>
			</div>

			{/* Stacked meter: 2px surface gaps between segments, rounded outer ends. */}
			<div className="flex h-4 w-full gap-1 overflow-hidden rounded-full" aria-hidden="true">
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
			<section className="space-y-6 rounded-[2rem] bg-card p-6 md:p-8">
				<CoverageMeter report={report} />
				<p className="text-base leading-7">{report.summary}</p>
			</section>

			<section className="rounded-[2rem] bg-card p-6 md:p-8">
				<h2 className="text-2xl type-heading">{t("requirementsTitle")}</h2>
				<RequirementRows
					requirements={report.requirements}
					projectTitles={projectTitles}
				/>
			</section>

			<div className="grid gap-6 md:grid-cols-2">
				{report.gaps.length > 0 ? (
					<section className="rounded-[2rem] bg-card p-6">
						<h2 className="text-xl type-heading">{t("gapsTitle")}</h2>
						<ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
							{report.gaps.map((gap) => (
								<li key={gap}>{gap}</li>
							))}
						</ul>
					</section>
				) : null}
				{report.questions.length > 0 ? (
					<section className="rounded-[2rem] bg-card p-6">
						<h2 className="text-xl type-heading">{t("questionsTitle")}</h2>
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
					className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
				>
					{t("contactCta")}
					<ArrowRight size={16} />
				</Link>
				<p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
			</div>
		</article>
	);
}
