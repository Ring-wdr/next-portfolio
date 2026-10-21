"use client";

import { ArrowUp } from "lucide-react";
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
		<div className="flex flex-col gap-3" data-testid="home-hero-ask">
			<div
				role="radiogroup"
				aria-label={t("personaLabel")}
				className="flex flex-wrap gap-2"
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
							"min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
							persona === option
								? "border-hero-fg bg-hero-fg text-hero-bg"
								: "border-hero-fg/24 bg-hero-fg/8 text-hero-fg/82 hover:bg-hero-fg/14",
						)}
					>
						{t(`personas.${option}`)}
					</button>
				))}
			</div>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					submit(question);
				}}
				className="flex items-center gap-2 rounded-2xl border border-hero-fg/24 bg-hero-fg/10 p-1.5 pl-4 backdrop-blur-md focus-within:border-hero-fg/60"
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
					className="min-w-0 flex-1 bg-transparent text-base text-hero-fg placeholder:text-hero-fg/56 focus:outline-none md:text-base"
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

			<ul className="flex flex-wrap gap-2" aria-label={t("startersLabel")}>
				{starters.map((starter) => (
					<li key={starter}>
						<button
							type="button"
							onClick={() => submit(starter)}
							disabled={isBusy}
							className="min-h-11 rounded-full border border-hero-fg/16 bg-hero-bg/40 px-4 py-2 text-left text-sm text-hero-fg/80 transition-colors hover:border-hero-fg/40 hover:text-hero-fg disabled:opacity-50"
						>
							{starter}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
