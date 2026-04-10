"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtUtils = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, options) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, options.expiresIn ? { expiresIn: options.expiresIn } : {});
    return token;
};
const verifyToken = (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return {
            success: true,
            data: decoded,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "An error occurred while verifying the token.",
            error,
        };
    }
};
const decodeToken = (token) => {
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return {
            success: false,
            message: "Failed to decode token.",
        };
    }
    return {
        success: true,
        data: decoded,
    };
};
exports.jwtUtils = {
    createToken,
    verifyToken,
    decodeToken,
};
//# sourceMappingURL=jwt.js.map