import { useTranslations } from "next-intl";

import {
  AgentProofArtifacts,
  AgentResultKeys,
  agentVerificationCommand,
} from "@/shared/constant/agent-engineering";
import { TechStack, TechStackCategory } from "@/shared/constant/tech-stack";
import { TechCategoryMeta } from "@/shared/constant/profile";

import { AgentEngineeringPanel } from "./agent-engineering-panel";

export function TechStackPage() {
  const t = useTranslations("TechStackPage");
  const agentEngineeringCopy = {
    eyebrow: t("agentEngineering.eyebrow"),
    title: t("agentEngineering.title"),
    intro: t("agentEngineering.intro"),
    verificationLabel: t("agentEngineering.verificationLabel"),
    verificationDescription: t("agentEngineering.verificationDescription"),
    proofLabel: t("agentEngineering.proofLabel"),
  };

  const stats = [
    { label: t("stats.totalTech"), value: `${TechStack.length}`, color: "bg-butter" },
    { label: t("stats.categories"), value: `${TechStackCategory.length}`, color: "bg-mint" },
    { label: t("stats.primaryTrack"), value: "Frontend", color: "bg-tangerine" },
  ] as const;
  const methodTags = [
    t("methodTags.architecture"),
    t("methodTags.designSystem"),
    t("methodTags.performance"),
    t("methodTags.collaboration"),
  ];

  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-hero-bg text-hero-fg">
        <div className="section-shell flex flex-col gap-6 pt-10 pb-10 md:pt-14 md:pb-14">
          <h1 className="type-display text-[clamp(2.75rem,9vw,7rem)]">{t("title")}</h1>
          <p className="max-w-3xl text-sm leading-6 text-on-cobalt/84 md:text-base md:leading-7">
            {t("description")}
          </p>
        </div>
      </section>

      <div className="section-shell flex w-full flex-col gap-3 pt-3 pb-14 md:pb-20">
        <dl className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} flex flex-col justify-between gap-6 rounded-[1.75rem] p-4 text-on-block md:p-6`}
            >
              <dt className="text-xs font-bold md:text-sm">{stat.label}</dt>
              <dd className="type-display text-[clamp(1.25rem,3.6vw,3rem)]">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <section className="flex flex-col gap-4 rounded-[2rem] bg-card p-6 md:flex-row md:items-start md:gap-10 md:p-8">
          <h2 className="kicker shrink-0 text-primary md:w-48">{t("methodTitle")}</h2>
          <div className="flex flex-col gap-4">
            <p className="max-w-3xl text-base leading-7">{t("methodDescription")}</p>
            <ul className="flex flex-wrap gap-2">
              {methodTags.map((tag) => (
                <li key={tag} className="rounded-full bg-background px-4 py-2 text-sm font-bold">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AgentEngineeringPanel
          results={AgentResultKeys.map((key) => t(key))}
          command={agentVerificationCommand}
          artifacts={AgentProofArtifacts.map((artifact) => ({
            ...artifact,
            label: t(artifact.labelKey),
          }))}
          copy={agentEngineeringCopy}
        />

        <div className="mt-11 flex flex-col">
          {TechStackCategory.map((category) => {
            const categoryDescription = TechCategoryMeta.find(
              (item) => item.category === category,
            );
            const stacks = TechStack.filter((tech) =>
              tech.category.some((_category) => _category === category),
            );

            return (
              <section
                key={category}
                className="grid grid-cols-1 gap-5 border-t-2 border-foreground py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <h2 className="text-2xl type-heading md:text-3xl">{t(category)}</h2>
                  {categoryDescription && (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {t(categoryDescription.descriptionKey)}
                    </p>
                  )}
                </div>

                <ul className="flex min-w-0 flex-wrap content-start gap-2">
                  {stacks.map((tech) => (
                    <li
                      key={tech.name}
                      className="inline-flex h-12 items-center gap-2.5 rounded-full bg-card pr-5 pl-2 text-sm font-bold"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background [&_svg]:h-4 [&_svg]:w-4">
                        {tech.icon}
                      </span>
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
