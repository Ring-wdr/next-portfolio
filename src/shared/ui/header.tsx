"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { classNames } from "@/shared/utils/classnames";
import LogoImage from "../../../public/ms-icon-150x150.png";
import { GithubIcon, LinkedinIcon } from "./icon/brand";
import { LanguageToggle } from "./language-toggle";

export function Header() {
	const t = useTranslations("Header");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigationItems = [
		{ href: "/project", label: t("projects") },
		{ href: "/tech-stack", label: t("techStack") },
		{ href: "/about", label: t("about") },
		{ href: "/contact", label: t("contact") },
	] as const;

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
			<div className="section-shell mx-auto flex items-center justify-between gap-4 py-3">
				<Link href="/" className="flex items-center gap-2.5">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/70">
						<Image src={LogoImage} alt="logo" width={22} height={22} />
					</div>
					<h2 className="text-base font-semibold md:text-lg">{t("portfolio")}</h2>
				</Link>

				<div className="flex flex-1 items-center justify-end gap-2 md:gap-6">
					<div className="hidden items-center gap-6 md:flex">
						{navigationItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
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
						<button
							type="button"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
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
					className={classNames(
						"fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity",
						isMobileMenuOpen ? "opacity-100" : "opacity-0",
					)}
					aria-label={t("closeMenu")}
					onClick={() => setIsMobileMenuOpen(false)}
				/>
				<nav
					id="mobile-navigation-drawer"
					aria-label={t("menu")}
					className={classNames(
						"glass-panel fixed inset-x-4 top-[4.75rem] z-50 rounded-2xl border border-border/70 p-4 shadow-2xl transition-all",
						isMobileMenuOpen
							? "translate-y-0 opacity-100"
							: "-translate-y-2 opacity-0",
					)}
				>
					<div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
						<p className="text-sm font-semibold">{t("menu")}</p>
						<button
							type="button"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
							aria-label={t("closeMenu")}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<X size={18} />
						</button>
					</div>
					<div className="mt-3 flex flex-col gap-2">
						{navigationItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-secondary"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
					</div>
				</nav>
			</div>
		</header>
	);
}
