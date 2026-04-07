import z from "zod";
export declare const createCertificationZodSchema: z.ZodObject<{
    name: z.ZodString;
    issuer: z.ZodString;
    issueDate: z.ZodString;
    expiryDate: z.ZodOptional<z.ZodString>;
    credentialId: z.ZodOptional<z.ZodString>;
    credentialUrl: z.ZodOptional<z.ZodString>;
    badgeUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCertificationZodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    issuer: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    expiryDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    credentialId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    credentialUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    badgeUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const CertificationValidation: {
    createCertificationZodSchema: z.ZodObject<{
        name: z.ZodString;
        issuer: z.ZodString;
        issueDate: z.ZodString;
        expiryDate: z.ZodOptional<z.ZodString>;
        credentialId: z.ZodOptional<z.ZodString>;
        credentialUrl: z.ZodOptional<z.ZodString>;
        badgeUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    updateCertificationZodSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        issuer: z.ZodOptional<z.ZodString>;
        issueDate: z.ZodOptional<z.ZodString>;
        expiryDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        credentialId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        credentialUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        badgeUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=certification.validation.d.ts.map