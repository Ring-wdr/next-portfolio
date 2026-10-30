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
  "inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-bold transition-colors hover:bg-white hover:text-ink dark:bg-background dark:hover:bg-foreground dark:hover:text-background";

export function AgentEngineeringPanel({
  results,
  command,
  artifacts,
  copy,
}: AgentEngineeringPanelProps) {
  return (
    <section
      className="rounded-[2rem] bg-ink p-6 text-white md:p-9 dark:bg-card dark:text-foreground"
      data-testid="agent-engineering-section"
    >
      <div className="max-w-3xl space-y-3">
        <p className="kicker text-tangerine">
          {copy.eyebrow}
        </p>
        <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] type-heading">
          {copy.title}
        </h2>
        <p className="text-sm leading-7 opacity-80 md:text-base">
          {copy.intro}
        </p>
      </div>

      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 marker:text-tangerine">
        {results.map((result) => (
          <li key={result} className="text-sm leading-7 md:text-base">
            {result}
          </li>
        ))}
      </ul>

      <div
        className="mt-6 max-w-3xl space-y-2 border-t border-white/14 pt-5 dark:border-border"
        data-testid="agent-engineering-harness"
      >
        <p className="text-sm font-bold">{copy.verificationLabel}</p>
        <p className="text-sm opacity-72">
          {copy.verificationDescription}
        </p>
        <code className="block max-w-full overflow-x-auto whitespace-pre rounded-2xl bg-white/8 px-4 py-3 font-mono text-[0.8rem] leading-6 dark:bg-background">
          {command}
        </code>
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold">{copy.proofLabel}</p>
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
