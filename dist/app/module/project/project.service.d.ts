export declare const projectService: {
    getAllProjects: (query: Record<string, unknown>) => Promise<{
        data: ({
            category: {
                name: string;
                id: string;
                description: string | null;
                slug: string;
                color: string | null;
                icon: string | null;
            } | null;
            tags: ({
                tag: {
                    name: string;
                    id: string;
                    slug: string;
                };
            } & {
                projectId: string;
                tagId: string;
            })[];
            images: {
                url: string;
                id: string;
                sortOrder: number;
                projectId: string;
                alt: string | null;
            }[];
            skills: ({
                skill: {
                    name: string;
                    id: string;
                    featured: boolean;
                    sortOrder: number;
                    category: import("../../../generated/prisma/enums").SkillGroup;
                    iconUrl: string | null;
                    proficiency: number;
                };
            } & {
                projectId: string;
                skillId: string;
            })[];
        } & {
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProjectById: (id: string) => Promise<{
        category: {
            name: string;
            id: string;
            description: string | null;
            slug: string;
            color: string | null;
            icon: string | null;
        } | null;
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
            };
        } & {
            projectId: string;
            tagId: string;
        })[];
        images: {
            url: string;
            id: string;
            sortOrder: number;
            projectId: string;
            alt: string | null;
        }[];
        skills: ({
            skill: {
                name: string;
                id: string;
                featured: boolean;
                sortOrder: number;
                category: import("../../../generated/prisma/enums").SkillGroup;
                iconUrl: string | null;
                proficiency: number;
            };
        } & {
            projectId: string;
            skillId: string;
        })[];
        testimonials: {
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
        }[];
    } & {
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
    }>;
    createProject: (payload: Record<string, unknown>) => Promise<{
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
    }>;
    updateProject: (id: string, payload: Record<string, unknown>) => Promise<{
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
    }>;
    deleteProject: (id: string) => Promise<{
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
    }>;
};
//# sourceMappingURL=project.service.d.ts.map