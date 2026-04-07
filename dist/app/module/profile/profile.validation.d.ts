import z from "zod";
export declare const updateProfileZodSchema: z.ZodObject<{
    tagline: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    website: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    available: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    github: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    linkedin: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    twitter: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    youtube: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    dribbble: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    behance: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const ProfileValidation: {
    updateProfileZodSchema: z.ZodObject<{
        tagline: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        website: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        available: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
        github: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        linkedin: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        twitter: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        youtube: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        dribbble: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        behance: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodURL, z.ZodLiteral<"">]>>, z.ZodTransform<string | undefined, string | undefined>>;
        metaTitle: z.ZodOptional<z.ZodString>;
        metaDescription: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
//# sourceMappingURL=profile.validation.d.ts.map