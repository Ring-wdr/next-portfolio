"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { chatPersonas, type ChatPersona } from "@/feature/chat/lib/context";
import { usePortfolioChat } from "@/feature/chat/ui/chat-provider";
import { classNames } from "@/shared/utils/classnames";

export function HeroAsk() {
	const t = useTranslations("HomePage.ask");
	const chat = usePortfolioChat();
	const [persona, setPersona] = useState<ChatPersona>(
		chat.persona ?? "recruiter",
	);
	const [question, setQuestion] = useState("");
	const starters = t.raw(`starters.${persona}`) as string[];
	const isBusy = chat.status === "submitted" || chat.status === "streaming";

	function submit(text: string) {
		if (!text.trim() || isBusy) return;
		chat.ask(text, { persona });
		setQuestion("");
	}

	return (
		<div
			className="rounded-3xl border border-hero-fg/16 bg-hero-fg/6 p-2 shadow-[0_24px_60px_-40px_color-mix(in_oklch,var(--hero-fg),transparent_40%)] backdrop-blur-md"
			data-testid="home-hero-ask"
		>
			{/* One composer surface: persona → question → starters, instead of three loose pill rows */}
			<div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 pb-2">
				<p className="inline-flex items-center gap-1.5 text-xs font-semibold text-hero-fg/64">
					<Sparkles size={13} aria-hidden />
					{t("personaLabel")}
				</p>
				<div
					role="radiogroup"
					aria-label={t("personaLabel")}
					className="flex rounded-full bg-hero-fg/8 p-0.5"
				>
					{chatPersonas.map((option) => (
						<button
							key={option}
							type="button"
							role="radio"
							aria-checked={persona === option}
							onClick={() => {
								setPersona(option);
								chat.setPersona(option);
							}}
							className={classNames(
								"min-h-9 rounded-full px-3 text-xs font-semibold transition-colors md:text-sm",
								persona === option
									? "bg-hero-fg text-hero-bg"
									: "text-hero-fg/70 hover:text-hero-fg",
							)}
						>
							{t(`personas.${option}`)}
						</button>
					))}
				</div>
			</div>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					submit(question);
				}}
				className="flex items-center gap-2 rounded-2xl border border-hero-fg/14 bg-hero-bg/70 p-1.5 pl-4 focus-within:border-hero-fg/50"
			>
				<label htmlFor="hero-ask-input" className="sr-only">
					{t("label")}
				</label>
				<input
					id="hero-ask-input"
					value={question}
					onChange={(event) => setQuestion(event.target.value)}
					placeholder={t("placeholder")}
					maxLength={500}
					autoComplete="off"
					className="min-w-0 flex-1 bg-transparent text-base text-hero-fg placeholder:text-hero-fg/56 focus:outline-none"
				/>
				<button
					type="submit"
					disabled={isBusy || !question.trim()}
					aria-label={t("submit")}
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-hero-fg text-hero-bg transition-opacity disabled:opacity-40"
				>
					<ArrowUp size={18} />
				</button>
			</form>

			{/* Scrolls sideways on narrow screens so the starters cost one row of height */}
			<ul
				className="-mx-2 flex gap-2 overflow-x-auto px-2 pt-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible"
				aria-label={t("startersLabel")}
			>
				{starters.map((starter) => (
					<li key={starter} className="shrink-0">
						<button
							type="button"
							onClick={() => submit(starter)}
							disabled={isBusy}
							className="min-h-10 whitespace-nowrap rounded-full border border-hero-fg/12 px-3.5 text-left text-xs text-hero-fg/76 transition-colors hover:border-hero-fg/36 hover:text-hero-fg disabled:opacity-50 md:text-sm"
						>
							{starter}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
