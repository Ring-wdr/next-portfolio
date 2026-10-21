import { z } from "zod";

export const fitMatchLevels = ["strong", "partial", "gap"] as const;
export type FitMatchLevel = (typeof fitMatchLevels)[number];

// Free models overshoot soft limits (a long evidence line, a fifth question,
// "Strong"); clip and normalize those instead of rejecting the whole report.
const clipped = (max: number) =>
  z.string().trim().transform((value) => value.slice(0, max));

const list = <T extends z.ZodType>(item: T, max: number) =>
  z
    .preprocess(
      (value) => (value == null ? [] : Array.isArray(value) ? value : [value]),
      z.array(item),
    )
    .transform((items) => items.slice(0, max));

const matchLevel = z.preprocess(
  (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
  z.enum(fitMatchLevels),
);

export const fitRequirementSchema = z.object({
  requirement: z.string().trim().min(1).transform((value) => value.slice(0, 200)),
  match: matchLevel,
  evidence: z.preprocess((value) => value ?? "", clipped(600)),
  projectSlugs: list(z.string(), 4),
});

export const fitReportSchema = z.object({
  summary: z.string().trim().min(1).transform((value) => value.slice(0, 800)),
  requirements: list(fitRequirementSchema, 12).refine(
    (requirements) => requirements.length > 0,
    "at least one requirement",
  ),
  gaps: list(clipped(300), 6),
  questions: list(clipped(300), 5),
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

/** What the model has finished writing so far. */
export type FitPartialReport = {
  summary?: string;
  requirements: FitRequirement[];
};

/**
 * One line of the NDJSON stream /api/fit sends once input checks pass, so the
 * page can show the report as the model writes it.
 */
export type FitStreamEvent =
  | { type: "progress"; partial: FitPartialReport }
  | { type: "retry" }
  | { type: "done"; report: FitReport }
  | { type: "error"; error: "unavailable" | "invalid_output" };

export const FIT_STREAM_CONTENT_TYPE = "application/x-ndjson; charset=utf-8";
