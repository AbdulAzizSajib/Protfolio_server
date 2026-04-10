"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const http_status_1 = __importDefault(require("http-status"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVariable = [
        "PORT",
        "NODE_ENV",
        "DATABASE_URL",
        "BETTER_AUTH_SECRET",
        "BETTER_AUTH_URL",
        "ACCESS_TOKEN_SECRET",
        "REFRESH_TOKEN_SECRET",
        "ACCESS_TOKEN_EXPIRES_IN",
        "REFRESH_TOKEN_EXPIRES_IN",
        "EMAIL_SENDER_SMTP_USER",
        "EMAIL_SENDER_SMTP_PASS",
        "EMAIL_SENDER_SMTP_HOST",
        "EMAIL_SENDER_SMTP_PORT",
        "EMAIL_SENDER_SMTP_FROM",
        "FRONTEND_URL",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
    ];
    requiredEnvVariable.forEach((variable) => {
        if (!process.env[variable]) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Missing required environment variable: ${variable}`);
        }
    });
    return {
        PORT: Number(process.env.PORT),
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
        EMAIL_SENDER: {
            SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
            SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
            SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
            SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
            SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM,
        },
        FRONTEND_URL: process.env.FRONTEND_URL,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        },
    };
};
exports.envVars = loadEnvVariables();
//# sourceMappingURL=env.js.map