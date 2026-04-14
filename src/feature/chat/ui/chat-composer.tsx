"use client";

import { useTranslations } from "next-intl";

type ChatComposerProps = {
  input: string;
  status: "submitted" | "streaming" | "ready" | "error";
  onInputChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatComposer({
  input,
  status,
  onInputChange,
  onSubmit,
}: ChatComposerProps) {
  const t = useTranslations("Chat");
  const isDisabled = status === "submitted" || status === "streaming";

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isDisabled && input.trim()) {
        onSubmit();
      }
    }
  }

  return (
    <div className="border-t border-border/60 p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isDisabled && input.trim()) {
            onSubmit();
          }
        }}
        className="flex gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          disabled={isDisabled}
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="shrink-0 self-end rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {isDisabled ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
}
