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
      className="flex flex-col gap-5 rounded-[2rem] bg-mint p-6 text-on-block md:p-8"
      data-testid="project-ask"
      aria-labelledby="project-ask-title"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
          <MessageCircle size={20} aria-hidden />
        </span>
        <div className="flex flex-col gap-1">
          <h2 id="project-ask-title" className="text-xl type-heading md:text-2xl">
            {t("title")}
          </h2>
          <p className="text-sm font-medium text-on-block/76">{t("description")}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
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
                className="min-h-11 rounded-full bg-paper px-4 py-2 text-left text-sm font-bold text-on-block transition-colors hover:bg-ink hover:text-white disabled:opacity-50"
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
