"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillValidation = exports.updateSkillZodSchema = exports.createSkillZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createSkillZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(120),
    iconUrl: zod_1.default.url().optional(),
    proficiency: zod_1.default.number().int().min(0).max(100).optional(),
    category: zod_1.default.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "DESIGN", "MOBILE", "OTHER"]),
    sortOrder: zod_1.default.number().int().optional(),
    featured: zod_1.default.boolean().optional(),
});
exports.updateSkillZodSchema = exports.createSkillZodSchema.partial();
exports.SkillValidation = { createSkillZodSchema: exports.createSkillZodSchema, updateSkillZodSchema: exports.updateSkillZodSchema };
//# sourceMappingURL=skill.validation.js.map