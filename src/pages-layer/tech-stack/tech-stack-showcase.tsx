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

function useShowcaseHighlighter(stacks: ShowcaseStack[]) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const [highlighter, setHighlighter] = useState<ShikiHighlighter | null>(null);
  const { resolvedTheme } = useTheme();

  const codeStacks = stacks.filter(
    (
      stack,
    ): stack is ShowcaseStack & {
      demo: ShowcaseCodeDemo;
    } => stack.demo.kind === "code",
  );

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

  return {
    prefersReducedMotion,
    highlighter,
    shikiTheme: resolvedTheme === "light" ? "github-light" : "github-dark",
  };
}

export function TechStackShowcasePanel({
  stacks,
  copy,
}: TechStackShowcasePanelProps) {
  const [selectedStackName, setSelectedStackName] = useState(
    stacks[0]?.name ?? "",
  );
  const [mode, setMode] = useState<Mode>("before");
  const { prefersReducedMotion, highlighter, shikiTheme } =
    useShowcaseHighlighter(stacks);

  const activeStack =
    stacks.find((stack) => stack.name === selectedStackName) ??
    stacks[0] ??
    null;
  const activeCode =
    activeStack == null || activeStack.demo.kind !== "code"
      ? ""
      : mode === "before"
        ? activeStack.demo.beforeCode
        : activeStack.demo.afterCode;

  if (activeStack == null) {
    return null;
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:items-start">
      <aside className="space-y-6 lg:pr-2">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
            {copy.eyebrow}
          </p>
          <h2 className="max-w-[12ch] text-3xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-4xl">
            {copy.title}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground md:text-base">
            {copy.description}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {copy.selectLabel}
          </p>
          <div className="border-t border-border/70">
            {stacks.map((stack) => {
              const isSelected = stack.name === activeStack.name;

              return (
                <button
                  key={stack.name}
                  type="button"
                  className={classNames(
                    "grid w-full grid-cols-[1fr_auto] items-center gap-3 border-b border-border/70 py-3 text-left transition-colors",
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedStackName(stack.name);
                    setMode("before");
                  }}
                >
                  <span className="text-sm font-semibold tracking-[-0.02em]">
                    {stack.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      "text-[0.68rem] font-semibold uppercase tracking-[0.2em]",
                      isSelected ? "text-primary" : "text-muted-foreground/70",
                    )}
                  >
                    {stack.demo.kind === "code" ? "code" : "notes"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section
        data-testid="tech-stack-showcase"
        className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(160deg,color-mix(in_oklch,var(--color-surface),transparent_4%)_0%,color-mix(in_oklch,var(--color-surface),var(--color-primary)_9%)_100%)] p-5 shadow-[0_34px_90px_-72px_color-mix(in_oklch,var(--color-primary),transparent_22%)] md:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--color-highlight),transparent_80%),transparent_62%)]" />
        <div className="relative">
          <div className="flex flex-col gap-5 border-b border-border/70 pb-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 max-w-2xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary/80">
                {activeStack.name}
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/88 md:text-lg">
                {activeStack.demo.summary}
              </p>
            </div>

            {activeStack.demo.kind === "code" && (
              <div className="inline-grid shrink-0 grid-cols-2 rounded-full border border-border/70 bg-background/70 p-1">
                <button
                  type="button"
                  data-testid="tech-stack-mode-before"
                  className={classNames(
                    "rounded-full px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                    mode === "before"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground",
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
                    "rounded-full px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                    mode === "after"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
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
            <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-border/70 bg-background/88">
              {highlighter == null || prefersReducedMotion ? (
                <div className="space-y-3 p-4 md:p-5">
                  {highlighter == null && (
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {copy.loading}
                    </p>
                  )}
                  <pre
                    data-testid="magic-move-code"
                    className="overflow-x-auto text-sm leading-6 text-foreground"
                  >
                    <code>{activeCode}</code>
                  </pre>
                </div>
              ) : (
                <div className="overflow-hidden p-3 md:p-4">
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
            <div className="mt-5 border-t border-border/70 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                {copy.narrativeLabel}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/88 md:text-base">
                {activeStack.demo.detail}
              </p>
            </div>
          )}

          <div className="mt-5 grid gap-3 border-t border-border/70 pt-5 md:grid-cols-[10rem_minmax(0,1fr)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {copy.whatChanged}
            </p>
            <p className="text-sm leading-7 text-foreground/88 md:text-base">
              {activeStack.demo.improvement}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TechCategoryDemoPanel({
  stacks,
  copy,
}: TechCategoryDemoPanelProps) {
  const [selectedStackName, setSelectedStackName] = useState(
    stacks[0]?.name ?? "",
  );
  const [mode, setMode] = useState<Mode>("before");
  const { prefersReducedMotion, highlighter, shikiTheme } =
    useShowcaseHighlighter(stacks);

  const activeStack =
    stacks.find((stack) => stack.name === selectedStackName) ??
    stacks[0] ??
    null;
  const activeCode =
    activeStack == null || activeStack.demo.kind !== "code"
      ? ""
      : mode === "before"
        ? activeStack.demo.beforeCode
        : activeStack.demo.afterCode;

  if (activeStack == null) {
    return null;
  }

  return (
    <div className="mt-5 border-t border-border/70 pt-5">
      {stacks.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {stacks.map((stack) => {
            const isSelected = stack.name === activeStack.name;

            return (
              <Button
                key={stack.name}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className="rounded-full"
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

      <div className="flex flex-col gap-4 border-b border-border/70 pb-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary/80">
            {activeStack.name}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {activeStack.demo.summary}
          </p>
        </div>

        {activeStack.demo.kind === "code" && (
          <div className="inline-grid shrink-0 grid-cols-2 rounded-full border border-border/70 bg-background/70 p-1">
            <button
              type="button"
              className={classNames(
                "rounded-full px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                mode === "before"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={mode === "before"}
              onClick={() => setMode("before")}
            >
              {copy.beforeLabel}
            </button>
            <button
              type="button"
              className={classNames(
                "rounded-full px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                mode === "after"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
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
        <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/85">
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
            <div className="overflow-hidden p-3">
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
        <div className="mt-4 border-t border-border/70 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            {copy.narrativeLabel}
          </p>
          <p className="mt-3 text-sm leading-6 text-foreground/90">
            {activeStack.demo.detail}
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-2 border-t border-border/70 pt-4 md:grid-cols-[9rem_minmax(0,1fr)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {copy.whatChanged}
        </p>
        <p className="text-sm leading-6 text-foreground/90">
          {activeStack.demo.improvement}
        </p>
      </div>
    </div>
  );
}
