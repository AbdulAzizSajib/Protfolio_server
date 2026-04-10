"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = exports.updateProjectZodSchema = exports.createProjectZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectZodSchema = zod_1.default.object({
    title: zod_1.default.string().min(2).max(200),
    slug: zod_1.default.string().min(2).max(220),
    description: zod_1.default.string().min(10),
    content: zod_1.default.string().optional(),
    coverImage: zod_1.default.union([zod_1.default.string().url(), zod_1.default.literal("")]).optional(),
    liveUrl: zod_1.default.union([zod_1.default.string().url(), zod_1.default.literal("")]).optional(),
    githubUrl: zod_1.default.union([zod_1.default.string().url(), zod_1.default.literal("")]).optional(),
    featured: zod_1.default.boolean().optional(),
    status: zod_1.default.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    startDate: zod_1.default.string().datetime().optional(),
    endDate: zod_1.default.string().datetime().optional(),
    sortOrder: zod_1.default.number().int().optional(),
    categoryId: zod_1.default.string().optional(),
    tags: zod_1.default.array(zod_1.default.object({ tagId: zod_1.default.string() })).optional(),
    skills: zod_1.default.array(zod_1.default.object({ skillId: zod_1.default.string() })).optional(),
    images: zod_1.default.array(zod_1.default.object({ url: zod_1.default.string().url(), alt: zod_1.default.string().optional(), sortOrder: zod_1.default.number().int().optional() })).optional(),
});
exports.updateProjectZodSchema = exports.createProjectZodSchema.partial();
exports.ProjectValidation = { createProjectZodSchema: exports.createProjectZodSchema, updateProjectZodSchema: exports.updateProjectZodSchema };
//# sourceMappingURL=project.validation.js.map