"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const cookie_1 = require("../utils/cookie");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../lib/prisma");
const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const sessionToken = cookie_1.CookieUtils.getCookie(req, "better-auth.session_token");
        if (!sessionToken) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access! No session token provided.");
        }
        const session = await prisma_1.prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true },
        });
        if (!session || session.expiresAt <= new Date()) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access! Invalid or expired session.");
        }
        const userRole = session.user.role;
        if (authRoles.length > 0 && !authRoles.includes(userRole)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Forbidden access! You do not have permission to access this resource.");
        }
        req.user = {
            userId: session.user.id,
            email: session.user.email,
            role: userRole,
        };
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map