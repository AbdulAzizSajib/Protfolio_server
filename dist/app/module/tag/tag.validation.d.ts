import z from "zod";
export declare const createTagZodSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, z.core.$strip>;
export declare const updateTagZodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const TagValidation: {
    createTagZodSchema: z.ZodObject<{
        name: z.ZodString;
        slug: z.ZodString;
    }, z.core.$strip>;
    updateTagZodSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
//# sourceMappingURL=tag.validation.d.ts.map