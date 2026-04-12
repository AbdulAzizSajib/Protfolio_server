export declare const testimonialService: {
    getAllTestimonials: (query: Record<string, unknown>) => Promise<{
        data: ({
            project: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("../../../generated/prisma/enums").ProjectStatus;
                featured: boolean;
                title: string;
                description: string;
                sortOrder: number;
                slug: string;
                content: string | null;
                coverImage: string | null;
                liveUrl: string | null;
                githubUrl: string | null;
                startDate: Date | null;
                endDate: Date | null;
                viewCount: number;
                categoryId: string | null;
            } | null;
        } & {
            name: string;
            id: string;
            createdAt: Date;
            role: string | null;
            featured: boolean;
            approved: boolean;
            avatarUrl: string | null;
            content: string;
            projectId: string | null;
            company: string | null;
            rating: number | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getTestimonialById: (id: string) => Promise<{
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../../generated/prisma/enums").ProjectStatus;
            featured: boolean;
            title: string;
            description: string;
            sortOrder: number;
            slug: string;
            content: string | null;
            coverImage: string | null;
            liveUrl: string | null;
            githubUrl: string | null;
            startDate: Date | null;
            endDate: Date | null;
            viewCount: number;
            categoryId: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        role: string | null;
        featured: boolean;
        approved: boolean;
        avatarUrl: string | null;
        content: string;
        projectId: string | null;
        company: string | null;
        rating: number | null;
    }>;
    createTestimonial: (payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        role: string | null;
        featured: boolean;
        approved: boolean;
        avatarUrl: string | null;
        content: string;
        projectId: string | null;
        company: string | null;
        rating: number | null;
    }>;
    updateTestimonial: (id: string, payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        role: string | null;
        featured: boolean;
        approved: boolean;
        avatarUrl: string | null;
        content: string;
        projectId: string | null;
        company: string | null;
        rating: number | null;
    }>;
    deleteTestimonial: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        role: string | null;
        featured: boolean;
        approved: boolean;
        avatarUrl: string | null;
        content: string;
        projectId: string | null;
        company: string | null;
        rating: number | null;
    }>;
};
//# sourceMappingURL=testimonial.service.d.ts.map