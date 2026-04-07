export declare const tagService: {
    getAllTags: (query: Record<string, unknown>) => Promise<{
        data: {
            name: string;
            id: string;
            slug: string;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getTagById: (id: string) => Promise<{
        name: string;
        id: string;
        slug: string;
    }>;
    createTag: (payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        slug: string;
    }>;
    updateTag: (id: string, payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        slug: string;
    }>;
    deleteTag: (id: string) => Promise<{
        name: string;
        id: string;
        slug: string;
    }>;
};
//# sourceMappingURL=tag.service.d.ts.map