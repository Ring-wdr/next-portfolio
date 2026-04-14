import type { UIMessage } from "@ai-sdk/react";
import { classNames } from "@/shared/utils/classnames";
import type { PortfolioSpec } from "../lib/spec";
import { ChatMarkdown } from "./chat-markdown";
import { LinkRenderer } from "./link-renderer";

type ChatMessageProps = {
  message: UIMessage;
  isStreamingLatest: boolean;
};

function getTextContent(message: UIMessage): string {
  return message.parts
    .filter(
      (part): part is Extract<UIMessage["parts"][number], { type: "text" }> =>
        part.type === "text",
    )
    .map((part) => ("text" in part ? part.text : ""))
    .join("\n\n")
    .trim();
}

function getSpecContent(message: UIMessage): PortfolioSpec | null {
  const specPart = message.parts.find((p) => p.type === "data-spec");
  if (!specPart || !("data" in specPart)) return null;
  const data = specPart.data as
    | { type: string; spec: PortfolioSpec }
    | undefined;
  return data?.type === "flat" ? data.spec : null;
}

export function ChatMessage({ message, isStreamingLatest }: ChatMessageProps) {
  const isUser = message.role === "user";
  const text = getTextContent(message);
  const spec = isUser ? null : getSpecContent(message);

  return (
    <article
      className={classNames(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start",
      )}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {isUser ? "You" : "AI"}
      </span>
      <div
        className={classNames(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border/60 bg-card text-foreground",
        )}
      >
        {text ? (
          <div className="space-y-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ChatMarkdown content={text} />
          </div>
        ) : isStreamingLatest ? (
          <span className="inline-block h-4 w-1 animate-pulse bg-current" />
        ) : null}
        {spec && <LinkRenderer spec={spec} />}
      </div>
    </article>
  );
}
