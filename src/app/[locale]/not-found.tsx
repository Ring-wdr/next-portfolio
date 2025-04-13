"use client";

import { useTranslations } from "next-intl";
import * as stylex from "@stylexjs/stylex";
import clsx from "clsx";

const notFoundStyle = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3 * 16,
    gap: 3 * 16,
  },
  title: {
    fontSize: 20,
  },
  icon: {
    fontSize: 10,
  },
});

export default function NotFound() {
  const t = useTranslations("not-found");
  const iconStyle = stylex.props(notFoundStyle.icon);
  return (
    <div {...stylex.props(notFoundStyle.base)}>
      <h2 {...stylex.props(notFoundStyle.title)}>{t("title")}</h2>
      <i
        {...iconStyle}
        className={clsx("ri-error-warning-fill", iconStyle.className)}
      />
      <p>{t("content")}</p>
    </div>
  );
}
