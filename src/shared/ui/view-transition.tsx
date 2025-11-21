"use client";

import React from "react";

type ViewTransitionProps = {
  children?: React.ReactNode;
  name?: string;
  default?: string | Record<string, string>;
  enter?: string | Record<string, string>;
  exit?: string | Record<string, string>;
  share?: string | Record<string, string>;
  update?: string | Record<string, string>;
  onEnter?: (...args: any[]) => void;
  onExit?: (...args: any[]) => void;
  onShare?: (...args: any[]) => void;
  onUpdate?: (...args: any[]) => void;
};

const NativeViewTransition =
  (React as typeof React & { ViewTransition?: React.ComponentType<any> })
    .ViewTransition;

export function ViewTransition(props: ViewTransitionProps) {
  if (NativeViewTransition) {
    return <NativeViewTransition {...props} />;
  }

  const { children, name = "auto", default: defaultClass } = props;

  if (!React.isValidElement(children)) {
    return <>{children}</>;
  }

  const mergedStyle: React.CSSProperties & {
    viewTransitionClass?: string;
  } = {
    ...(children.props.style ?? {}),
  };

  const viewNames = [
    name,
    typeof defaultClass === "string" ? defaultClass : null,
  ]
    .filter(Boolean)
    .join(", ");

  mergedStyle.viewTransitionName = viewNames || "auto";

  if (typeof defaultClass === "string") {
    mergedStyle.viewTransitionClass = defaultClass;
  }

  return React.cloneElement(children, {
    style: mergedStyle,
  });
}
