import { z } from "zod";

export const chatPersonas = ["recruiter", "engineer", "collaborator"] as const;
export type ChatPersona = (typeof chatPersonas)[number];

/** Where the visitor is asking from; sent with every chat request. */
export const chatContextSchema = z.object({
  locale: z.enum(["ko", "en"]).optional(),
  persona: z.enum(chatPersonas).optional(),
  projectSlug: z.string().max(80).optional(),
});

export type ChatContext = z.infer<typeof chatContextSchema>;

export function parseChatContext(value: unknown): ChatContext {
  const result = chatContextSchema.safeParse(value);
  return result.success ? result.data : {};
}
