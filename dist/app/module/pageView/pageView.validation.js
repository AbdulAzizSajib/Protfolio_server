import z from "zod";
export const createPageViewZodSchema = z.object({
    path: z.string().min(1).max(500),
    referrer: z.string().optional(),
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    country: z.string().optional(),
});
export const PageViewValidation = { createPageViewZodSchema };
//# sourceMappingURL=pageView.validation.js.map