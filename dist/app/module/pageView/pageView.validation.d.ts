import z from "zod";
export declare const createPageViewZodSchema: z.ZodObject<{
    path: z.ZodString;
    referrer: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    eventType: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const PageViewValidation: {
    createPageViewZodSchema: z.ZodObject<{
        path: z.ZodString;
        referrer: z.ZodOptional<z.ZodString>;
        userAgent: z.ZodOptional<z.ZodString>;
        eventType: z.ZodOptional<z.ZodString>;
        section: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
//# sourceMappingURL=pageView.validation.d.ts.map