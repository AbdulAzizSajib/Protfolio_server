import z from "zod";

const optionalUrlField = z
  .union([z.url(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value));

export const upsertAboutZodSchema = z.object({
  title: z.string().max(180).optional(),
  subtitle: z.string().max(220).optional(),
  description: z.string().optional(),
  yearsOfExperience: z.number().nonnegative().optional(),
  projectsCompleted: z.number().int().nonnegative().optional(),
  clientsWorkedWith: z.number().int().nonnegative().optional(),
  imageUrl: optionalUrlField,
  resumeUrl: optionalUrlField,
});

export const AboutValidation = {
  upsertAboutZodSchema,
};
