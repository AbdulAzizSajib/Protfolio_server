export declare const categoryService: {
    getAllCategories: (query: Record<string, unknown>) => Promise<{
        data: {
            name: string;
            id: string;
            description: string | null;
            slug: string;
            color: string | null;
            icon: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getCategoryById: (id: string) => Promise<{
        name: string;
        id: string;
        description: string | null;
        slug: string;
        color: string | null;
        icon: string | null;
    }>;
    createCategory: (payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        description: string | null;
        slug: string;
        color: string | null;
        icon: string | null;
    }>;
    updateCategory: (id: string, payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        description: string | null;
        slug: string;
        color: string | null;
        icon: string | null;
    }>;
    deleteCategory: (id: string) => Promise<{
        name: string;
        id: string;
        description: string | null;
        slug: string;
        color: string | null;
        icon: string | null;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map