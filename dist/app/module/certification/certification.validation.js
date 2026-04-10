"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationValidation = exports.updateCertificationZodSchema = exports.createCertificationZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCertificationZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(200),
    issuer: zod_1.default.string().min(2).max(200),
    issueDate: zod_1.default.string().datetime(),
    expiryDate: zod_1.default.string().datetime().optional(),
    credentialId: zod_1.default.string().optional(),
    credentialUrl: zod_1.default.string().url().optional(),
    badgeUrl: zod_1.default.string().url().optional(),
});
exports.updateCertificationZodSchema = exports.createCertificationZodSchema.partial();
exports.CertificationValidation = { createCertificationZodSchema: exports.createCertificationZodSchema, updateCertificationZodSchema: exports.updateCertificationZodSchema };
//# sourceMappingURL=certification.validation.js.map