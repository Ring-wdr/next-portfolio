import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { contactEmail } from "@/shared/constant/contact";
import { siteConfig } from "@/shared/constant/site";

const linkClassName =
	"inline-flex min-h-11 items-center gap-1.5 font-bold transition-opacity hover:opacity-70";

export function Footer() {
	const t = useTranslations("Footer");
	const tHeader = useTranslations("Header");

	return (
		<footer className="mt-auto bg-ink pb-24 text-white md:pb-0 dark:bg-card dark:text-foreground">
			<div className="section-shell flex flex-col gap-10 py-12 md:py-16">
				<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<div className="@container min-w-0 flex-1">
						<p className="type-display display-fit-xl">
							<span className="block">Manjoong</span>{" "}
							<span className="block">Kim</span>
						</p>
					</div>
					<nav aria-label={t("linksLabel")} className="grid grid-cols-2 gap-x-10 text-sm md:text-base">
						<Link href="/project" className={linkClassName}>
							{tHeader("projects")}
						</Link>
						<a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={linkClassName}>
							{t("github")}
							<ArrowUpRight size={14} aria-hidden />
						</a>
						<Link href="/about" className={linkClassName}>
							{tHeader("about")}
						</Link>
						<a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClassName}>
							{t("linkedin")}
							<ArrowUpRight size={14} aria-hidden />
						</a>
						<Link href="/contact" className={linkClassName}>
							{tHeader("contact")}
						</Link>
						<a href={`mailto:${contactEmail}`} className={linkClassName}>
							{t("email")}
						</a>
					</nav>
				</div>
				<div className="flex flex-col gap-1 border-t border-white/16 pt-6 text-xs text-white/64 sm:flex-row sm:justify-between dark:border-border dark:text-muted-foreground">
					<p>
						© {new Date().getFullYear()} Manjoong Kim. {t("allRightsReserved")}
					</p>
					<p>{t("builtWith")}</p>
				</div>
			</div>
		</footer>
	);
}
