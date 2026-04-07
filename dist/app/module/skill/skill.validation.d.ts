import z from "zod";
export declare const createSkillZodSchema: z.ZodObject<{
    name: z.ZodString;
    iconUrl: z.ZodOptional<z.ZodURL>;
    proficiency: z.ZodOptional<z.ZodNumber>;
    category: z.ZodEnum<{
        FRONTEND: "FRONTEND";
        BACKEND: "BACKEND";
        DATABASE: "DATABASE";
        DEVOPS: "DEVOPS";
        DESIGN: "DESIGN";
        MOBILE: "MOBILE";
        OTHER: "OTHER";
    }>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateSkillZodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    iconUrl: z.ZodOptional<z.ZodOptional<z.ZodURL>>;
    proficiency: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    category: z.ZodOptional<z.ZodEnum<{
        FRONTEND: "FRONTEND";
        BACKEND: "BACKEND";
        DATABASE: "DATABASE";
        DEVOPS: "DEVOPS";
        DESIGN: "DESIGN";
        MOBILE: "MOBILE";
        OTHER: "OTHER";
    }>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const SkillValidation: {
    createSkillZodSchema: z.ZodObject<{
        name: z.ZodString;
        iconUrl: z.ZodOptional<z.ZodURL>;
        proficiency: z.ZodOptional<z.ZodNumber>;
        category: z.ZodEnum<{
            FRONTEND: "FRONTEND";
            BACKEND: "BACKEND";
            DATABASE: "DATABASE";
            DEVOPS: "DEVOPS";
            DESIGN: "DESIGN";
            MOBILE: "MOBILE";
            OTHER: "OTHER";
        }>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
        featured: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    updateSkillZodSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        iconUrl: z.ZodOptional<z.ZodOptional<z.ZodURL>>;
        proficiency: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        category: z.ZodOptional<z.ZodEnum<{
            FRONTEND: "FRONTEND";
            BACKEND: "BACKEND";
            DATABASE: "DATABASE";
            DEVOPS: "DEVOPS";
            DESIGN: "DESIGN";
            MOBILE: "MOBILE";
            OTHER: "OTHER";
        }>>;
        sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=skill.validation.d.ts.map