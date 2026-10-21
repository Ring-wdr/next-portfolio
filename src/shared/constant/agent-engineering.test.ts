import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import ko from "../../../messages/ko.json";
import {
  AgentProofArtifacts,
  AgentResultKeys,
  agentEngineeringDocPath,
  agentEngineeringDocUrl,
  agentEngineeringProjectHref,
} from "./agent-engineering";
import { getFixtureProjects } from "../content/fixture-projects";
import { buildRepositoryBlobUrl, repositoryConfig } from "./repository";

function lookup(messages: unknown, path: string) {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      messages,
    );
}

describe("agent engineering constants", () => {
  it("keeps every result line translated in both locales", () => {
    for (const key of AgentResultKeys) {
      expect(lookup(ko.TechStackPage, key)).toEqual(expect.any(String));
      expect(lookup(en.TechStackPage, key)).toEqual(expect.any(String));
    }
  });

  it("keeps the case study link aligned with a published project", () => {
    const knownSlugs = new Set(
      getFixtureProjects().map((project) => `/project/${project.slug}`),
    );
    const projectLinks = AgentProofArtifacts.filter(
      (artifact) => artifact.kind === "project",
    );

    expect(projectLinks.length).toBeGreaterThan(0);
    for (const artifact of projectLinks) {
      expect(knownSlugs.has(artifact.href)).toBe(true);
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
});
