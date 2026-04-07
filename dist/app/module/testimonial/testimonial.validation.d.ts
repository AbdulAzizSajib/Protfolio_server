import z from "zod";
export declare const createTestimonialZodSchema: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    rating: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
    approved: z.ZodOptional<z.ZodBoolean>;
    projectId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTestimonialZodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    company: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    approved: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    projectId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const TestimonialValidation: {
    createTestimonialZodSchema: z.ZodObject<{
        name: z.ZodString;
        role: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        avatarUrl: z.ZodOptional<z.ZodString>;
        content: z.ZodString;
        rating: z.ZodOptional<z.ZodNumber>;
        featured: z.ZodOptional<z.ZodBoolean>;
        approved: z.ZodOptional<z.ZodBoolean>;
        projectId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    updateTestimonialZodSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        company: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        content: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        approved: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        projectId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=testimonial.validation.d.ts.map