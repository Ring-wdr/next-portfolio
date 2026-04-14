"use client";

import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useTranslations } from "next-intl";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const t = useTranslations("Chat");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${process.env.NEXT_PUBLIC_CHATBOT_API_URL}/api/chat`,
      }),
    [],
  );

  const { messages, sendMessage, status } = useChat({ transport });

  async function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed || status === "submitted" || status === "streaming") return;
    setInput("");
    await sendMessage({ text: trimmed });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <ChatPanel
          messages={messages}
          input={input}
          status={status}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? t("close") : t("openChat")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
