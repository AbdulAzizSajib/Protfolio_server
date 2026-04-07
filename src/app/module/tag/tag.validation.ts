import z from "zod";

export const createTagZodSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(120),
});

export const updateTagZodSchema = createTagZodSchema.partial();

export const TagValidation = { createTagZodSchema, updateTagZodSchema };
