import z from "zod";
export declare const createContactMessageZodSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    subject: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
}, z.core.$strip>;
export declare const updateContactMessageZodSchema: z.ZodObject<{
    status: z.ZodEnum<{
        UNREAD: "UNREAD";
        READ: "READ";
        REPLIED: "REPLIED";
        ARCHIVED: "ARCHIVED";
        SPAM: "SPAM";
    }>;
}, z.core.$strip>;
export declare const ContactMessageValidation: {
    createContactMessageZodSchema: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        subject: z.ZodOptional<z.ZodString>;
        message: z.ZodString;
    }, z.core.$strip>;
    updateContactMessageZodSchema: z.ZodObject<{
        status: z.ZodEnum<{
            UNREAD: "UNREAD";
            READ: "READ";
            REPLIED: "REPLIED";
            ARCHIVED: "ARCHIVED";
            SPAM: "SPAM";
        }>;
    }, z.core.$strip>;
};
//# sourceMappingURL=contactMessage.validation.d.ts.map