"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { createHighlighter } from "shiki";
import { ShikiMagicMove } from "shiki-magic-move/react";

import { Button } from "@/shared/ui/button";
import { classNames } from "@/shared/utils/classnames";

type ShowcaseCodeDemo = {
  kind: "code";
  lang: "ts" | "tsx";
  summary: string;
  improvement: string;
  beforeCode: string;
  afterCode: string;
};

type ShowcaseNarrativeDemo = {
  kind: "narrative";
  summary: string;
  improvement: string;
  detail: string;
};

export type ShowcaseStack = {
  name: string;
  demo: ShowcaseCodeDemo | ShowcaseNarrativeDemo;
};

type ShowcaseCopy = {
  eyebrow: string;
  title: string;
  description: string;
  selectLabel: string;
  beforeLabel: string;
  afterLabel: string;
  whatChanged: string;
  narrativeLabel: string;
  loading: string;
};

type CategoryDemoCopy = Pick<
  ShowcaseCopy,
  "beforeLabel" | "afterLabel" | "whatChanged" | "narrativeLabel" | "loading"
>;

type TechStackShowcasePanelProps = {
  stacks: ShowcaseStack[];
  copy: ShowcaseCopy;
};

type TechCategoryDemoPanelProps = {
  stacks: ShowcaseStack[];
  copy: CategoryDemoCopy;
};

type Mode = "before" | "after";

type ShikiHighlighter = Awaited<ReturnType<typeof createHighlighter>>;

let highlighterPromise: Promise<ShikiHighlighter> | null = null;

function getSharedHighlighter(): Promise<ShikiHighlighter> {
  if (highlighterPromise == null) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["ts", "tsx"],
    });
  }
  return highlighterPromise;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const magicMoveOptions = {
  duration: 1100,
  stagger: 0.18,
  delayMove: 0.12,
  delayEnter: 0.45,
  animateContainer: true,
  lineNumbers: true,
  splitTokens: true,
  enhanceMatching: true,
};

function getMagicMoveKey(stackName: string, theme: string) {
  return `${stackName}:${theme}`;
}

