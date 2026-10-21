"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { resumeHref } from "@/shared/constant/contact";
import { siteConfig } from "@/shared/constant/site";
import { classNames } from "@/shared/utils/classnames";
import LogoImage from "../../../public/ms-icon-150x150.png";
import { GithubIcon, LinkedinIcon } from "./icon/brand";
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./theme-toggle";

const iconLinkClassName =
	"flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground";

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
		{ href: "/contact", label: t("contact") },
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
		<header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
			>
				{t("skipToContent")}
			</a>
			<div className="section-shell mx-auto flex items-center justify-between gap-4 py-2">
				<Link href="/" className="flex min-h-11 items-center gap-2.5">
					<span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/70">
						<Image src={LogoImage} alt="" width={22} height={22} />
					</span>
					<span className="text-base font-semibold md:text-lg">{t("portfolio")}</span>
				</Link>

				<div className="flex flex-1 items-center justify-end gap-2 md:gap-5">
					<nav aria-label={t("mainNavigation")} className="hidden items-center gap-1 md:flex">
						{navigationItems.map((item) => {
							const current = isCurrent(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									aria-current={current ? "page" : undefined}
									className={classNames(
										"inline-flex min-h-11 items-center rounded-lg px-2.5 text-sm font-medium transition-colors hover:text-foreground",
										current
											? "text-foreground underline decoration-primary decoration-2 underline-offset-8"
											: "text-muted-foreground",
									)}
								>
									{item.label}
								</Link>
							);
						})}
						{resumeHref && (
							<a
								href={resumeHref}
								target="_blank"
								rel="noopener noreferrer"
								className="ml-1 inline-flex min-h-11 items-center rounded-full border border-border/70 px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
							>
								{t("resume")}
							</a>
						)}
					</nav>

					<div className="glass-panel flex items-center gap-0.5 rounded-xl px-1 py-0.5">
						<LanguageToggle />
						<ModeToggle className="h-11 w-11 border-0 bg-transparent shadow-none" />
						<a
							href={siteConfig.social.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={tFooter("github")}
							className={classNames(iconLinkClassName, "hidden sm:flex")}
						>
							<GithubIcon width={18} height={18} aria-hidden />
						</a>
						<a
							href={siteConfig.social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={tFooter("linkedin")}
							className={classNames(iconLinkClassName, "hidden sm:flex")}
						>
							<LinkedinIcon width={18} height={18} aria-hidden />
						</a>
						<button
							type="button"
							className={classNames(iconLinkClassName, "md:hidden")}
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-navigation-drawer"
							aria-label={isMobileMenuOpen ? t("closeMenu") : t("menu")}
							onClick={() => setIsMobileMenuOpen((open) => !open)}
						>
							{isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
						</button>
					</div>
				</div>
			</div>

			<div
				className={classNames(
					"md:hidden",
					isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
				)}
			>
				<button
					type="button"
					tabIndex={isMobileMenuOpen ? 0 : -1}
					className={classNames(
						"fixed inset-0 top-[4.25rem] z-40 bg-black/55 transition-opacity",
						isMobileMenuOpen ? "opacity-100" : "opacity-0",
					)}
					aria-label={t("closeMenu")}
					onClick={() => setIsMobileMenuOpen(false)}
				/>
				<nav
					id="mobile-navigation-drawer"
					aria-label={t("menuTitle")}
					hidden={!isMobileMenuOpen}
					className="fixed inset-x-4 top-[4.75rem] z-50 rounded-2xl border border-border bg-background p-4 shadow-2xl"
				>
					<div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
						<p className="text-sm font-semibold">{t("menuTitle")}</p>
						<button
							type="button"
							className={iconLinkClassName}
							aria-label={t("closeMenu")}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<X size={18} />
						</button>
					</div>
					<div className="mt-3 flex flex-col gap-2">
						{navigationItems.map((item) => {
							const current = isCurrent(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									aria-current={current ? "page" : undefined}
									className={classNames(
										"rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary",
										current
											? "border-primary bg-secondary"
											: "border-border/60 bg-card",
									)}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							);
						})}
						{resumeHref && (
							<a
								href={resumeHref}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
							>
								{t("resume")}
							</a>
						)}
						<div className="mt-1 flex gap-2 sm:hidden">
							<a
								href={siteConfig.social.github}
								target="_blank"
								rel="noopener noreferrer"
								className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card text-sm font-medium"
							>
								<GithubIcon width={16} height={16} aria-hidden />
								{tFooter("github")}
							</a>
							<a
								href={siteConfig.social.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card text-sm font-medium"
							>
								<LinkedinIcon width={16} height={16} aria-hidden />
								{tFooter("linkedin")}
							</a>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}
