"use client";

import { useFormStatus } from "react-dom";
import { classNames } from "@/shared/utils/classnames";

export function FormButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={classNames(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "h-10 px-4 py-2",
        className
      )}
      disabled={pending}
      {...props}
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}
