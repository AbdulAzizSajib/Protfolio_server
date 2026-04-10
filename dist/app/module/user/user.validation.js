"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.updateProfileZodSchema = exports.createAdminZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createAdminZodSchema = zod_1.default.object({
    password: zod_1.default
        .string("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters"),
    admin: zod_1.default.object({
        name: zod_1.default
            .string("Name is required and must be string")
            .min(5, "Name must be at least 5 characters")
            .max(30, "Name must be at most 30 characters"),
        email: zod_1.default.email("Invalid email address"),
        contactNumber: zod_1.default
            .string("Contact number is required")
            .min(11, "Contact number must be at least 11 characters")
            .max(14, "Contact number must be at most 15 characters")
            .optional(),
        profilePhoto: zod_1.default.url("Profile photo must be a valid URL").optional(),
    }),
    role: zod_1.default.enum(["ADMIN", "OWNER"], "Role must be either ADMIN or OWNER"),
});
exports.updateProfileZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters")
        .optional(),
    phone: zod_1.default
        .string()
        .min(11, "Phone must be at least 11 characters")
        .max(14, "Phone must be at most 14 characters")
        .optional(),
});
exports.UserValidation = {
    createAdminZodSchema: exports.createAdminZodSchema,
    updateProfileZodSchema: exports.updateProfileZodSchema,
};
//# sourceMappingURL=user.validation.js.map