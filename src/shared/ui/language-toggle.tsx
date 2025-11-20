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
      className="flex items-center justify-center h-10 px-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
      aria-label={`Switch to ${locale === "ko" ? "English" : "한국어"}`}
    >
      {locale === "ko" ? "EN" : "KO"}
    </button>
  );
}
