import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { siteConfig } from "@/shared/constant/site";

// Free model IDs churn on OpenRouter; override with OPENROUTER_FREE_MODELS
// (comma-separated, first = primary). OpenRouter tries them in order.
export const DEFAULT_FREE_MODELS = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "google/gemma-4-31b-it:free",
] as const;

export function resolveFreeModels(raw: string | undefined): string[] {
  const models = (raw ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);
  return models.length > 0 ? models : [...DEFAULT_FREE_MODELS];
}

export function createFreeModel(apiKey: string, modelsEnv: string | undefined) {
  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer": siteConfig.siteUrl,
      "X-Title": "Kim Manjoong Portfolio Chat",
    },
  });
  const models = resolveFreeModels(modelsEnv);
  return openrouter(models[0], { models });
}
