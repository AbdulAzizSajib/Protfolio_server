import z from "zod";
const optionalUrlField = z
    .union([z.url(), z.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value));
export const createExperienceZodSchema = z.object({
    company: z.string().min(2).max(180),
    role: z.string().min(2).max(180),
    description: z.string().optional(),
    logoUrl: optionalUrlField,
    companyUrl: optionalUrlField,
    employmentType: z.string().max(180).optional(),
    locationType: z.enum(["REMOTE", "ONSITE", "HYBRID"]).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
    current: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
});
export const updateExperienceZodSchema = createExperienceZodSchema.partial();
export const ExperienceValidation = { createExperienceZodSchema, updateExperienceZodSchema };
//# sourceMappingURL=experience.validation.js.map