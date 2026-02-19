import { Link } from "@/i18n/routing";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icon/brand";
import { ModeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border/70 py-8">
      <div className="section-shell mx-auto">
        <div className="glass-panel flex flex-col items-center justify-between gap-5 rounded-2xl px-4 py-5 md:flex-row md:px-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manjoong Kim. {t("allRightsReserved")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/90">{t("builtWith")}</p>
          </div>

          <div className="flex items-center gap-2">
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
    </footer>
  );
}
