"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import { Mail, SlidersHorizontal, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icon/brand";
import { ModeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";

const DEFAULT_FILTER = {
  brightness: 102,
  contrast: 108,
  saturation: 135,
  hue: 0,
};

export function Footer() {
  const t = useTranslations("Footer");

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [brightness, setBrightness] = useState(DEFAULT_FILTER.brightness);
  const [contrast, setContrast] = useState(DEFAULT_FILTER.contrast);
  const [saturation, setSaturation] = useState(DEFAULT_FILTER.saturation);
  const [hue, setHue] = useState(DEFAULT_FILTER.hue);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--page-filter-brightness", `${brightness}%`);
    root.style.setProperty("--page-filter-contrast", `${contrast}%`);
    root.style.setProperty("--page-filter-saturation", `${saturation}%`);
    root.style.setProperty("--page-filter-hue", `${hue}deg`);
  }, [brightness, contrast, saturation, hue]);

  const hasCustomFilter = useMemo(
    () =>
      brightness !== DEFAULT_FILTER.brightness ||
      contrast !== DEFAULT_FILTER.contrast ||
      saturation !== DEFAULT_FILTER.saturation ||
      hue !== DEFAULT_FILTER.hue,
    [brightness, contrast, saturation, hue],
  );

  const resetFilter = () => {
    setBrightness(DEFAULT_FILTER.brightness);
    setContrast(DEFAULT_FILTER.contrast);
    setSaturation(DEFAULT_FILTER.saturation);
    setHue(DEFAULT_FILTER.hue);
  };

  return (
    <footer className="relative mt-auto border-t border-border/70 py-8">
      <div className="section-shell mx-auto">
        <div className="glass-panel flex flex-col items-center justify-between gap-5 rounded-2xl px-4 py-5 md:flex-row md:px-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manjoong Kim.{" "}
              {t("allRightsReserved")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/90">
              {t("builtWith")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSheetOpen(true)}
              className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border/70 bg-background/50 px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Open page filter controls"
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>
            <Link
              href="https://github.com/Ring-wdr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("github")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon width={18} height={18} />
            </Link>
            <Link
              href="https://linkedin.com/in/dust-shooter-408560340/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("linkedin")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon width={18} height={18} />
            </Link>
            <Link
              href="mailto:akswnd55@gmail.com"
              aria-label={t("email")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={18} />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>

      {isSheetOpen && (
        <>
          <button
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setIsSheetOpen(false)}
            aria-label="Close filter sheet"
          />
          <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl rounded-t-2xl border border-border/70 bg-background/90 p-4 shadow-2xl backdrop-blur-md md:left-1/2 md:max-w-2xl md:-translate-x-1/2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Global Backdrop Filter</p>
                <p className="text-xs text-muted-foreground">
                  실시간으로 전체 페이지 필터를 조절합니다.
                </p>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-xs text-muted-foreground">
                <span>Brightness ({brightness}%)</span>
                <input
                  className="w-full accent-primary"
                  type="range"
                  min={70}
                  max={160}
                  value={brightness}
                  onChange={(event) =>
                    setBrightness(Number(event.target.value))
                  }
                />
              </label>
              <label className="space-y-1 text-xs text-muted-foreground">
                <span>Contrast ({contrast}%)</span>
                <input
                  className="w-full accent-primary"
                  type="range"
                  min={70}
                  max={160}
                  value={contrast}
                  onChange={(event) => setContrast(Number(event.target.value))}
                />
              </label>
              <label className="space-y-1 text-xs text-muted-foreground">
                <span>Saturation ({saturation}%)</span>
                <input
                  className="w-full accent-primary"
                  type="range"
                  min={60}
                  max={220}
                  value={saturation}
                  onChange={(event) =>
                    setSaturation(Number(event.target.value))
                  }
                />
              </label>
              <label className="space-y-1 text-xs text-muted-foreground">
                <span>Hue Rotate ({hue}deg)</span>
                <input
                  className="w-full accent-primary"
                  type="range"
                  min={-180}
                  max={180}
                  value={hue}
                  onChange={(event) => setHue(Number(event.target.value))}
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              {hasCustomFilter && (
                <button
                  onClick={resetFilter}
                  className="rounded-lg border border-border/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setIsSheetOpen(false)}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </footer>
  );
}
