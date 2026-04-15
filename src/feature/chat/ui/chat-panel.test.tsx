import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { UIMessage } from "@ai-sdk/react";
import { ChatPanel } from "./chat-panel";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace !== "Chat") return key;

    const messages = {
      title: "AI Assistant",
      description: "Ask about career & tech stack",
      placeholder: "Ask about career or tech...",
      send: "Send",
      sending: "Sending...",
      error: "Failed to send message. Please try again.",
      close: "Close",
      openChat: "Open chat",
      emptyTitle: "Ask me anything",
      emptyDescription:
        "Ask about Manjoong's career, projects, or tech stack.",
    } as const;

    return messages[key as keyof typeof messages] ?? key;
  },
}));

function createMessage(role: "user" | "assistant", text: string): UIMessage {
  return {
    id: `${role}-1`,
    role,
    metadata: undefined,
    parts: [{ type: "text", text }],
  } as UIMessage;
}

describe("ChatPanel", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  it("renders the empty state when there are no messages", () => {
    render(
      <ChatPanel
        messages={[]}
        input=""
        status="ready"
        errorMessage={null}
        onInputChange={() => {}}
        onSubmit={() => {}}
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Ask me anything")).toBeInTheDocument();
    expect(
      screen.getByText("Ask about Manjoong's career, projects, or tech stack."),
    ).toBeInTheDocument();
  });

  it("renders a visible alert when chat request fails", () => {
    render(
      <ChatPanel
        messages={[createMessage("user", "What did you build?")]}
        input=""
        status="error"
        errorMessage="Failed to send message. Please try again."
        onInputChange={() => {}}
        onSubmit={() => {}}
        onClose={() => {}}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to send message. Please try again.",
    );
    expect(screen.getByText("What did you build?")).toBeInTheDocument();
  });
});
