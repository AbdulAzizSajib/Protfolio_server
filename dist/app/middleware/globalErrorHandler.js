"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleZodError_1 = require("../errorHelpers/handleZodError");
const zod_1 = __importDefault(require("zod"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const deleteUploadedFilesFromGlobalErrorHandler_1 = require("../utils/deleteUploadedFilesFromGlobalErrorHandler");
const client_1 = require("../../generated/prisma/client");
const handlePrismaErrors_1 = require("../errorHelpers/handlePrismaErrors");
//  global error handler
const globalErrorHandler = async (err, req, res, next) => {
    //   console.error("Global error handler:", err);
    if (env_1.envVars.NODE_ENV === "development") {
        console.error("Error from Global Error Handler:", err);
    }
    // Cleanup uploaded files from Cloudinary if error occurs
    await (0, deleteUploadedFilesFromGlobalErrorHandler_1.deleteUploadedFilesFromGlobalErrorHandler)(req);
    // handle different types of errors and send appropriate response
    let errorSources = [];
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    let stack = undefined;
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, handlePrismaErrors_1.handlePrismaClientKnownRequestError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        const simplifiedError = (0, handlePrismaErrors_1.handlePrismaClientUnknownError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = (0, handlePrismaErrors_1.handlePrismaClientValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof client_1.Prisma.PrismaClientRustPanicError) {
        const simplifiedError = (0, handlePrismaErrors_1.handlerPrismaClientRustPanicError)();
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        const simplifiedError = (0, handlePrismaErrors_1.handlerPrismaClientInitializationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof zod_1.default.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = err.message;
        stack = err.stack;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    const errorResponse = {
        success: false,
        message: message,
        errorSources,
        ...(env_1.envVars.NODE_ENV === "development" ? { error: err } : {}),
        ...(env_1.envVars.NODE_ENV === "development" && stack ? { stack } : {}),
    };
    res.status(statusCode).json(errorResponse);
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map