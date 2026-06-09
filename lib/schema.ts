import { z } from "zod";

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const linksSchema = z
  .object({
    live: z.string().optional(),
    repo: z.string().optional(),
    writeup: z.string().optional(),
  })
  .optional();

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  tier: z.enum(["featured", "build"]),
  order: z.number(),
  status: z.enum(["Shipped", "PRD", "Case study", "Building"]),
  summary: z.string().max(160),
  role: z.string(),
  timeframe: z.string(),
  stack: z.array(z.string()),
  tags: z.array(z.string()).default([]),
  metric: metricSchema,
  outcome: z.string(),
  cover: z.string().optional(),
  links: linksSchema,
  featured_order: z.number().optional(),
  draft: z.boolean().default(false),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
};
