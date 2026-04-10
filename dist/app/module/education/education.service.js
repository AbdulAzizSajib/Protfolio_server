"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllEducations = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const where = searchTerm
        ? { OR: [{ institution: { contains: searchTerm, mode: "insensitive" } }, { degree: { contains: searchTerm, mode: "insensitive" } }] }
        : {};
    const [data, total] = await Promise.all([
        prisma_1.prisma.education.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.education.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getEducationById = async (id) => {
    const education = await prisma_1.prisma.education.findUnique({ where: { id } });
    if (!education)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Education not found");
    return education;
};
const createEducation = async (payload) => prisma_1.prisma.education.create({ data: payload });
const updateEducation = async (id, payload) => prisma_1.prisma.education.update({ where: { id }, data: payload });
const deleteEducation = async (id) => prisma_1.prisma.education.delete({ where: { id } });
exports.educationService = { getAllEducations, getEducationById, createEducation, updateEducation, deleteEducation };
//# sourceMappingURL=education.service.js.map