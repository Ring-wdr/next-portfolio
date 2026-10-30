"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UIMessage } from "@ai-sdk/react";
import { ChatMessage } from "./chat-message";
import { ChatComposer } from "./chat-composer";

type ChatPanelProps = {
  messages: UIMessage[];
  input: string;
  status: "submitted" | "streaming" | "ready" | "error";
  errorMessage: string | null;
  suggestions?: string[];
  onSuggestion?: (question: string) => void;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export function ChatPanel({
  messages,
  input,
  status,
  errorMessage,
  suggestions = [],
  onSuggestion,
  onInputChange,
  onSubmit,
  onClose,
}: ChatPanelProps) {
  const t = useTranslations("Chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const latestAssistantId = [...messages]
    .reverse()
    .find((m) => m.role === "assistant")?.id;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="flex h-[min(560px,calc(100svh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] bg-background shadow-[0_24px_64px_-24px_rgb(16_17_20/0.45)] ring-1 ring-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-cobalt py-3 pr-2 pl-5 text-on-cobalt">
        <div>
          <p className="text-base type-heading">{t("title")}</p>
          <p className="text-xs text-on-cobalt/76">{t("description")}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-on-cobalt/14"
          aria-label={t("close")}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {errorMessage ? (
          <div
            role="alert"
            className="rounded-2xl bg-destructive/12 px-3 py-2 text-xs font-medium text-destructive"
          >
            {errorMessage}
          </div>
        ) : null}
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-base type-heading">{t("emptyTitle")}</p>
            <p className="text-xs text-muted-foreground">{t("emptyDescription")}</p>
            {suggestions.length > 0 && onSuggestion ? (
              <ul className="mt-3 flex w-full flex-col gap-2">
                {suggestions.map((question) => (
                  <li key={question}>
                    <button
                      type="button"
                      onClick={() => onSuggestion(question)}
                      className="min-h-11 w-full rounded-2xl bg-card px-4 py-2 text-left text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
                    >
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isStreamingLatest={
                message.id === latestAssistantId && status === "streaming"
              }
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <ChatComposer
        input={input}
        status={status}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
