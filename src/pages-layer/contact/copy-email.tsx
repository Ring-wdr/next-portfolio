"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
	const t = useTranslations("ContactPage");
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard can be blocked; the address is still visible to copy by hand.
		}
	}

	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
		>
			{copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
			<span aria-live="polite">{copied ? t("copied") : t("copyEmail")}</span>
		</button>
	);
}
