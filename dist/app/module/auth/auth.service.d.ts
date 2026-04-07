import { IChangePasswordPayload } from "./auth.interface";
import { IRequestUser } from "../../interfaces/requestUser.interface";
interface IRegisterUserPayload {
    name: string;
    email: string;
    password: string;
}
interface ILoginUserPayload {
    email: string;
    password: string;
}
export declare const authService: {
    registerUser: (payload: IRegisterUserPayload) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
        };
        requiresEmailVerification: boolean;
    }>;
    loginUser: (payload: ILoginUserPayload) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
        };
        requiresEmailVerification: boolean;
    } | {
        accessToken: string;
        refreshToken: string;
        redirect: boolean;
        token: string;
        url?: string | undefined;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
            role: string;
            phone: string | null | undefined;
        };
        requiresEmailVerification?: never;
    }>;
    getMe: (user: IRequestUser) => Promise<{
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
    }>;
    getNewToken: (refreshToken: string, sessionToken: string) => Promise<{
        accessToken: string;
        refreshToken: string;
        sessionToken: string;
    }>;
    changePassword: (payload: IChangePasswordPayload, sessionToken: string) => Promise<{
        accessToken: string;
        refreshToken: string;
        token: string | null;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        } & Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    }>;
    logoutUser: (sessionToken: string) => Promise<{
        success: boolean;
    }>;
    verifyEmail: (email: string, otp: string) => Promise<void>;
    forgetPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
    resendOTP: (email: string, type: "email-verification" | "forget-password") => Promise<void>;
    googleLoginSuccess: (session: Record<string, any>) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map