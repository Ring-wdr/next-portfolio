import { Link } from "@/i18n/routing";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icon/brand";
import { ModeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manjoong Kim. {t("allRightsReserved")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t("builtWith")}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Ring-wdr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon width={18} height={18} />
            </Link>
            <Link
              href="https://linkedin.com/in/dust-shooter-408560340/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <LinkedinIcon width={18} height={18} />
            </Link>
            <Link
              href="mailto:akswnd55@gmail.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
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
