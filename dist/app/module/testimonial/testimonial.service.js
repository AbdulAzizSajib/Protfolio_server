"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllTestimonials = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const featured = query.featured === "true" ? true : query.featured === "false" ? false : undefined;
    const approved = query.approved === "true" ? true : query.approved === "false" ? false : undefined;
    const where = {
        ...(featured !== undefined ? { featured } : {}),
        ...(approved !== undefined ? { approved } : {}),
        ...(searchTerm ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { company: { contains: searchTerm, mode: "insensitive" } }] } : {}),
    };
    const [data, total] = await Promise.all([
        prisma_1.prisma.testimonial.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder }, include: { project: true } }),
        prisma_1.prisma.testimonial.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getTestimonialById = async (id) => {
    const testimonial = await prisma_1.prisma.testimonial.findUnique({ where: { id }, include: { project: true } });
    if (!testimonial)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Testimonial not found");
    return testimonial;
};
const createTestimonial = async (payload) => prisma_1.prisma.testimonial.create({ data: payload });
const updateTestimonial = async (id, payload) => prisma_1.prisma.testimonial.update({ where: { id }, data: payload });
const deleteTestimonial = async (id) => prisma_1.prisma.testimonial.delete({ where: { id } });
exports.testimonialService = { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
//# sourceMappingURL=testimonial.service.js.map