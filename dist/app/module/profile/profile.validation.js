"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidation = exports.updateProfileZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const optionalUrlField = zod_1.default
    .union([zod_1.default.url(), zod_1.default.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value));
exports.updateProfileZodSchema = zod_1.default.object({
    tagline: zod_1.default.string().max(150).optional(),
    bio: zod_1.default.string().optional(),
    location: zod_1.default.string().max(120).optional(),
    website: optionalUrlField,
    available: zod_1.default.coerce.boolean().optional(),
    github: optionalUrlField,
    linkedin: optionalUrlField,
    twitter: optionalUrlField,
    youtube: optionalUrlField,
    dribbble: optionalUrlField,
    behance: optionalUrlField,
    metaTitle: zod_1.default.string().max(160).optional(),
    metaDescription: zod_1.default.string().max(300).optional(),
});
exports.ProfileValidation = {
    updateProfileZodSchema: exports.updateProfileZodSchema,
};
//# sourceMappingURL=profile.validation.js.map