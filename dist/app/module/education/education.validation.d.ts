import z from "zod";
export declare const createEducationZodSchema: z.ZodObject<{
    institution: z.ZodString;
    degree: z.ZodString;
    field: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    grade: z.ZodOptional<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    current: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateEducationZodSchema: z.ZodObject<{
    institution: z.ZodOptional<z.ZodString>;
    degree: z.ZodOptional<z.ZodString>;
    field: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    logoUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    grade: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    current: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const EducationValidation: {
    createEducationZodSchema: z.ZodObject<{
        institution: z.ZodString;
        degree: z.ZodString;
        field: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodString>;
        grade: z.ZodOptional<z.ZodString>;
        startDate: z.ZodString;
        endDate: z.ZodOptional<z.ZodString>;
        current: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    updateEducationZodSchema: z.ZodObject<{
        institution: z.ZodOptional<z.ZodString>;
        degree: z.ZodOptional<z.ZodString>;
        field: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        logoUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        grade: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        current: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=education.validation.d.ts.map