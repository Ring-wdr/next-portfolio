import { buildRepositoryBlobUrl } from "./repository";

export type AgentProofArtifact = {
  kind: "doc" | "project";
  labelKey: string;
  href: string;
  external?: boolean;
};

const reactDevtoolCliProjectSlug = "react-devtool-cli" as const;

export const agentEngineeringDocPath = "docs/agent-engineering.md";
export const agentEngineeringDocUrl = buildRepositoryBlobUrl(
  agentEngineeringDocPath,
);
export const agentEngineeringProjectHref = `/project/${reactDevtoolCliProjectSlug}`;

/** Outcome lines shown under the intro, in order (TechStackPage.agentEngineering.results.*). */
export const AgentResultKeys = [
  "agentEngineering.results.travelRecords",
  "agentEngineering.results.devtoolCli",
  "agentEngineering.results.verification",
] as const;

export const agentVerificationCommand =
  "pnpm lint && pnpm test -- --run && pnpm build";

export const AgentProofArtifacts: AgentProofArtifact[] = [
  {
    kind: "project",
    labelKey: "agentEngineering.artifacts.project",
    href: agentEngineeringProjectHref,
  },
  {
    kind: "doc",
    labelKey: "agentEngineering.artifacts.doc",
    href: agentEngineeringDocUrl,
    external: true,
  },
];
