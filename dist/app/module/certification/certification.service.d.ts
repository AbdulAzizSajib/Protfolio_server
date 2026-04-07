export declare const certificationService: {
    getAllCertifications: (query: Record<string, unknown>) => Promise<{
        data: {
            name: string;
            id: string;
            issuer: string;
            issueDate: Date;
            expiryDate: Date | null;
            credentialId: string | null;
            credentialUrl: string | null;
            badgeUrl: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getCertificationById: (id: string) => Promise<{
        name: string;
        id: string;
        issuer: string;
        issueDate: Date;
        expiryDate: Date | null;
        credentialId: string | null;
        credentialUrl: string | null;
        badgeUrl: string | null;
    }>;
    createCertification: (payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        issuer: string;
        issueDate: Date;
        expiryDate: Date | null;
        credentialId: string | null;
        credentialUrl: string | null;
        badgeUrl: string | null;
    }>;
    updateCertification: (id: string, payload: Record<string, unknown>) => Promise<{
        name: string;
        id: string;
        issuer: string;
        issueDate: Date;
        expiryDate: Date | null;
        credentialId: string | null;
        credentialUrl: string | null;
        badgeUrl: string | null;
    }>;
    deleteCertification: (id: string) => Promise<{
        name: string;
        id: string;
        issuer: string;
        issueDate: Date;
        expiryDate: Date | null;
        credentialId: string | null;
        credentialUrl: string | null;
        badgeUrl: string | null;
    }>;
};
//# sourceMappingURL=certification.service.d.ts.map