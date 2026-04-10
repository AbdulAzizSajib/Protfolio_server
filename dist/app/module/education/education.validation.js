"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationValidation = exports.updateEducationZodSchema = exports.createEducationZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createEducationZodSchema = zod_1.default.object({
    institution: zod_1.default.string().min(2).max(180),
    degree: zod_1.default.string().min(2).max(180),
    field: zod_1.default.string().optional(),
    logoUrl: zod_1.default.string().url().optional(),
    grade: zod_1.default.string().optional(),
    startDate: zod_1.default.string().datetime(),
    endDate: zod_1.default.string().datetime().optional(),
    current: zod_1.default.boolean().optional(),
    description: zod_1.default.string().optional(),
});
exports.updateEducationZodSchema = exports.createEducationZodSchema.partial();
exports.EducationValidation = { createEducationZodSchema: exports.createEducationZodSchema, updateEducationZodSchema: exports.updateEducationZodSchema };
//# sourceMappingURL=education.validation.js.map