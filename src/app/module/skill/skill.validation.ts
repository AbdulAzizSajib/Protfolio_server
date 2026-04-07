import z from "zod";

export const createSkillZodSchema = z.object({
  name: z.string().min(2).max(120),
  iconUrl: z.url().optional(),
  proficiency: z.number().int().min(0).max(100).optional(),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "DESIGN", "MOBILE", "OTHER"]),
  sortOrder: z.number().int().optional(),
  featured: z.boolean().optional(),
});

export const updateSkillZodSchema = createSkillZodSchema.partial();

export const SkillValidation = { createSkillZodSchema, updateSkillZodSchema };
