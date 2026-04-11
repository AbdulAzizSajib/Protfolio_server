import z from "zod";
const optionalUrlField = z
    .union([z.url(), z.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value));
export const updateProfileZodSchema = z.object({
    tagline: z.string().max(150).optional(),
    bio: z.string().optional(),
    location: z.string().max(120).optional(),
    website: optionalUrlField,
    available: z.coerce.boolean().optional(),
    github: optionalUrlField,
    linkedin: optionalUrlField,
    twitter: optionalUrlField,
    youtube: optionalUrlField,
    dribbble: optionalUrlField,
    behance: optionalUrlField,
    metaTitle: z.string().max(160).optional(),
    metaDescription: z.string().max(300).optional(),
});
export const ProfileValidation = {
    updateProfileZodSchema,
};
//# sourceMappingURL=profile.validation.js.map