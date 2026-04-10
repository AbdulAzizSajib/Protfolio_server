"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageViewValidation = exports.createPageViewZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createPageViewZodSchema = zod_1.default.object({
    path: zod_1.default.string().min(1).max(500),
    referrer: zod_1.default.string().optional(),
    userAgent: zod_1.default.string().optional(),
    eventType: zod_1.default.string().min(1).max(80).optional(),
    section: zod_1.default.string().max(150).optional(),
});
exports.PageViewValidation = { createPageViewZodSchema: exports.createPageViewZodSchema };
//# sourceMappingURL=pageView.validation.js.map