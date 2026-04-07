export declare const pageViewService: {
    getAllPageViews: (query: Record<string, unknown>) => Promise<{
        data: {
            path: string;
            id: string;
            createdAt: Date;
            userAgent: string | null;
            ip: string | null;
            referrer: string | null;
            country: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getPageViewById: (id: string) => Promise<{
        path: string;
        id: string;
        createdAt: Date;
        userAgent: string | null;
        ip: string | null;
        referrer: string | null;
        country: string | null;
    }>;
    createPageView: (payload: Record<string, unknown>) => Promise<{
        path: string;
        id: string;
        createdAt: Date;
        userAgent: string | null;
        ip: string | null;
        referrer: string | null;
        country: string | null;
    }>;
    deletePageView: (id: string) => Promise<{
        path: string;
        id: string;
        createdAt: Date;
        userAgent: string | null;
        ip: string | null;
        referrer: string | null;
        country: string | null;
    }>;
};
//# sourceMappingURL=pageView.service.d.ts.map