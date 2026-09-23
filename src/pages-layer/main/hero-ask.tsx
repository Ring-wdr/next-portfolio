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
							"rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
							persona === option
								? "border-white bg-white text-slate-950"
								: "border-white/24 bg-white/8 text-white/82 hover:bg-white/14",
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
				className="flex items-center gap-2 rounded-2xl border border-white/24 bg-white/10 p-1.5 pl-4 backdrop-blur-md focus-within:border-white/60"
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
					className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/56 focus:outline-none md:text-base"
				/>
				<button
					type="submit"
					disabled={isBusy || !question.trim()}
					aria-label={t("submit")}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950 transition-opacity disabled:opacity-40"
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
							className="rounded-full border border-white/16 bg-black/20 px-3 py-1.5 text-left text-xs text-white/80 transition-colors hover:border-white/40 hover:text-white disabled:opacity-50"
						>
							{starter}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
