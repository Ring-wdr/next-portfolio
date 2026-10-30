"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = () => {
    const nextLocale = locale === "ko" ? "en" : "ko";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold transition-colors hover:bg-secondary"
      aria-label={`Switch to ${locale === "ko" ? "English" : "한국어"}`}
    >
      {locale === "ko" ? "EN" : "KO"}
    </button>
  );
}