export function TechStackShowcasePanel({
  stacks,
  copy,
}: TechStackShowcasePanelProps) {
  const [selectedStackName, setSelectedStackName] = useState(stacks[0]?.name ?? "");
  const [mode, setMode] = useState<Mode>("before");
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const [highlighter, setHighlighter] = useState<ShikiHighlighter | null>(null);
  const { resolvedTheme } = useTheme();

  const activeStack =
    stacks.find((stack) => stack.name === selectedStackName) ?? stacks[0] ?? null;
  const codeStacks = stacks.filter(
    (stack): stack is ShowcaseStack & { demo: ShowcaseCodeDemo } => stack.demo.kind === "code"
  );
  const activeCode =
    activeStack == null || activeStack.demo.kind !== "code"
      ? ""
      : mode === "before"
        ? activeStack.demo.beforeCode
        : activeStack.demo.afterCode;
  const shikiTheme = resolvedTheme === "light" ? "github-light" : "github-dark";

  useEffect(() => {
    if (codeStacks.length === 0) {
      return;
    }

    let disposed = false;

    getSharedHighlighter().then((instance) => {
      if (!disposed) {
        setHighlighter(instance);
      }
    });

    return () => {
      disposed = true;
    };
  }, [codeStacks.length]);

  if (activeStack == null) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {copy.description}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {copy.selectLabel}
          </p>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {stacks.map((stack) => {
              const isSelected = stack.name === activeStack.name;

              return (
                <Button
                  key={stack.name}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  className="justify-start rounded-xl"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedStackName(stack.name);
                    setMode("before");
                  }}
                >
                  {stack.name}
                </Button>
              );
            })}
          </div>
        </div>
      </aside>

      <section
        data-testid="tech-stack-showcase"
        className="rounded-3xl border border-border/70 bg-card/70 p-4 shadow-[0_24px_60px_-42px_color-mix(in_oklch,var(--color-primary),transparent_42%)] md:p-5"
      >
        <div className="flex flex-col gap-4 border-b border-border/70 pb-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {activeStack.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeStack.demo.summary}
            </p>
          </div>

          {activeStack.demo.kind === "code" && (
            <div className="inline-grid shrink-0 grid-cols-2 rounded-2xl border border-border/70 bg-background/70 p-1">
              <button
                type="button"
                data-testid="tech-stack-mode-before"
                className={classNames(
                  "rounded-xl px-3 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                  mode === "before"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={mode === "before"}
                onClick={() => setMode("before")}
              >
                {copy.beforeLabel}
              </button>
              <button
                type="button"
                data-testid="tech-stack-mode-after"
                className={classNames(
                  "rounded-xl px-3 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                  mode === "after"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={mode === "after"}
                onClick={() => setMode("after")}
              >
                {copy.afterLabel}
              </button>
            </div>
          )}
        </div>

        {activeStack.demo.kind === "code" ? (
          <div className="mt-4 overflow-hidden rounded-2xl border border-border/70">
            {highlighter == null || prefersReducedMotion ? (
              <div className="space-y-3 p-4">
                {highlighter == null && (
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {copy.loading}
                  </p>
                )}
                <pre data-testid="magic-move-code" className="overflow-x-auto text-sm leading-6 text-foreground">
                  <code>{activeCode}</code>
                </pre>
              </div>
            ) : (
              <div className="overflow-hidden p-2 md:p-3">
                <ShikiMagicMove
                  key={getMagicMoveKey(activeStack.name, shikiTheme)}
                  highlighter={highlighter}
                  lang={activeStack.demo.lang}
                  theme={shikiTheme}
                  code={activeCode}
                  options={magicMoveOptions}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-border/70 bg-[color-mix(in_oklch,var(--color-surface-strong),transparent_18%)] p-4">
            <div className="rounded-2xl border border-border/70 bg-background/65 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                {copy.narrativeLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground/90">
                {activeStack.demo.detail}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-border/70 bg-background/55 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {copy.whatChanged}
          </p>
          <p className="mt-3 text-sm leading-6 text-foreground/90">
            {activeStack.demo.improvement}
          </p>
        </div>
      </section>
    </div>
  );
}

export function TechCategoryDemoPanel({
  stacks,
  copy,
}: TechCategoryDemoPanelProps) {
  const [selectedStackName, setSelectedStackName] = useState(stacks[0]?.name ?? "");
  const [mode, setMode] = useState<Mode>("before");
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const [highlighter, setHighlighter] = useState<ShikiHighlighter | null>(null);
  const { resolvedTheme } = useTheme();

  const activeStack =
    stacks.find((stack) => stack.name === selectedStackName) ?? stacks[0] ?? null;
  const codeStacks = stacks.filter(
    (stack): stack is ShowcaseStack & { demo: ShowcaseCodeDemo } => stack.demo.kind === "code"
  );
  const activeCode =
    activeStack == null || activeStack.demo.kind !== "code"
      ? ""
      : mode === "before"
        ? activeStack.demo.beforeCode
        : activeStack.demo.afterCode;
  const shikiTheme = resolvedTheme === "light" ? "github-light" : "github-dark";

  useEffect(() => {
    if (codeStacks.length === 0) {
      return;
    }

    let disposed = false;

    getSharedHighlighter().then((instance) => {
      if (!disposed) {
        setHighlighter(instance);
      }
    });

    return () => {
      disposed = true;
    };
  }, [codeStacks.length]);

  if (activeStack == null) {
    return null;
  }

  return (
    <div className="mt-4 rounded-3xl border border-border/70 bg-card/70 p-4 md:p-5">
      {stacks.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {stacks.map((stack) => {
            const isSelected = stack.name === activeStack.name;

            return (
              <Button
                key={stack.name}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className="rounded-xl"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedStackName(stack.name);
                  setMode("before");
                }}
              >
                {stack.name}
              </Button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-4 border-b border-border/70 pb-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            {activeStack.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {activeStack.demo.summary}
          </p>
        </div>

        {activeStack.demo.kind === "code" && (
          <div className="inline-grid shrink-0 grid-cols-2 rounded-2xl border border-border/70 bg-background/70 p-1">
            <button
              type="button"
              className={classNames(
                "rounded-xl px-3 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                mode === "before"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={mode === "before"}
              onClick={() => setMode("before")}
            >
              {copy.beforeLabel}
            </button>
            <button
              type="button"
              className={classNames(
                "rounded-xl px-3 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                mode === "after"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={mode === "after"}
              onClick={() => setMode("after")}
            >
              {copy.afterLabel}
            </button>
          </div>
        )}
      </div>

      {activeStack.demo.kind === "code" ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-border/70">
          {highlighter == null || prefersReducedMotion ? (
            <div className="space-y-3 p-4">
              {highlighter == null && (
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {copy.loading}
                </p>
              )}
              <pre className="overflow-x-auto text-sm leading-6 text-foreground">
                <code>{activeCode}</code>
              </pre>
            </div>
          ) : (
            <div className="overflow-hidden p-2 md:p-3">
              <ShikiMagicMove
                key={getMagicMoveKey(activeStack.name, shikiTheme)}
                highlighter={highlighter}
                lang={activeStack.demo.lang}
                theme={shikiTheme}
                code={activeCode}
                options={magicMoveOptions}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-border/70 bg-[color-mix(in_oklch,var(--color-surface-strong),transparent_18%)] p-4">
          <div className="rounded-2xl border border-border/70 bg-background/65 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {copy.narrativeLabel}
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/90">
              {activeStack.demo.detail}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-2xl border border-border/70 bg-background/55 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {copy.whatChanged}
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground/90">
          {activeStack.demo.improvement}
        </p>
      </div>
    </div>
  );
}
