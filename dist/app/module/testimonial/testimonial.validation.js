import z from "zod";
export const createTestimonialZodSchema = z.object({
    name: z.string().min(2).max(180),
    role: z.string().optional(),
    company: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    content: z.string().min(10),
    rating: z.number().int().min(1).max(5).optional(),
    featured: z.boolean().optional(),
    approved: z.boolean().optional(),
    projectId: z.string().optional(),
});
export const updateTestimonialZodSchema = createTestimonialZodSchema.partial();
export const TestimonialValidation = { createTestimonialZodSchema, updateTestimonialZodSchema };
//# sourceMappingURL=testimonial.validation.js.map