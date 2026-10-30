"use client";

import { useFormStatus } from "react-dom";
import { classNames } from "@/shared/utils/classnames";
import { useTranslations } from "next-intl";

export function FormButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const t = useTranslations("ContactPage");
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={classNames(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-cobalt text-on-cobalt hover:-translate-y-0.5",
        "h-12 px-6",
        className
      )}
      disabled={pending}
      {...props}
    >
      {pending ? t("sending") : t("send")}
    </button>
  );
}
