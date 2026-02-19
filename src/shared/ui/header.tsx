import Image from "next/image";
import { useTranslations } from "next-intl";

import LogoImage from "../../../public/ms-icon-150x150.png";
import { LinkedinIcon, GithubIcon } from "./icon/brand";
import { Link } from "@/i18n/routing";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="section-shell mx-auto flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="glass-panel flex h-9 w-9 items-center justify-center rounded-xl">
            <Image src={LogoImage} alt="logo" width={22} height={22} />
          </div>
          <h2 className="text-base font-semibold md:text-lg">
            {t("portfolio")}
          </h2>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-6">
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/project"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("projects")}
            </Link>
            <Link
              href="/tech-stack"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("techStack")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="glass-panel flex items-center gap-1 rounded-xl px-1.5 py-1">
            <LanguageToggle />
            <Link
              href="https://github.com/Ring-wdr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon width={18} height={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/dust-shooter-408560340/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
