import z from "zod";

export const createEducationZodSchema = z.object({
  institution: z.string().min(2).max(180),
  degree: z.string().min(2).max(180),
  field: z.string().optional(),
  logoUrl: z.string().url().optional(),
  grade: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const updateEducationZodSchema = createEducationZodSchema.partial();
export const EducationValidation = { createEducationZodSchema, updateEducationZodSchema };
