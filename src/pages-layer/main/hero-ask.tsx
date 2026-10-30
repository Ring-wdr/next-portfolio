"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { chatPersonas, type ChatPersona } from "@/feature/chat/lib/context";
import { usePortfolioChat } from "@/feature/chat/ui/chat-provider";
import { classNames } from "@/shared/utils/classnames";

/** Sits on the cobalt hero, so it draws with on-cobalt / on-block colors only. */
export function HeroAsk() {
	const t = useTranslations("HomePage.ask");
	const chat = usePortfolioChat();
	const [persona, setPersona] = useState<ChatPersona>(
		chat.persona ?? "recruiter",
	);
	const [question, setQuestion] = useState("");
	const isBusy = chat.status === "submitted" || chat.status === "streaming";

	function submit(text: string) {
		if (!text.trim() || isBusy) return;
		chat.ask(text, { persona });
		setQuestion("");
	}

	return (
		<div className="flex flex-col gap-4" data-testid="home-hero-ask">
			<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
				<p className="text-sm font-bold text-on-cobalt/80">{t("personaLabel")}</p>
				<div
					role="radiogroup"
					aria-label={t("personaLabel")}
					className="flex rounded-full bg-on-cobalt/14 p-1"
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
								"min-h-10 rounded-full px-4 text-sm font-bold transition-colors",
								persona === option
									? "bg-on-cobalt text-cobalt"
									: "text-on-cobalt/80 hover:text-on-cobalt",
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
				className="flex items-center gap-2 rounded-full bg-paper p-1.5 pl-5 text-on-block outline-tangerine focus-within:outline-3"
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
					className="min-w-0 flex-1 bg-transparent text-base font-medium text-on-block placeholder:text-on-block/48 focus:outline-none"
				/>
				<button
					type="submit"
					disabled={isBusy || !question.trim()}
					aria-label={t("submit")}
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tangerine text-on-block transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
				>
					<ArrowUp size={20} strokeWidth={2.5} />
				</button>
			</form>

			{/*
			 * Every persona's starters share one grid cell, so the cell is always as
			 * tall as the longest set and switching personas never moves the page.
			 */}
			<div className="grid">
				{chatPersonas.map((option) => {
					const active = option === persona;
					return (
						<ul
							key={option}
							className={classNames(
								"flex flex-wrap content-start gap-2 [grid-area:1/1]",
								!active && "invisible",
							)}
							aria-label={t("startersLabel")}
							aria-hidden={!active}
							inert={!active}
						>
							{(t.raw(`starters.${option}`) as string[]).map((starter) => (
								<li key={starter}>
									<button
										type="button"
										onClick={() => submit(starter)}
										disabled={isBusy}
										className="min-h-10 rounded-full border-2 border-on-cobalt/28 px-4 py-1.5 text-left text-sm font-medium text-on-cobalt transition-colors hover:border-on-cobalt hover:bg-on-cobalt hover:text-cobalt disabled:opacity-50"
									>
										{starter}
									</button>
								</li>
							))}
						</ul>
					);
				})}
			</div>
		</div>
	);
}
