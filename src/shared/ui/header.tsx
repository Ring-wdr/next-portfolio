"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { resumeHref } from "@/shared/constant/contact";
import { siteConfig } from "@/shared/constant/site";
import { classNames } from "@/shared/utils/classnames";
import { GithubIcon, LinkedinIcon } from "./icon/brand";
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./theme-toggle";

const iconButtonClassName =
	"flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-secondary";

export function Header() {
	const t = useTranslations("Header");
	const tFooter = useTranslations("Footer");
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigationItems = [
		{ href: "/project", label: t("projects") },
		{ href: "/fit", label: t("fit") },
		{ href: "/tech-stack", label: t("techStack") },
		{ href: "/about", label: t("about") },
	] as const;

	const isCurrent = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;

		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isMobileMenuOpen]);

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-background"
			>
				{t("skipToContent")}
			</a>
			<div className="section-shell flex h-16 items-center justify-between gap-4">
				<Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="Manjoong Kim">
					<span
						aria-hidden
						className="type-display flex h-9 w-9 items-center justify-center rounded-lg bg-cobalt text-[0.8rem] text-on-cobalt"
					>
						MK
					</span>
					<span aria-hidden className="type-display hidden text-sm sm:inline">
						Manjoong Kim
					</span>
				</Link>

				<nav aria-label={t("mainNavigation")} className="hidden items-center gap-1 md:flex">
					{navigationItems.map((item) => {
						const current = isCurrent(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={current ? "page" : undefined}
								className={classNames(
									"inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-bold transition-colors",
									current
										? "bg-butter text-on-block"
										: "text-foreground/72 hover:text-foreground",
								)}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-0.5">
					<LanguageToggle />
					<ModeToggle className="rounded-full" />
					{resumeHref && (
						<a
							href={resumeHref}
							target="_blank"
							rel="noopener noreferrer"
							className="ml-1 hidden min-h-11 items-center gap-1 rounded-full px-3 text-sm font-bold transition-colors hover:bg-secondary lg:inline-flex"
						>
							{t("resume")}
							<ArrowUpRight size={14} aria-hidden />
						</a>
					)}
					<Link
						href="/contact"
						aria-current={isCurrent("/contact") ? "page" : undefined}
						className="ml-1 hidden min-h-11 items-center rounded-full bg-cobalt px-5 text-sm font-bold text-on-cobalt transition-transform hover:-translate-y-0.5 md:inline-flex"
					>
						{t("contact")}
					</Link>
					<button
						type="button"
						className={classNames(iconButtonClassName, "md:hidden")}
						aria-expanded={isMobileMenuOpen}
						aria-controls="mobile-navigation-drawer"
						aria-label={isMobileMenuOpen ? t("closeMenu") : t("menu")}
						onClick={() => setIsMobileMenuOpen((open) => !open)}
					>
						{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Full cobalt sheet under the bar; the list is set in display type like the hero */}
			<nav
				id="mobile-navigation-drawer"
				aria-label={t("menuTitle")}
				hidden={!isMobileMenuOpen}
				className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-cobalt text-on-cobalt md:hidden"
			>
				<div className="section-shell flex min-h-full flex-col gap-8 py-8">
					<ul className="flex flex-col">
						{[...navigationItems, { href: "/contact", label: t("contact") }].map((item) => {
							const current = isCurrent(item.href);
							return (
								<li key={item.href} className="border-b border-on-cobalt/20">
									<Link
										href={item.href}
										aria-current={current ? "page" : undefined}
										className={classNames(
											"type-display flex min-h-16 items-center justify-between text-3xl",
											current ? "text-butter" : "text-on-cobalt",
										)}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{item.label}
										<ArrowUpRight size={22} aria-hidden />
									</Link>
								</li>
							);
						})}
					</ul>
					<div className="mt-auto flex flex-wrap gap-2">
						{resumeHref && (
							<a
								href={resumeHref}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-11 items-center rounded-full bg-on-cobalt px-5 text-sm font-bold text-cobalt"
							>
								{t("resume")}
							</a>
						)}
						<a
							href={siteConfig.social.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-on-cobalt/40 px-5 text-sm font-bold"
						>
							<GithubIcon width={16} height={16} aria-hidden />
							{tFooter("github")}
						</a>
						<a
							href={siteConfig.social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-on-cobalt/40 px-5 text-sm font-bold"
						>
							<LinkedinIcon width={16} height={16} aria-hidden />
							{tFooter("linkedin")}
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}
