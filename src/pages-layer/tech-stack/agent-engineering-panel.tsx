import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

type AgentEngineeringArtifact = {
  kind: "doc" | "project" | "repo";
  label: string;
  href: string;
  external?: boolean;
};

type AgentEngineeringEntry = {
  name: string;
  tools: string[];
  claim: string;
  workflow: string;
  codexRole: string;
  claudeRole: string;
  contract: string;
  verification: string;
  artifacts: AgentEngineeringArtifact[];
};

type AgentHarnessStep = {
  title: string;
  description: string;
  command?: string;
};

type AgentEngineeringCopy = {
  eyebrow: string;
  title: string;
  description: string;
  claimLabel: string;
  workflowLabel: string;
  codexLabel: string;
  claudeLabel: string;
  contractLabel: string;
  verificationLabel: string;
  proofLabel: string;
  harnessEyebrow: string;
  harnessTitle: string;
  harnessDescription: string;
  commandLabel: string;
};

type AgentEngineeringPanelProps = {
  entries: AgentEngineeringEntry[];
  harnessSteps: AgentHarnessStep[];
  copy: AgentEngineeringCopy;
};

export function AgentEngineeringPanel({
  entries,
  harnessSteps,
  copy,
}: AgentEngineeringPanelProps) {
  return (
    <section
      className="glass-panel rounded-3xl p-6 md:p-8"
      data-testid="agent-engineering-section"
    >
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          {copy.eyebrow}
        </p>
        <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
          {copy.title}
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          {copy.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {entries.map((entry) => (
          <article
            key={entry.name}
            className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-[0_18px_40px_-32px_color-mix(in_oklch,var(--color-primary),transparent_38%)]"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {entry.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.03em]">
                {entry.name}
              </h3>
              <div className="space-y-4 border-t border-border/70 pt-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {copy.claimLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/88">
                    {entry.claim}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {copy.workflowLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {entry.workflow}
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                      {copy.codexLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {entry.codexRole}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                      {copy.claudeLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {entry.claudeRole}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {copy.contractLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {entry.contract}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {copy.verificationLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {entry.verification}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {copy.proofLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.artifacts.map((artifact) =>
                      artifact.external ? (
                        <a
                          key={`${entry.name}-${artifact.href}`}
                          href={artifact.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                          data-testid="agent-proof-link"
                        >
                          <span>{artifact.label}</span>
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <Link
                          key={`${entry.name}-${artifact.href}`}
                          href={artifact.href}
                          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                          data-testid="agent-proof-link"
                        >
                          <span>{artifact.label}</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="relative mt-8 overflow-hidden rounded-[2.15rem] border border-border/70 bg-[linear-gradient(155deg,color-mix(in_oklch,var(--color-surface),transparent_4%)_0%,color-mix(in_oklch,var(--color-surface),var(--color-primary)_7%)_100%)] p-5 shadow-[0_28px_80px_-68px_color-mix(in_oklch,var(--color-primary),transparent_8%)] md:p-6"
        data-testid="agent-engineering-harness"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--color-highlight),transparent_80%),transparent_64%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start">
          <div className="max-w-[34rem] space-y-3 lg:pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
              {copy.harnessEyebrow}
            </p>
            <h3 className="max-w-[12ch] text-xl font-semibold tracking-[-0.03em] md:text-2xl">
              {copy.harnessTitle}
            </h3>
            <p className="text-sm leading-6 text-foreground/72 md:text-base">
              {copy.harnessDescription}
            </p>
          </div>

          <ol className="relative space-y-0">
            {harnessSteps.map((step, index) => {
              const isVerificationStep = index === 2;
              const stepNumber = `${index + 1}`.padStart(2, "0");

              return (
                <li
                  key={step.title}
                  className="relative grid gap-4 border-t border-border/60 py-5 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[auto_minmax(0,1fr)] md:gap-5"
                >
                  <div className="relative flex items-start gap-4 md:min-h-[9.5rem] md:flex-col md:gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/88 text-[0.7rem] font-semibold tracking-[0.24em] text-muted-foreground"
                      aria-hidden="true"
                    >
                      {stepNumber}
                    </span>
                    {index < harnessSteps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[1.35rem] top-11 h-[calc(100%+1.6rem)] w-px bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-primary),transparent_58%)_0%,color-mix(in_oklch,var(--color-border),transparent_10%)_100%)] md:left-[1.35rem] md:top-[2.9rem]"
                      />
                    )}
                  </div>

                  <div
                    className={[
                      "space-y-3",
                      isVerificationStep
                        ? "rounded-[1.5rem] border border-border/70 bg-background/62 px-4 py-4 shadow-[0_18px_50px_-42px_color-mix(in_oklch,var(--color-primary),transparent_16%)]"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="space-y-2">
                      <h4 className="text-base font-semibold tracking-[-0.02em] text-foreground md:text-[1.05rem]">
                        {step.title}
                      </h4>
                      <p className="max-w-2xl text-sm leading-6 text-foreground/74">
                        {step.description}
                      </p>
                    </div>

                    {step.command && (
                      <div className="space-y-2">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {copy.commandLabel}
                        </p>
                        <code className="block overflow-x-auto rounded-full border border-border/70 bg-background/88 px-4 py-3 text-[0.74rem] leading-6 text-foreground/86">
                          {step.command}
                        </code>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
