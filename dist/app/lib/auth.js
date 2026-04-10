"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const plugins_1 = require("better-auth/plugins");
const prisma_2 = require("./prisma");
const env_1 = require("../config/env");
const enums_1 = require("../../generated/prisma/enums");
const email_1 = require("../utils/email");
exports.auth = (0, better_auth_1.betterAuth)({
    baseURL: env_1.envVars.BETTER_AUTH_URL,
    secret: env_1.envVars.BETTER_AUTH_SECRET,
    database: (0, prisma_1.prismaAdapter)(prisma_2.prisma, {
        provider: "postgresql",
    }),
    plugins: [
        (0, plugins_1.oAuthProxy)(),
        (0, plugins_1.bearer)(),
        (0, plugins_1.emailOTP)({
            overrideDefaultEmailVerification: true,
            async sendVerificationOTP({ email, otp, type }) {
                const user = await prisma_2.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    console.error(`User with email ${email} not found.`);
                    return;
                }
                if (type === "email-verification") {
                    if (user.role === enums_1.Role.OWNER) {
                        console.log(`Owner ${email} - skipping OTP.`);
                        return;
                    }
                    await (0, email_1.sendEmail)({
                        to: email,
                        subject: "Verify Your Email - Portfolio Server",
                        html: `<p>Hello ${user.name},</p><p>Your verification code is <strong>${otp}</strong>.</p><p>This code expires in 2 minutes.</p>`,
                    });
                }
                if (type === "forget-password") {
                    await (0, email_1.sendEmail)({
                        to: email,
                        subject: "Reset Your Password - Portfolio Server",
                        html: `<p>Hello ${user.name},</p><p>Your password reset code is <strong>${otp}</strong>.</p><p>This code expires in 2 minutes.</p>`,
                    });
                }
            },
            expiresIn: 2 * 60, // 2 minutes
            otpLength: 6,
        }),
    ],
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: enums_1.Role.ADMIN,
            },
            phone: {
                type: "string",
                required: false,
                defaultValue: "",
            },
        },
    },
    redirectURLs: {
        signIn: `${env_1.envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_URL || "http://localhost:5000",
        env_1.envVars.FRONTEND_URL,
    ],
    session: {
        expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
        updateAge: 60 * 60 * 60 * 24, // 1 day in seconds
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 60 * 24, // 1 day in seconds
        },
    },
    advanced: {
        useSecureCookies: false,
        cookies: {
            sessionToken: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                    path: "/",
                },
            },
        },
    },
});
//# sourceMappingURL=auth.js.map