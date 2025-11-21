"use client";

import { ViewTransition } from "@/shared/ui/view-transition";

type RouteTransitionProps = {
  children: React.ReactNode;
};

export function RouteTransition({ children }: RouteTransitionProps) {
  return (
    <ViewTransition
      name="route"
      default="vt-route"
      enter="vt-route"
      exit="vt-route"
      update="vt-route"
      share="vt-route"
    >
      {children}
    </ViewTransition>
  );
}
