import { Fragment } from "react";
import { useTranslations } from "next-intl";

import {
  AgentHarnessSteps,
  getAgentSkillEntries,
} from "@/shared/constant/agent-engineering";
import {
  getTechStackShowcaseEntries,
  TechStack,
  TechStackCategory,
} from "@/shared/constant/tech-stack";
import { TechCategoryMeta } from "@/shared/constant/profile";

import { AgentEngineeringPanel } from "./agent-engineering-panel";
import {
  TechStackShowcasePanel,
  TechCategoryDemoPanel,
  ShowcaseStack,
} from "./tech-stack-showcase";

export function TechStackPage() {
  const t = useTranslations("TechStackPage");
  const showcaseStacks = getTechStackShowcaseEntries().map((stack) => ({
    name: stack.name,
    demo:
      stack.demo.kind === "code"
        ? {
            ...stack.demo,
            summary: t(stack.demo.summaryKey),
            improvement: t(stack.demo.improvementKey),
          }
        : {
            ...stack.demo,
            summary: t(stack.demo.summaryKey),
            improvement: t(stack.demo.improvementKey),
            detail: t(stack.demo.detailKey),
          },
  }));
  const showcaseCopy = {
    eyebrow: t("showcase.eyebrow"),
    title: t("showcase.title"),
    description: t("showcase.description"),
    selectLabel: t("showcase.selectLabel"),
    beforeLabel: t("showcase.before"),
    afterLabel: t("showcase.after"),
    whatChanged: t("showcase.whatChanged"),
    narrativeLabel: t("showcase.narrativeLabel"),
    loading: t("showcase.loading"),
  };
  const categoryDemoCopy = {
    beforeLabel: t("showcase.before"),
    afterLabel: t("showcase.after"),
    whatChanged: t("showcase.whatChanged"),
    narrativeLabel: t("showcase.narrativeLabel"),
    loading: t("showcase.loading"),
  };
  const agentEngineeringEntries = getAgentSkillEntries().map((entry) => ({
    name: t(entry.nameKey),
    tools: entry.tools,
    claim: t(entry.claimKey),
    workflow: t(entry.workflowKey),
    codexRole: t(entry.codexRoleKey),
    claudeRole: t(entry.claudeRoleKey),
    contract: t(entry.contractKey),
    verification: t(entry.verificationKey),
    artifacts: entry.artifacts.map((artifact) => ({
      ...artifact,
      label: t(artifact.labelKey),
    })),
  }));
  const agentHarnessSteps = AgentHarnessSteps.map((step) => ({
    title: t(step.titleKey),
    description: t(step.descriptionKey),
    command: step.command,
  }));
  const agentEngineeringCopy = {
    eyebrow: t("agentEngineering.eyebrow"),
    title: t("agentEngineering.title"),
    description: t("agentEngineering.description"),
    claimLabel: t("agentEngineering.labels.claim"),
    workflowLabel: t("agentEngineering.labels.workflow"),
    codexLabel: t("agentEngineering.labels.codex"),
    claudeLabel: t("agentEngineering.labels.claude"),
    contractLabel: t("agentEngineering.labels.contract"),
    verificationLabel: t("agentEngineering.labels.verification"),
    proofLabel: t("agentEngineering.labels.proof"),
    harnessEyebrow: t("agentEngineering.harness.eyebrow"),
    harnessTitle: t("agentEngineering.harness.title"),
    harnessDescription: t("agentEngineering.harness.description"),
    commandLabel: t("agentEngineering.harness.commandLabel"),
  };

  return (
    <main className="flex flex-1 justify-center py-6 md:py-10">
      <div className="section-shell flex w-full flex-col gap-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(145deg,color-mix(in_oklch,var(--color-surface),transparent_4%)_0%,color-mix(in_oklch,var(--color-surface),var(--color-highlight)_8%)_100%)] px-6 py-8 shadow-[0_34px_90px_-72px_color-mix(in_oklch,var(--color-primary),transparent_24%)] md:px-8 md:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--color-highlight),transparent_82%),transparent_58%)] lg:block" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_17rem] lg:items-end">
            <div className="space-y-5">
              <p className="editorial-kicker text-primary/80">
                {showcaseCopy.eyebrow}
              </p>
              <h1 className="max-w-[10ch] text-[clamp(3rem,7vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.06em]">
                {t("title")}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-foreground/84 md:text-lg">
                {t("description")}
              </p>
              <div className="grid gap-6 border-t border-border/70 pt-6 sm:grid-cols-3">
                <div className="space-y-1 border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("stats.totalTech")}
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">
                    {TechStack.length}
                  </p>
                </div>
                <div className="space-y-1 border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("stats.categories")}
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">
                    {TechStackCategory.length}
                  </p>
                </div>
                <div className="space-y-1 border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("stats.primaryTrack")}
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">
                    Frontend
                  </p>
                </div>
              </div>
            </div>

            <aside className="space-y-4 border-t border-border/70 pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("methodTitle")}
              </p>
              <p className="text-sm leading-6 text-muted-foreground md:text-base">
                {t("methodDescription")}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.72rem] font-medium">
                  {t("methodTags.architecture")}
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.72rem] font-medium">
                  {t("methodTags.designSystem")}
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.72rem] font-medium">
                  {t("methodTags.performance")}
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.72rem] font-medium">
                  {t("methodTags.collaboration")}
                </span>
              </div>
            </aside>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] px-5 py-6 md:px-7 md:py-8">
          <TechStackShowcasePanel stacks={showcaseStacks} copy={showcaseCopy} />
        </section>

        <AgentEngineeringPanel
          entries={agentEngineeringEntries}
          harnessSteps={agentHarnessSteps}
          copy={agentEngineeringCopy}
        />

        {TechStackCategory.map((category) => {
          const categoryDescription = TechCategoryMeta.find(
            (item) => item.category === category,
          );
          const stacks = TechStack.filter((tech) =>
            tech.category.some((_category) => _category === category),
          );
          const categoryDemoStacks = showcaseStacks.filter((s) =>
            TechStack.find((tech) => tech.name === s.name)?.category.includes(
              category,
            ),
          ) as ShowcaseStack[];

          return (
            <Fragment key={category}>
              <section className="grid gap-6 border-t border-border/70 pt-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div className="space-y-3 lg:pr-4">
                  <h2 className="text-xl font-semibold md:text-2xl">
                    {t(category)}
                  </h2>
                  {categoryDescription && (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {t(categoryDescription.descriptionKey)}
                    </p>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="grid gap-6 md:grid-cols-2">
                    {stacks.slice(0, 2).map((tech) => (
                      <article
                        key={tech.name}
                        className="border-t border-border/70 pt-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground">
                            {tech.icon}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold tracking-[-0.03em]">
                              {tech.name}
                            </h3>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {stacks.length > 2 && (
                    <div className="flex flex-wrap gap-2">
                      {stacks.slice(2).map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-2 text-sm font-medium"
                        >
                          <span className="flex h-5 w-5 items-center justify-center text-foreground">
                            {tech.icon}
                          </span>
                          <span>{tech.name}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {categoryDemoStacks.length > 0 && (
                    <TechCategoryDemoPanel
                      stacks={categoryDemoStacks}
                      copy={categoryDemoCopy}
                    />
                  )}
                </div>
              </section>
            </Fragment>
          );
        })}
      </div>
    </main>
  );
}
