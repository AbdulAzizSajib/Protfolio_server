"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessageValidation = exports.updateContactMessageZodSchema = exports.createContactMessageZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createContactMessageZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(180),
    email: zod_1.default.email(),
    subject: zod_1.default.string().max(250).optional(),
    message: zod_1.default.string().min(10),
});
exports.updateContactMessageZodSchema = zod_1.default.object({
    status: zod_1.default.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED", "SPAM"]),
});
exports.ContactMessageValidation = { createContactMessageZodSchema: exports.createContactMessageZodSchema, updateContactMessageZodSchema: exports.updateContactMessageZodSchema };
//# sourceMappingURL=contactMessage.validation.js.map