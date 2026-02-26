"use client";

import type { ComponentProps, MouseEvent } from "react";
import { startTransition, useCallback } from "react";
import { Link as I18nLink, useRouter } from "@/i18n/routing";

type TransitionLinkProps = ComponentProps<typeof I18nLink>;

export function TransitionLink({
	href,
	children,
	onClick,
	...props
}: TransitionLinkProps) {
	const router = useRouter();
	const handleClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			onClick?.(e);

			if (
				e.defaultPrevented ||
				e.button !== 0 ||
				e.metaKey ||
				e.altKey ||
				e.ctrlKey ||
				e.shiftKey
			) {
				return;
			}
			e.preventDefault();
			const navigate = () => {
				startTransition(() => {
					const hrefString = href.toString();
					router.push(hrefString);
				});
			};

			const shouldAnimateTransition =
				typeof window.matchMedia === "function" &&
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
				(!(typeof navigator.hardwareConcurrency === "number") ||
					navigator.hardwareConcurrency > 2);

			if (
				typeof document !== "undefined" &&
				"startViewTransition" in document &&
				shouldAnimateTransition
			) {
				document.startViewTransition(navigate);
			} else {
				navigate();
			}
		},
		[href, onClick, router],
	);

	return (
		<I18nLink href={href} onClick={handleClick} {...props}>
			{children}
		</I18nLink>
	);
}
