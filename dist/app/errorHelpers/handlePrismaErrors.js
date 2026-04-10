"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerPrismaClientRustPanicError = exports.handlerPrismaClientInitializationError = exports.handlePrismaClientValidationError = exports.handlePrismaClientUnknownError = exports.handlePrismaClientKnownRequestError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const getStatusCodeFromPrismaError = (errorCode) => {
    //P2002: Unique constraint failed
    if (errorCode === "P2002") {
        return http_status_1.default.CONFLICT;
    }
    // P2025, P2001, P2015, P2018 : Not Found errors
    if (["P2025", "P2001", "P2015", "P2018"].includes(errorCode)) {
        return http_status_1.default.NOT_FOUND;
    }
    // P1000 , P6002 : DB Authentication errors = 401 Unauthorized
    if (["P1000", "P6002"].includes(errorCode)) {
        return http_status_1.default.UNAUTHORIZED;
    }
    // P1010 , P6010 : Access denied errors = 403 Forbidden
    if (["P1010", "P6010"].includes(errorCode)) {
        return http_status_1.default.FORBIDDEN;
    }
    // P6003 : Prisma Accelararate Plan limit exceeded = 402 Payment Required
    if (errorCode === "P6003") {
        return http_status_1.default.PAYMENT_REQUIRED;
    }
    // P1008, 2004, 6004 : Timeout errors = 504 Gateway Timeout
    if (["P1008", "P2004", "P6004"].includes(errorCode)) {
        return http_status_1.default.GATEWAY_TIMEOUT;
    }
    // P5011 : Rate Limit Exceeded = 429 Too Many Requests
    if (errorCode === "P5011") {
        return http_status_1.default.TOO_MANY_REQUESTS;
    }
    // P6009 Response size limit exceeded = 413 Payload Too Large
    if (errorCode === "P6009") {
        return 413;
    }
    // P1xxx , P2024, P2037, P6008 : Connection errors
    if (errorCode.startsWith("P1") ||
        ["P2024", "P2037", "P6008"].includes(errorCode)) {
        return http_status_1.default.SERVICE_UNAVAILABLE;
    }
    // P2XXX : except unhandled errors, Bad Request
    if (errorCode.startsWith("P2")) {
        return http_status_1.default.BAD_REQUEST;
    }
    // P3XXX, P4XXX : Internal Server Errors
    if (errorCode.startsWith("P3") || errorCode.startsWith("P4")) {
        return http_status_1.default.INTERNAL_SERVER_ERROR;
    }
    return http_status_1.default.INTERNAL_SERVER_ERROR;
};
const formatErrorMeta = (meta) => {
    if (!meta)
        return "";
    const parts = [];
    if (meta.target) {
        parts.push(`Field(s): ${String(meta.target)}`);
    }
    if (meta.field_name) {
        parts.push(`Field: ${String(meta.field_name)}`);
    }
    if (meta.column_name) {
        parts.push(`Column: ${String(meta.column_name)}`);
    }
    if (meta.table) {
        parts.push(`Table: ${String(meta.table)}`);
    }
    if (meta.model_name) {
        parts.push(`Model: ${String(meta.model_name)}`);
    }
    if (meta.relation_name) {
        parts.push(`Relation: ${String(meta.relation_name)}`);
    }
    if (meta.constraint) {
        parts.push(`Constraint: ${String(meta.constraint)}`);
    }
    if (meta.database_error) {
        parts.push(`Database Error: ${String(meta.database_error)}`);
    }
    return parts.length > 0 ? parts.join(" |") : "";
};
const extractConstraintFields = (meta) => {
    if (!meta)
        return [];
    if (Array.isArray(meta.target)) {
        return meta.target.map((item) => String(item));
    }
    if (meta.driverAdapterError && typeof meta.driverAdapterError === "object") {
        const driverAdapterError = meta.driverAdapterError;
        if (driverAdapterError.cause && typeof driverAdapterError.cause === "object") {
            const cause = driverAdapterError.cause;
            if (cause.constraint && typeof cause.constraint === "object") {
                const constraint = cause.constraint;
                if (Array.isArray(constraint.fields)) {
                    return constraint.fields.map((item) => String(item));
                }
            }
        }
    }
    return [];
};
const handlePrismaClientKnownRequestError = (error) => {
    const statusCode = getStatusCodeFromPrismaError(error.code);
    const metaInfo = formatErrorMeta(error.meta);
    if (error.code === "P2002") {
        const fields = extractConstraintFields(error.meta);
        const fieldLabel = fields.length > 0 ? fields.join(", ") : "unique field";
        return {
            success: false,
            statusCode,
            message: "Unique constraint failed",
            errorSources: [
                {
                    path: fields[0] || "P2002",
                    message: `A record with this ${fieldLabel} already exists.`,
                },
            ],
        };
    }
    let cleanMessage = error.message;
    // Remove the "Invalid `prisma.user.create()` invocation: " part from the message for better readability
    cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
    // split by new line and take the first line as the main message, rest can be added to error sources
    const lines = cleanMessage.split("\n").filter((line) => line.trim());
    const mainMessage = lines[0] || "An error occurred with the database operation.";
    const errorSources = [
        {
            path: error.code,
            message: metaInfo ? `${mainMessage} | ${metaInfo}` : mainMessage,
        },
    ];
    if (error.meta?.cause) {
        errorSources.push({
            path: "cause",
            message: String(error.meta.cause),
        });
    }
    return {
        success: false,
        statusCode,
        message: `Prisma Client Known Request Error: ${mainMessage}`,
        errorSources,
    };
};
exports.handlePrismaClientKnownRequestError = handlePrismaClientKnownRequestError;
const handlePrismaClientUnknownError = (error) => {
    let cleanMessage = error.message;
    // Remove the "Invalid `prisma.user.create()` invocation: " part from the message for better readability
    cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
    const lines = cleanMessage.split("\n").filter((line) => line.trim());
    const mainMessage = lines[0] || "An unknown error occurred with the database operation.";
    const errorSources = [
        {
            path: "Unknown Prisma Error",
            message: mainMessage,
        },
    ];
    return {
        success: false,
        statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
        message: `Prisma Client Unknown Request Error: ${mainMessage}`,
        errorSources,
    };
};
exports.handlePrismaClientUnknownError = handlePrismaClientUnknownError;
const handlePrismaClientValidationError = (error) => {
    let cleanMessage = error.message;
    // Remove the "Invalid `prisma.user.create()` invocation: " part from the message for better readability
    cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
    const lines = cleanMessage.split("\n").filter((line) => line.trim());
    const errorSources = [];
    // extract field name for field-specific validation errors
    // Example message: "Argument `data.email`: Got invalid value `invalid-email` on prisma.user.create()"
    const fieldMatch = cleanMessage.match(/Argument `(\w+)`/i);
    const fieldName = fieldMatch?.[1] ?? "Unknown Field";
    //main message
    const mainMessage = lines.find((line) => !line.includes("Argument") && !line.includes("→") && line.length > 10) ||
        lines[0] ||
        "Invalid query parameters provided to the database operation.";
    errorSources.push({
        path: fieldName,
        message: mainMessage,
    });
    return {
        success: false,
        statusCode: http_status_1.default.BAD_REQUEST,
        message: `Prisma Client Validation Error: ${mainMessage}`,
        errorSources,
    };
};
exports.handlePrismaClientValidationError = handlePrismaClientValidationError;
const handlerPrismaClientInitializationError = (error) => {
    const statusCode = error.errorCode
        ? getStatusCodeFromPrismaError(error.errorCode)
        : http_status_1.default.SERVICE_UNAVAILABLE;
    const cleanMessage = error.message;
    cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
    const lines = cleanMessage.split("\n").filter((line) => line.trim());
    const mainMessage = lines[0] || "An error occurred while initializing the Prisma Client.";
    const errorSources = [
        {
            path: error.errorCode || "Initialization Error",
            message: mainMessage,
        },
    ];
    return {
        success: false,
        statusCode,
        message: `Prisma Client Initialization Error: ${mainMessage}`,
        errorSources,
    };
};
exports.handlerPrismaClientInitializationError = handlerPrismaClientInitializationError;
const handlerPrismaClientRustPanicError = () => {
    const errorSources = [
        {
            path: "Rust Engine Crashed",
            message: "The database engine encountered a fatal error and crashed. This is usually due to an internal bug in the Prisma engine or an unexpected edge case in the database operation. Please check the Prisma logs for more details and consider reporting this issue to the Prisma team if it persists.",
        },
    ];
    return {
        success: false,
        statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
        message: "Prisma Client Rust Panic Error: The database engine crashed due to a fatal error.",
        errorSources,
    };
};
exports.handlerPrismaClientRustPanicError = handlerPrismaClientRustPanicError;
//# sourceMappingURL=handlePrismaErrors.js.map