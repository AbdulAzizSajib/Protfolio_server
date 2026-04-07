import z from "zod";

export const createContactMessageZodSchema = z.object({
  name: z.string().min(2).max(180),
  email: z.email(),
  subject: z.string().max(250).optional(),
  message: z.string().min(10),
});

export const updateContactMessageZodSchema = z.object({
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED", "SPAM"]),
});

export const ContactMessageValidation = { createContactMessageZodSchema, updateContactMessageZodSchema };
