"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChatPanel } from "./chat-panel";
import { usePortfolioChat } from "./chat-provider";

export function ChatWidget() {
  const t = useTranslations("Chat");
  const chat = usePortfolioChat();
  const [input, setInput] = useState("");
  const suggestions = t.raw("suggestions") as string[];

  function handleInputChange(value: string) {
    if (chat.status === "error") {
      chat.clearError();
    }
    setInput(value);
  }

  function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed || chat.status === "submitted" || chat.status === "streaming") {
      return;
    }
    setInput("");
    chat.ask(trimmed);
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {chat.isOpen && (
        <ChatPanel
          messages={chat.messages}
          input={input}
          status={chat.status}
          errorMessage={
            chat.status === "error" ? (chat.error?.message ?? t("error")) : null
          }
          suggestions={suggestions}
          onSuggestion={(question) => chat.ask(question)}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={chat.close}
        />
      )}

      <button
        type="button"
        onClick={chat.toggle}
        aria-label={chat.isOpen ? t("close") : t("openChat")}
        aria-expanded={chat.isOpen}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        {chat.isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
