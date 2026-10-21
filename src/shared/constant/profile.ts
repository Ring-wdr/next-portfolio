/** Work history, newest first. Copy lives under AboutPage.career.<id>. */
export const Career = [
  { id: "scatterx", period: "2023.05 ~ 2026.05", projectSlug: "xmorse" },
  { id: "sugarbricks", period: "2022.12 ~ 2023.05" },
  { id: "sysware", period: "2021.06 ~ 2022.01" },
] as const;

export const WorkingPrinciples = [
  {
    id: "principle-product",
    titleKey: "principles.product.title",
    descriptionKey: "principles.product.description",
  },
  {
    id: "principle-craft",
    titleKey: "principles.craft.title",
    descriptionKey: "principles.craft.description",
  },
  {
    id: "principle-team",
    titleKey: "principles.team.title",
    descriptionKey: "principles.team.description",
  },
] as const;

export const CoreStrengthKeys = [
  "cleanCode",
  "uiuxDesign",
  "accessibility",
  "performance",
] as const;

export const FocusAreas = [
  {
    id: "focus-react-architecture",
    labelKey: "focus.reactArchitecture",
  },
  {
    id: "focus-design-system",
    labelKey: "focus.designSystem",
  },
  {
    id: "focus-performance",
    labelKey: "focus.performance",
  },
  {
    id: "focus-agent-orchestration",
    labelKey: "focus.agentOrchestration",
  },
] as const;

export const TechCategoryMeta = [
  { category: "Languages", descriptionKey: "categoryDescriptions.languages" },
  {
    category: "Frameworks & Libraries",
    descriptionKey: "categoryDescriptions.frameworksLibraries",
  },
  { category: "Database", descriptionKey: "categoryDescriptions.database" },
  { category: "Styling", descriptionKey: "categoryDescriptions.styling" },
  { category: "Testing", descriptionKey: "categoryDescriptions.testing" },
  { category: "Tools", descriptionKey: "categoryDescriptions.tools" },
  { category: "Backend", descriptionKey: "categoryDescriptions.backend" },
] as const;
