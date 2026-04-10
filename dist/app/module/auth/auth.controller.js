"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const token_1 = require("../../utils/token");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const cookie_1 = require("../../utils/cookie");
const env_1 = require("../../config/env");
const auth_1 = require("../../lib/auth");
const registerUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const result = await auth_service_1.authService.registerUser(payload);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Registration successful. Please verify your email to continue.",
        data: result,
    });
});
const loginUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const result = await auth_service_1.authService.loginUser(payload);
    // Email not verified — don't set tokens, ask for verification
    if ("requiresEmailVerification" in result && result.requiresEmailVerification) {
        (0, sendResponse_1.sendResponse)(res, {
            httpStatusCode: http_status_1.default.OK,
            success: true,
            message: "Email verification required. Please check your inbox.",
            data: result,
        });
        return;
    }
    const loginData = result;
    token_1.tokenUtils.setAccessTokenCookie(res, loginData.accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, loginData.refreshToken);
    token_1.tokenUtils.setBetterAuthSessionCookie(res, loginData.token);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        data: loginData,
    });
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    // const payload = req.body;
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access");
    }
    const result = await auth_service_1.authService.getMe(user);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});
const getNewToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Refresh token is missing");
    }
    if (!betterAuthSessionToken) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Session token is missing");
    }
    const result = await auth_service_1.authService.getNewToken(refreshToken, betterAuthSessionToken);
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
    token_1.tokenUtils.setAccessTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    token_1.tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "New token generated successfully",
        data: {
            accessToken,
            refreshToken: newRefreshToken,
            sessionToken,
            token: sessionToken,
        },
    });
});
const changePassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await auth_service_1.authService.changePassword(payload, betterAuthSessionToken);
    token_1.tokenUtils.setAccessTokenCookie(res, result.accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, result.refreshToken);
    token_1.tokenUtils.setBetterAuthSessionCookie(res, result.token);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
});
const logoutUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await auth_service_1.authService.logoutUser(betterAuthSessionToken);
    cookie_1.CookieUtils.clearCookie(res, "accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    cookie_1.CookieUtils.clearCookie(res, "refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    cookie_1.CookieUtils.clearCookie(res, "better-auth.session_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User logged out successfully",
        data: result,
    });
});
const verifyEmail = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, otp } = req.body;
    await auth_service_1.authService.verifyEmail(email, otp);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Email verified successfully",
    });
});
const forgetPassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email } = req.body;
    await auth_service_1.authService.forgetPassword(email);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset OTP sent to email successfully",
    });
});
const resetPassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    await auth_service_1.authService.resetPassword(email, otp, newPassword);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully",
    });
});
const resendOTP = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, type } = req.body;
    await auth_service_1.authService.resendOTP(email, type || "email-verification");
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "OTP sent successfully. Please check your email.",
    });
});
const googleLogin = (0, catchAsync_1.catchAsync)((req, res) => {
    const redirectPath = req.query.redirect || "/dashboard";
    const encodedRedirectPath = encodeURIComponent(redirectPath);
    const callbackURL = `${env_1.envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
    res.render("googleRedirect", {
        callbackURL: callbackURL,
        betterAuthUrl: env_1.envVars.BETTER_AUTH_URL,
    });
});
const googleLoginSuccess = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const redirectPath = req.query.redirect || "/dashboard";
    const sessionToken = req.cookies["better-auth.session_token"] ||
        req.cookies["__Secure-better-auth.session_token"] ||
        req.cookies["session_token"];
    if (!sessionToken) {
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=oauth_failed`);
    }
    const cookieHeader = req.headers.cookie || "";
    const session = await auth_1.auth.api.getSession({
        headers: {
            Cookie: cookieHeader,
        },
    });
    if (!session) {
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=no_session_found`);
    }
    if (!session.user) {
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=no_user_found`);
    }
    try {
        const result = await auth_service_1.authService.googleLoginSuccess(session);
        const { accessToken, refreshToken } = result;
        const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
        const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
        // Send tokens via URL params — cross-domain cookies don't work reliably
        const params = new URLSearchParams({
            accessToken,
            refreshToken,
            sessionToken: sessionToken || "",
            redirect: finalRedirectPath,
        });
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/auth/google/callback?${params.toString()}`);
    }
    catch (error) {
        console.error("Google Success - Error generating tokens:", error);
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=token_generation_failed`);
    }
});
const handleOAuthError = (0, catchAsync_1.catchAsync)((req, res) => {
    const error = req.query.error || "oauth_failed";
    res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=${error}`);
});
exports.authController = {
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
    googleLogin,
    googleLoginSuccess,
    handleOAuthError,
};
//# sourceMappingURL=auth.controller.js.map