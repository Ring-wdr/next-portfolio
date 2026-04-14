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
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export function ChatPanel({
  messages,
  input,
  status,
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
    <div className="flex h-[480px] w-80 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold">{t("title")}</p>
          <p className="text-xs text-muted-foreground">{t("description")}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          aria-label={t("close")}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium">{t("emptyTitle")}</p>
            <p className="text-xs text-muted-foreground">{t("emptyDescription")}</p>
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
