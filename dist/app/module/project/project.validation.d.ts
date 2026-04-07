import z from "zod";
export declare const createProjectZodSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
    coverImage: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>;
    liveUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>;
    githubUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>;
    featured: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodOptional<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tagId: z.ZodString;
    }, z.core.$strip>>>;
    skills: z.ZodOptional<z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
    }, z.core.$strip>>>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateProjectZodSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    coverImage: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    liveUrl: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    githubUrl: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        tagId: z.ZodString;
    }, z.core.$strip>>>>;
    skills: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
    }, z.core.$strip>>>>;
    images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export declare const ProjectValidation: {
    createProjectZodSchema: z.ZodObject<{
        title: z.ZodString;
        slug: z.ZodString;
        description: z.ZodString;
        content: z.ZodOptional<z.ZodString>;
        coverImage: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>;
        liveUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>;
        githubUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>;
        featured: z.ZodOptional<z.ZodBoolean>;
        status: z.ZodOptional<z.ZodEnum<{
            ARCHIVED: "ARCHIVED";
            DRAFT: "DRAFT";
            PUBLISHED: "PUBLISHED";
        }>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
        categoryId: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
            tagId: z.ZodString;
        }, z.core.$strip>>>;
        skills: z.ZodOptional<z.ZodArray<z.ZodObject<{
            skillId: z.ZodString;
        }, z.core.$strip>>>;
        images: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            alt: z.ZodOptional<z.ZodString>;
            sortOrder: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    updateProjectZodSchema: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        coverImage: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
        liveUrl: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
        githubUrl: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            ARCHIVED: "ARCHIVED";
            DRAFT: "DRAFT";
            PUBLISHED: "PUBLISHED";
        }>>>;
        startDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            tagId: z.ZodString;
        }, z.core.$strip>>>>;
        skills: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            skillId: z.ZodString;
        }, z.core.$strip>>>>;
        images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            alt: z.ZodOptional<z.ZodString>;
            sortOrder: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=project.validation.d.ts.map