import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { UIMessage } from "@ai-sdk/react";
import { ChatMessage } from "./chat-message";

function createAssistantMessage(text: string): UIMessage {
  return {
    id: "assistant-1",
    role: "assistant",
    metadata: undefined,
    parts: [{ type: "text", text }],
  } as UIMessage;
}

describe("ChatMessage", () => {
  it("renders markdown content with chat-safe formatting", () => {
    render(
      <ChatMessage
        message={createAssistantMessage(
          [
            "# Heading",
            "",
            "A paragraph with a [link](https://example.com) and `inline code`.",
            "",
            "- First item",
            "- Second item",
            "",
            "```ts",
            "const answer = 42;",
            "```",
          ].join("\n"),
        )}
        isStreamingLatest={false}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Heading" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "link" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(screen.getByText("inline code")).toBeInTheDocument();
    expect(screen.getByText("First item")).toBeInTheDocument();
    expect(screen.getByText("const answer = 42;")).toBeInTheDocument();
  });
});
