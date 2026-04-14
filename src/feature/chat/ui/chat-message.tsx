import type { UIMessage } from "@ai-sdk/react";
import { classNames } from "@/shared/utils/classnames";

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

export function ChatMessage({ message, isStreamingLatest }: ChatMessageProps) {
  const isUser = message.role === "user";
  const text = getTextContent(message);

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
          <p className="whitespace-pre-wrap">{text}</p>
        ) : isStreamingLatest ? (
          <span className="inline-block h-4 w-1 animate-pulse bg-current" />
        ) : null}
      </div>
    </article>
  );
}
