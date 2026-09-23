import { z } from "zod";

export const fitMatchLevels = ["strong", "partial", "gap"] as const;
export type FitMatchLevel = (typeof fitMatchLevels)[number];

export const fitRequirementSchema = z.object({
  requirement: z.string().min(1).max(200),
  match: z.enum(fitMatchLevels),
  evidence: z.string().max(600).default(""),
  projectSlugs: z.array(z.string()).max(4).default([]),
});

export const fitReportSchema = z.object({
  summary: z.string().min(1).max(800),
  requirements: z.array(fitRequirementSchema).min(1).max(12),
  gaps: z.array(z.string().max(300)).max(6).default([]),
  questions: z.array(z.string().max(300)).max(5).default([]),
});

export type FitRequirement = z.infer<typeof fitRequirementSchema>;
export type FitReport = z.infer<typeof fitReportSchema>;

export const FIT_JD_MIN_LENGTH = 80;
export const FIT_JD_MAX_LENGTH = 8000;

/**
 * Coverage computed from the per-requirement verdicts rather than asking the
 * model for a score, so the headline number is traceable to the rows below it.
 */
export function summarizeCoverage(requirements: FitRequirement[]) {
  const counts = { strong: 0, partial: 0, gap: 0 };
  for (const requirement of requirements) {
    counts[requirement.match] += 1;
  }
  const total = requirements.length;
  const coverage =
    total === 0 ? 0 : Math.round(((counts.strong + counts.partial * 0.5) / total) * 100);
  return { ...counts, total, coverage };
}

export type FitApiResponse =
  | { ok: true; report: FitReport }
  | { ok: false; error: "invalid_input" | "unavailable" | "invalid_output" };
