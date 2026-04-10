"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagValidation = exports.updateTagZodSchema = exports.createTagZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTagZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(100),
    slug: zod_1.default.string().min(2).max(120),
});
exports.updateTagZodSchema = exports.createTagZodSchema.partial();
exports.TagValidation = { createTagZodSchema: exports.createTagZodSchema, updateTagZodSchema: exports.updateTagZodSchema };
//# sourceMappingURL=tag.validation.js.map