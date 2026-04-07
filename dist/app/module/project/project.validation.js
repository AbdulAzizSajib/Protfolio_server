import z from "zod";
export const createProjectZodSchema = z.object({
    title: z.string().min(2).max(200),
    slug: z.string().min(2).max(220),
    description: z.string().min(10),
    content: z.string().optional(),
    coverImage: z.union([z.string().url(), z.literal("")]).optional(),
    liveUrl: z.union([z.string().url(), z.literal("")]).optional(),
    githubUrl: z.union([z.string().url(), z.literal("")]).optional(),
    featured: z.boolean().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    sortOrder: z.number().int().optional(),
    categoryId: z.string().optional(),
    tags: z.array(z.object({ tagId: z.string() })).optional(),
    skills: z.array(z.object({ skillId: z.string() })).optional(),
    images: z.array(z.object({ url: z.string().url(), alt: z.string().optional(), sortOrder: z.number().int().optional() })).optional(),
});
export const updateProjectZodSchema = createProjectZodSchema.partial();
export const ProjectValidation = { createProjectZodSchema, updateProjectZodSchema };
//# sourceMappingURL=project.validation.js.map