"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = exports.updateCategoryZodSchema = exports.createCategoryZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCategoryZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(100),
    slug: zod_1.default.string().min(2).max(120),
    description: zod_1.default.string().optional(),
    color: zod_1.default.string().optional(),
    icon: zod_1.default.string().optional(),
});
exports.updateCategoryZodSchema = exports.createCategoryZodSchema.partial();
exports.CategoryValidation = {
    createCategoryZodSchema: exports.createCategoryZodSchema,
    updateCategoryZodSchema: exports.updateCategoryZodSchema,
};
//# sourceMappingURL=category.validation.js.map