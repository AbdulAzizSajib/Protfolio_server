import z from "zod";
export const createPageViewZodSchema = z.object({
    path: z.string().min(1).max(500),
    referrer: z.string().optional(),
    userAgent: z.string().optional(),
    eventType: z.string().min(1).max(80).optional(),
    section: z.string().max(150).optional(),
});
export const PageViewValidation = { createPageViewZodSchema };
//# sourceMappingURL=pageView.validation.js.map