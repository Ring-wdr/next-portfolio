"use client";

import { MessageCircle } from "lucide-react";
import { useContext } from "react";
import { useTranslations } from "next-intl";
import { ModalDismissContext } from "@/shared/ui/modal";
import { usePortfolioChat } from "./chat-provider";

type ProjectAskProps = {
  slug: string;
  title: string;
};

const QUESTION_KEYS = ["challenge", "stack", "role"] as const;

export function ProjectAsk({ slug, title }: ProjectAskProps) {
  const t = useTranslations("ProjectDetailPage.ask");
  const chat = usePortfolioChat();
  const dismissModal = useContext(ModalDismissContext);
  const isBusy = chat.status === "submitted" || chat.status === "streaming";

  return (
    <section
      className="glass-panel rounded-2xl p-5 md:p-6"
      data-testid="project-ask"
      aria-labelledby="project-ask-title"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <MessageCircle size={16} />
        </span>
        <div className="space-y-1">
          <h2 id="project-ask-title" className="text-base font-semibold">
            {t("title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {QUESTION_KEYS.map((key) => {
          const question = t(`questions.${key}`, { title });
          return (
            <li key={key}>
              <button
                type="button"
                disabled={isBusy}
                onClick={() => {
                  dismissModal?.();
                  chat.ask(question, { projectSlug: slug });
                }}
                className="rounded-full border border-border/70 bg-card/70 px-3.5 py-2 text-left text-sm transition-colors hover:border-primary/40 hover:bg-secondary disabled:opacity-50"
              >
                {question}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
