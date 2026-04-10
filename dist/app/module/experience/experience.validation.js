"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceValidation = exports.updateExperienceZodSchema = exports.createExperienceZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const optionalUrlField = zod_1.default
    .union([zod_1.default.url(), zod_1.default.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value));
exports.createExperienceZodSchema = zod_1.default.object({
    company: zod_1.default.string().min(2).max(180),
    role: zod_1.default.string().min(2).max(180),
    description: zod_1.default.string().optional(),
    logoUrl: optionalUrlField,
    companyUrl: optionalUrlField,
    employmentType: zod_1.default.string().max(180).optional(),
    locationType: zod_1.default.enum(["REMOTE", "ONSITE", "HYBRID"]).optional(),
    startDate: zod_1.default.string().datetime(),
    endDate: zod_1.default.string().datetime().optional(),
    current: zod_1.default.boolean().optional(),
    sortOrder: zod_1.default.number().int().optional(),
});
exports.updateExperienceZodSchema = exports.createExperienceZodSchema.partial();
exports.ExperienceValidation = { createExperienceZodSchema: exports.createExperienceZodSchema, updateExperienceZodSchema: exports.updateExperienceZodSchema };
//# sourceMappingURL=experience.validation.js.map