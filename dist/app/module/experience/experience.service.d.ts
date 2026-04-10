export declare const experienceService: {
    getAllExperiences: (query: Record<string, unknown>) => Promise<{
        data: {
            id: string;
            role: string;
            description: string | null;
            sortOrder: number;
            startDate: Date;
            endDate: Date | null;
            company: string;
            logoUrl: string | null;
            companyUrl: string | null;
            employmentType: string | null;
            locationType: import("../../../generated/prisma/enums").LocationType;
            current: boolean;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getExperienceById: (id: string) => Promise<{
        id: string;
        role: string;
        description: string | null;
        sortOrder: number;
        startDate: Date;
        endDate: Date | null;
        company: string;
        logoUrl: string | null;
        companyUrl: string | null;
        employmentType: string | null;
        locationType: import("../../../generated/prisma/enums").LocationType;
        current: boolean;
    }>;
    createExperience: (payload: Record<string, unknown>) => Promise<{
        id: string;
        role: string;
        description: string | null;
        sortOrder: number;
        startDate: Date;
        endDate: Date | null;
        company: string;
        logoUrl: string | null;
        companyUrl: string | null;
        employmentType: string | null;
        locationType: import("../../../generated/prisma/enums").LocationType;
        current: boolean;
    }>;
    updateExperience: (id: string, payload: Record<string, unknown>) => Promise<{
        id: string;
        role: string;
        description: string | null;
        sortOrder: number;
        startDate: Date;
        endDate: Date | null;
        company: string;
        logoUrl: string | null;
        companyUrl: string | null;
        employmentType: string | null;
        locationType: import("../../../generated/prisma/enums").LocationType;
        current: boolean;
    }>;
    deleteExperience: (id: string) => Promise<{
        id: string;
        role: string;
        description: string | null;
        sortOrder: number;
        startDate: Date;
        endDate: Date | null;
        company: string;
        logoUrl: string | null;
        companyUrl: string | null;
        employmentType: string | null;
        locationType: import("../../../generated/prisma/enums").LocationType;
        current: boolean;
    }>;
};
//# sourceMappingURL=experience.service.d.ts.map