export type AgentProofArtifact = {
  kind: "doc" | "project" | "repo";
  labelKey: string;
  href: string;
  external?: boolean;
};

export type AgentHarnessStep = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  command?: string;
};

export type AgentSkillEntry = {
  id: string;
  nameKey: string;
  tools: string[];
  claimKey: string;
  workflowKey: string;
  codexRoleKey: string;
  claudeRoleKey: string;
  contractKey: string;
  verificationKey: string;
  artifacts: AgentProofArtifact[];
  projectSlug?: string;
};

export const agentEngineeringDocUrl =
  "https://github.com/Ring-wdr/next-portfolio/blob/main/docs/agent-engineering.md";

const proofArtifacts = {
  doc: {
    kind: "doc",
    labelKey: "agentEngineering.artifacts.doc",
    href: agentEngineeringDocUrl,
    external: true,
  },
  project: {
    kind: "project",
    labelKey: "agentEngineering.artifacts.project",
    href: "/project/react-devtool-cli",
  },
} satisfies Record<string, AgentProofArtifact>;

export const AgentSkillEntries: AgentSkillEntry[] = [
  {
    id: "taskDecomposition",
    nameKey: "agentEngineering.items.taskDecomposition.title",
    tools: ["Codex", "Claude Code"],
    claimKey: "agentEngineering.items.taskDecomposition.claim",
    workflowKey: "agentEngineering.items.taskDecomposition.workflow",
    codexRoleKey: "agentEngineering.items.taskDecomposition.codexRole",
    claudeRoleKey: "agentEngineering.items.taskDecomposition.claudeRole",
    contractKey: "agentEngineering.items.taskDecomposition.contract",
    verificationKey: "agentEngineering.items.taskDecomposition.verification",
    artifacts: [proofArtifacts.project, proofArtifacts.doc],
    projectSlug: "react-devtool-cli",
  },
  {
    id: "toolFluency",
    nameKey: "agentEngineering.items.toolFluency.title",
    tools: ["Codex", "Claude Code", "Playwright"],
    claimKey: "agentEngineering.items.toolFluency.claim",
    workflowKey: "agentEngineering.items.toolFluency.workflow",
    codexRoleKey: "agentEngineering.items.toolFluency.codexRole",
    claudeRoleKey: "agentEngineering.items.toolFluency.claudeRole",
    contractKey: "agentEngineering.items.toolFluency.contract",
    verificationKey: "agentEngineering.items.toolFluency.verification",
    artifacts: [proofArtifacts.project, proofArtifacts.doc],
    projectSlug: "react-devtool-cli",
  },
  {
    id: "verificationHarness",
    nameKey: "agentEngineering.items.verificationHarness.title",
    tools: ["Codex", "Claude Code", "Vitest", "Playwright"],
    claimKey: "agentEngineering.items.verificationHarness.claim",
    workflowKey: "agentEngineering.items.verificationHarness.workflow",
    codexRoleKey: "agentEngineering.items.verificationHarness.codexRole",
    claudeRoleKey: "agentEngineering.items.verificationHarness.claudeRole",
    contractKey: "agentEngineering.items.verificationHarness.contract",
    verificationKey: "agentEngineering.items.verificationHarness.verification",
    artifacts: [proofArtifacts.project, proofArtifacts.doc],
    projectSlug: "react-devtool-cli",
  },
];

export const AgentHarnessSteps: AgentHarnessStep[] = [
  {
    id: "brief",
    titleKey: "agentEngineering.harness.steps.brief.title",
    descriptionKey: "agentEngineering.harness.steps.brief.description",
    command: "goal + constraints + acceptance criteria",
  },
  {
    id: "surface",
    titleKey: "agentEngineering.harness.steps.surface.title",
    descriptionKey: "agentEngineering.harness.steps.surface.description",
    command: "AGENTS.md + prompts + repo paths",
  },
  {
    id: "verification",
    titleKey: "agentEngineering.harness.steps.verification.title",
    descriptionKey: "agentEngineering.harness.steps.verification.description",
    command: "pnpm lint && pnpm test -- --run && pnpm build",
  },
  {
    id: "proof",
    titleKey: "agentEngineering.harness.steps.proof.title",
    descriptionKey: "agentEngineering.harness.steps.proof.description",
    command: "docs/agent-engineering.md + project source + tests",
  },
];

export function getAgentSkillEntries() {
  return AgentSkillEntries.filter((entry) => entry.artifacts.length > 0);
}
