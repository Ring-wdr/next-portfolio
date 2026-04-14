import { z } from "zod";

const specElementSchema = z.object({
  type: z.enum(["LinkGroup", "LinkButton"]),
  props: z.record(z.string(), z.unknown()),
  children: z.array(z.string()),
});

export const specDataPartSchema = z.object({
  type: z.literal("flat"),
  spec: z.object({
    root: z.string(),
    elements: z.record(z.string(), specElementSchema),
  }),
});

export type PortfolioSpec = z.infer<typeof specDataPartSchema>["spec"];
