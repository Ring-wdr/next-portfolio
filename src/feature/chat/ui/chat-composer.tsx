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
    <div className="border-t border-border p-3">
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
          className="w-full resize-none rounded-2xl border-2 border-transparent bg-card px-3 py-2 text-base text-foreground placeholder:text-muted-foreground md:text-sm focus:border-primary focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="min-h-11 shrink-0 self-end rounded-full bg-tangerine px-4 py-2 text-sm font-bold text-on-block transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {isDisabled ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
}
