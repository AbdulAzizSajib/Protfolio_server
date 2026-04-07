import z from "zod";
export declare const createExperienceZodSchema: z.ZodObject<{
    company: z.ZodString;
    role: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    companyUrl: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    employmentType: z.ZodOptional<z.ZodString>;
    locationType: z.ZodOptional<z.ZodEnum<{
        REMOTE: "REMOTE";
        ONSITE: "ONSITE";
        HYBRID: "HYBRID";
    }>>;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    current: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateExperienceZodSchema: z.ZodObject<{
    company: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    logoUrl: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>>;
    companyUrl: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>>;
    employmentType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locationType: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        REMOTE: "REMOTE";
        ONSITE: "ONSITE";
        HYBRID: "HYBRID";
    }>>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    current: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const ExperienceValidation: {
    createExperienceZodSchema: z.ZodObject<{
        company: z.ZodString;
        role: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        companyUrl: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        employmentType: z.ZodOptional<z.ZodString>;
        locationType: z.ZodOptional<z.ZodEnum<{
            REMOTE: "REMOTE";
            ONSITE: "ONSITE";
            HYBRID: "HYBRID";
        }>>;
        startDate: z.ZodString;
        endDate: z.ZodOptional<z.ZodString>;
        current: z.ZodOptional<z.ZodBoolean>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    updateExperienceZodSchema: z.ZodObject<{
        company: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        logoUrl: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>>;
        companyUrl: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>>;
        employmentType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        locationType: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            REMOTE: "REMOTE";
            ONSITE: "ONSITE";
            HYBRID: "HYBRID";
        }>>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        current: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=experience.validation.d.ts.map