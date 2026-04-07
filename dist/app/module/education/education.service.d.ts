export declare const educationService: {
    getAllEducations: (query: Record<string, unknown>) => Promise<{
        data: {
            id: string;
            description: string | null;
            startDate: Date;
            endDate: Date | null;
            logoUrl: string | null;
            current: boolean;
            institution: string;
            degree: string;
            field: string | null;
            grade: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getEducationById: (id: string) => Promise<{
        id: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        logoUrl: string | null;
        current: boolean;
        institution: string;
        degree: string;
        field: string | null;
        grade: string | null;
    }>;
    createEducation: (payload: Record<string, unknown>) => Promise<{
        id: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        logoUrl: string | null;
        current: boolean;
        institution: string;
        degree: string;
        field: string | null;
        grade: string | null;
    }>;
    updateEducation: (id: string, payload: Record<string, unknown>) => Promise<{
        id: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        logoUrl: string | null;
        current: boolean;
        institution: string;
        degree: string;
        field: string | null;
        grade: string | null;
    }>;
    deleteEducation: (id: string) => Promise<{
        id: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        logoUrl: string | null;
        current: boolean;
        institution: string;
        degree: string;
        field: string | null;
        grade: string | null;
    }>;
};
//# sourceMappingURL=education.service.d.ts.map