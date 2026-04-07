import { User } from "../../../generated/prisma/client";
import { ICreateAdmin } from "./user.interface";
export declare const userService: {
    createAdmin: (payload: ICreateAdmin) => Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
        emailVerified: boolean;
    }>;
    updateProfile: (userId: string, payload: {
        name?: string;
        phone?: string;
    }, file?: Express.Multer.File) => Promise<User>;
    getMyDashboard: (userId: string) => Promise<{
        user: {
            profile: {
                id: string;
                userId: string;
                github: string | null;
                twitter: string | null;
                linkedin: string | null;
                tagline: string | null;
                bio: string | null;
                avatarUrl: string | null;
                resumeUrl: string | null;
                location: string | null;
                website: string | null;
                available: boolean;
                youtube: string | null;
                dribbble: string | null;
                behance: string | null;
                metaTitle: string | null;
                metaDescription: string | null;
            } | null;
        } & {
            name: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            emailVerified: boolean;
            image: string | null;
            role: import("../../../generated/prisma/enums").Role;
            phone: string | null;
            password: string | null;
        };
        counts: {
            projects: number;
            featuredProjects: number;
            testimonials: number;
            approvedTestimonials: number;
            contactMessages: number;
            unreadContactMessages: number;
            posts: number;
        };
        profile: {
            id: string;
            userId: string;
            github: string | null;
            twitter: string | null;
            linkedin: string | null;
            tagline: string | null;
            bio: string | null;
            avatarUrl: string | null;
            resumeUrl: string | null;
            location: string | null;
            website: string | null;
            available: boolean;
            youtube: string | null;
            dribbble: string | null;
            behance: string | null;
            metaTitle: string | null;
            metaDescription: string | null;
        } | null;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map