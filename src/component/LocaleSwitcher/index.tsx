"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { clsx } from "clsx";
import styles from "./index.module.css";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <label className={clsx(styles.container)}>
      <p className={styles.paragraph}>{t("label")}</p>
      <select
        className={styles.dropdown}
        defaultValue={locale}
        onChange={onSelectChange}
      >
        {["en", "ko"].map((cur) => (
          <option key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </select>
      <span className={styles.arrow}>⌄</span>
    </label>
  );
}
