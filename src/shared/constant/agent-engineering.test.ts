import { describe, expect, it } from "vitest";
import {
  AgentHarnessSteps,
  AgentSkillEntries,
  agentEngineeringDocPath,
  agentEngineeringDocUrl,
  agentEngineeringProjectHref,
} from "./agent-engineering";
import { projectDetailList } from "./project-detail";
import { buildRepositoryBlobUrl, repositoryConfig } from "./repository";

describe("agent engineering constants", () => {
  it("keeps every public claim attached to at least one proof artifact", () => {
    for (const entry of AgentSkillEntries) {
      expect(entry.artifacts.length).toBeGreaterThan(0);
      expect(entry.claimKey).toBeTruthy();
      expect(entry.workflowKey).toBeTruthy();
      expect(entry.contractKey).toBeTruthy();
      expect(entry.verificationKey).toBeTruthy();
    }
  });

  it("keeps linked project slugs aligned with published case studies", () => {
    const knownSlugs = new Set(
      projectDetailList.map((project) => project.slug),
    );

    for (const entry of AgentSkillEntries) {
      if (entry.projectSlug) {
        expect(knownSlugs.has(entry.projectSlug)).toBe(true);
        const projectArtifact = entry.artifacts.find(
          (artifact) => artifact.kind === "project",
        );

        expect(projectArtifact?.href).toBe(`/project/${entry.projectSlug}`);
      }
    }
  });

  it("points the markdown proof artifact at the canonical repo document url", () => {
    expect(agentEngineeringDocUrl).toBe(
      buildRepositoryBlobUrl(agentEngineeringDocPath),
    );
    expect(agentEngineeringDocUrl).toBe(
      `${repositoryConfig.url}/blob/${repositoryConfig.defaultBranch}/${agentEngineeringDocPath}`,
    );
    expect(agentEngineeringProjectHref).toBe("/project/react-devtool-cli");
  });

  it("defines the four-step harness expected by the proof section", () => {
    expect(AgentHarnessSteps).toHaveLength(4);
    expect(AgentHarnessSteps.map((step) => step.id)).toEqual([
      "brief",
      "surface",
      "verification",
      "proof",
    ]);
  });
});
