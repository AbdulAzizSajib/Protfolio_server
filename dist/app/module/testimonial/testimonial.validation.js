"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialValidation = exports.updateTestimonialZodSchema = exports.createTestimonialZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTestimonialZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(180),
    role: zod_1.default.string().optional(),
    company: zod_1.default.string().optional(),
    avatarUrl: zod_1.default.string().url().optional(),
    content: zod_1.default.string().min(10),
    rating: zod_1.default.number().int().min(1).max(5).optional(),
    featured: zod_1.default.boolean().optional(),
    approved: zod_1.default.boolean().optional(),
    projectId: zod_1.default.string().optional(),
});
exports.updateTestimonialZodSchema = exports.createTestimonialZodSchema.partial();
exports.TestimonialValidation = { createTestimonialZodSchema: exports.createTestimonialZodSchema, updateTestimonialZodSchema: exports.updateTestimonialZodSchema };
//# sourceMappingURL=testimonial.validation.js.map