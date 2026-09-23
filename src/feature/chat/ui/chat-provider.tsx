"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLocale } from "next-intl";
import type { ChatContext, ChatPersona } from "../lib/context";
import { specDataPartSchema } from "../lib/spec";

type ChatStatus = "submitted" | "streaming" | "ready" | "error";

type PortfolioChatValue = {
  messages: UIMessage[];
  status: ChatStatus;
  error: Error | undefined;
  isOpen: boolean;
  persona: ChatPersona | undefined;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setPersona: (persona: ChatPersona | undefined) => void;
  clearError: () => void;
  /** Opens the panel and sends `question` with the current page context. */
  ask: (question: string, context?: Omit<ChatContext, "locale">) => void;
};

const PortfolioChatContext = createContext<PortfolioChatValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const locale = useLocale() as ChatContext["locale"];
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<ChatPersona | undefined>();

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
    dataPartSchemas: { spec: specDataPartSchema },
  });

  const ask = useCallback<PortfolioChatValue["ask"]>(
    (question, context) => {
      const text = question.trim();
      if (!text || status === "submitted" || status === "streaming") return;

      if (status === "error") clearError();
      if (context?.persona) setPersona(context.persona);
      setIsOpen(true);

      const requestContext: ChatContext = {
        locale,
        persona: context?.persona ?? persona,
        projectSlug: context?.projectSlug,
      };

      sendMessage({ text }, { body: { context: requestContext } }).catch(() => {
        // useChat surfaces request failures through `error` and `status`
      });
    },
    [clearError, locale, persona, sendMessage, status],
  );

  const value = useMemo<PortfolioChatValue>(
    () => ({
      messages,
      status,
      error,
      isOpen,
      persona,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
      setPersona,
      clearError,
      ask,
    }),
    [ask, clearError, error, isOpen, messages, persona, status],
  );

  return (
    <PortfolioChatContext.Provider value={value}>
      {children}
    </PortfolioChatContext.Provider>
  );
}

export function usePortfolioChat() {
  const value = useContext(PortfolioChatContext);
  if (!value) {
    throw new Error("usePortfolioChat must be used inside <ChatProvider>");
  }
  return value;
}
