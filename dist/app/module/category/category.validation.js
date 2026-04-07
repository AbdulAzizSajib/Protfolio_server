import z from "zod";
export const createCategoryZodSchema = z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(2).max(120),
    description: z.string().optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
});
export const updateCategoryZodSchema = createCategoryZodSchema.partial();
export const CategoryValidation = {
    createCategoryZodSchema,
    updateCategoryZodSchema,
};
//# sourceMappingURL=category.validation.js.map