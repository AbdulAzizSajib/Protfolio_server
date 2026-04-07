import z from "zod";

export const createCertificationZodSchema = z.object({
  name: z.string().min(2).max(200),
  issuer: z.string().min(2).max(200),
  issueDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  badgeUrl: z.string().url().optional(),
});

export const updateCertificationZodSchema = createCertificationZodSchema.partial();
export const CertificationValidation = { createCertificationZodSchema, updateCertificationZodSchema };
