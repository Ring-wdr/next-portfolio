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
        className="mt-8 rounded-[2rem] border border-border/70 bg-background/55 p-5 md:p-6"
        data-testid="agent-engineering-harness"
      >
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            {copy.harnessEyebrow}
          </p>
          <h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
            {copy.harnessTitle}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground md:text-base">
            {copy.harnessDescription}
          </p>
        </div>

        <ol className="mt-6 grid gap-3 lg:grid-cols-4">
          {harnessSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border/70 bg-card/70 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {`0${index + 1}`}
              </p>
              <h4 className="mt-3 text-base font-semibold tracking-[-0.02em]">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
              {step.command && (
                <div className="mt-4 space-y-2">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {copy.commandLabel}
                  </p>
                  <code className="block overflow-x-auto rounded-2xl border border-border/70 bg-background/80 px-3 py-2 text-[0.72rem] leading-5 text-foreground/88">
                    {step.command}
                  </code>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
