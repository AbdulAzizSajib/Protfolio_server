"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const auth_1 = require("../../lib/auth");
const prisma_1 = require("../../lib/prisma");
const token_1 = require("../../utils/token");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const registerUser = async (payload) => {
    const { name, email, password } = payload;
    const data = await auth_1.auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
    });
    if (!data.user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to register user");
    }
    // Don't generate tokens yet — user needs to verify email first
    return {
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            emailVerified: data.user.emailVerified,
        },
        requiresEmailVerification: true,
    };
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    const data = await auth_1.auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });
    if (!data.user.emailVerified) {
        return {
            user: {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                emailVerified: false,
            },
            requiresEmailVerification: true,
        };
    }
    const accessToken = token_1.tokenUtils.getAccessToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        emailVerified: data.user.emailVerified,
    });
    const refreshToken = token_1.tokenUtils.getRefreshToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        emailVerified: data.user.emailVerified,
    });
    return {
        ...data,
        accessToken,
        refreshToken,
    };
};
const getMe = async (user) => {
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: { id: user.userId },
        include: {
            profile: true,
        },
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return isUserExist;
};
const getNewToken = async (refreshToken, sessionToken) => {
    // Try exact match first, then decoded/encoded variants
    let isSessionExits = await prisma_1.prisma.session.findUnique({
        where: { token: sessionToken },
    });
    // Fallback: try decoded version (Google login may URL-encode the token)
    if (!isSessionExits) {
        try {
            const decoded = decodeURIComponent(sessionToken);
            if (decoded !== sessionToken) {
                isSessionExits = await prisma_1.prisma.session.findUnique({
                    where: { token: decoded },
                });
            }
        }
        catch {
            // ignore decode errors
        }
    }
    if (!isSessionExits) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid session token");
    }
    const verifiedRefreshToken = jwt_1.jwtUtils.verifyToken(refreshToken, env_1.envVars.REFRESH_TOKEN_SECRET);
    if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid refresh token");
    }
    const data = verifiedRefreshToken.data;
    const newAccessToken = token_1.tokenUtils.getAccessToken({
        userId: data.userId,
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });
    const newRefreshToken = token_1.tokenUtils.getRefreshToken({
        userId: data.userId,
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });
    const sessionUpdateData = await prisma_1.prisma.session.update({
        where: {
            token: sessionToken,
        },
        data: {
            token: sessionToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            updatedAt: new Date(),
        },
    });
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        sessionToken: sessionUpdateData.token,
    };
};
const changePassword = async (payload, sessionToken) => {
    const session = await auth_1.auth.api.getSession({
        headers: new Headers({
            Cookie: `better-auth.session_token=${sessionToken}`,
        }),
    });
    if (!session) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid session token");
    }
    const { currentPassword, newPassword } = payload;
    const result = await auth_1.auth.api.changePassword({
        body: {
            currentPassword,
            newPassword,
            revokeOtherSessions: true,
        },
        headers: new Headers({
            Cookie: `better-auth.session_token=${sessionToken}`,
        }),
    });
    const accessToken = token_1.tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });
    const refreshToken = token_1.tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });
    return {
        ...result,
        accessToken,
        refreshToken,
    };
};
const logoutUser = async (sessionToken) => {
    const result = await auth_1.auth.api.signOut({
        headers: new Headers({
            Cookie: `better-auth.session_token=${sessionToken}`,
        }),
    });
    return result;
};
const verifyEmail = async (email, otp) => {
    const result = await auth_1.auth.api.verifyEmailOTP({
        body: {
            email,
            otp,
        },
    });
    if (result.status && !result.user.emailVerified) {
        await prisma_1.prisma.user.update({
            where: {
                email,
            },
            data: {
                emailVerified: true,
            },
        });
    }
};
const forgetPassword = async (email) => {
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!isUserExist.emailVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email not verified");
    }
    await auth_1.auth.api.requestPasswordResetEmailOTP({
        body: {
            email,
        },
    });
};
const resetPassword = async (email, otp, newPassword) => {
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!isUserExist.emailVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email not verified");
    }
    await auth_1.auth.api.resetPasswordEmailOTP({
        body: {
            email,
            otp,
            password: newPassword,
        },
    });
    // No extra post-reset user flags in current portfolio schema.
    await prisma_1.prisma.session.deleteMany({
        where: {
            userId: isUserExist.id,
        },
    });
};
const resendOTP = async (email, type) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (type === "email-verification" && user.emailVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email is already verified");
    }
    await auth_1.auth.api.sendVerificationOTP({
        body: {
            email,
            type,
        },
    });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const googleLoginSuccess = async (session) => {
    const accessToken = token_1.tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });
    const refreshToken = token_1.tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.authService = {
    registerUser,
    loginUser,
    getMe,
    getNewToken,
    changePassword,
    logoutUser,
    verifyEmail,
    forgetPassword,
    resetPassword,
    resendOTP,
    googleLoginSuccess,
};
//# sourceMappingURL=auth.service.js.map