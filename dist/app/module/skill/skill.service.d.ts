export declare const skillService: {
    getAllSkills: (query: Record<string, unknown>) => Promise<{
        data: {
            name: string;
            id: string;
            featured: boolean;
            sortOrder: number;
            category: import("../../../generated/prisma/enums").SkillGroup;
            iconUrl: string | null;
            proficiency: number;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getSkillById: (id: string) => Promise<{
        name: string;
        id: string;
        featured: boolean;
        sortOrder: number;
        category: import("../../../generated/prisma/enums").SkillGroup;
        iconUrl: string | null;
        proficiency: number;
    }>;
    createSkill: (payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        featured: boolean;
        sortOrder: number;
        category: import("../../../generated/prisma/enums").SkillGroup;
        iconUrl: string | null;
        proficiency: number;
    }>;
    updateSkill: (id: string, payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        featured: boolean;
        sortOrder: number;
        category: import("../../../generated/prisma/enums").SkillGroup;
        iconUrl: string | null;
        proficiency: number;
    }>;
    deleteSkill: (id: string) => Promise<{
        name: string;
        id: string;
        featured: boolean;
        sortOrder: number;
        category: import("../../../generated/prisma/enums").SkillGroup;
        iconUrl: string | null;
        proficiency: number;
    }>;
};
//# sourceMappingURL=skill.service.d.ts.map