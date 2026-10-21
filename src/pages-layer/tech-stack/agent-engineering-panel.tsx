import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

type AgentEngineeringArtifact = {
  kind: "doc" | "project";
  label: string;
  href: string;
  external?: boolean;
};

type AgentEngineeringCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  verificationLabel: string;
  verificationDescription: string;
  proofLabel: string;
};

type AgentEngineeringPanelProps = {
  results: string[];
  command: string;
  artifacts: AgentEngineeringArtifact[];
  copy: AgentEngineeringCopy;
};

const proofLinkClassName =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 text-sm font-medium transition-colors hover:bg-secondary";

export function AgentEngineeringPanel({
  results,
  command,
  artifacts,
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
        <p className="text-sm leading-7 text-foreground/88 md:text-base">
          {copy.intro}
        </p>
      </div>

      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 marker:text-primary">
        {results.map((result) => (
          <li key={result} className="text-sm leading-7 md:text-base">
            {result}
          </li>
        ))}
      </ul>

      <div
        className="mt-6 max-w-3xl space-y-2 border-t border-border/70 pt-5"
        data-testid="agent-engineering-harness"
      >
        <p className="text-sm font-semibold">{copy.verificationLabel}</p>
        <p className="text-sm text-muted-foreground">
          {copy.verificationDescription}
        </p>
        <code className="block max-w-full overflow-x-auto whitespace-pre rounded-xl border border-border/70 bg-background/88 px-4 py-3 text-[0.8rem] leading-6 text-foreground/86">
          {command}
        </code>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold">{copy.proofLabel}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {artifacts.map((artifact) =>
            artifact.external ? (
              <a
                key={artifact.href}
                href={artifact.href}
                target="_blank"
                rel="noreferrer"
                className={proofLinkClassName}
                data-testid="agent-proof-link"
              >
                <span>{artifact.label}</span>
                <ArrowUpRight size={14} aria-hidden />
              </a>
            ) : (
              <Link
                key={artifact.href}
                href={artifact.href}
                className={proofLinkClassName}
                data-testid="agent-proof-link"
              >
                <span>{artifact.label}</span>
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
