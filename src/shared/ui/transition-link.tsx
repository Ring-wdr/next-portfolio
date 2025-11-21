"use client";

import { Link as I18nLink } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import type { ComponentProps } from "react";

type TransitionLinkProps = ComponentProps<typeof I18nLink>;

export function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if View Transition API is supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      e.preventDefault();

      // Convert href to string path
      const path = typeof href === 'string' ? href : href.pathname || '/';

      // Start view transition
      (document as any).startViewTransition(() => {
        router.push(path);
      });
    }
    // If not supported, let the default link behavior happen
  };

  return (
    <I18nLink href={href} onClick={handleClick} {...props}>
      {children}
    </I18nLink>
  );
}
