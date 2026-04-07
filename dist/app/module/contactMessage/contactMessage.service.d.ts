export declare const contactMessageService: {
    getAllContactMessages: (query: Record<string, unknown>) => Promise<{
        data: {
            name: string;
            subject: string | null;
            email: string;
            id: string;
            createdAt: Date;
            message: string;
            status: import("../../../generated/prisma/enums").MessageStatus;
            ip: string | null;
            readAt: Date | null;
            repliedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getContactMessageById: (id: string) => Promise<{
        name: string;
        subject: string | null;
        email: string;
        id: string;
        createdAt: Date;
        message: string;
        status: import("../../../generated/prisma/enums").MessageStatus;
        ip: string | null;
        readAt: Date | null;
        repliedAt: Date | null;
    }>;
    createContactMessage: (payload: Record<string, unknown>) => Promise<{
        name: string;
        subject: string | null;
        email: string;
        id: string;
        createdAt: Date;
        message: string;
        status: import("../../../generated/prisma/enums").MessageStatus;
        ip: string | null;
        readAt: Date | null;
        repliedAt: Date | null;
    }>;
    updateContactMessageStatus: (id: string, payload: Record<string, unknown>) => Promise<{
        name: string;
        subject: string | null;
        email: string;
        id: string;
        createdAt: Date;
        message: string;
        status: import("../../../generated/prisma/enums").MessageStatus;
        ip: string | null;
        readAt: Date | null;
        repliedAt: Date | null;
    }>;
    deleteContactMessage: (id: string) => Promise<{
        name: string;
        subject: string | null;
        email: string;
        id: string;
        createdAt: Date;
        message: string;
        status: import("../../../generated/prisma/enums").MessageStatus;
        ip: string | null;
        readAt: Date | null;
        repliedAt: Date | null;
    }>;
};
//# sourceMappingURL=contactMessage.service.d.ts.map