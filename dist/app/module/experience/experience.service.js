"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllExperiences = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const locationType = typeof query.locationType === "string" ? query.locationType : undefined;
    const where = {
        ...(locationType ? { locationType: locationType } : {}),
        ...(searchTerm
            ? { OR: [{ company: { contains: searchTerm, mode: "insensitive" } }, { role: { contains: searchTerm, mode: "insensitive" } }] }
            : {}),
    };
    const [data, total] = await Promise.all([
        prisma_1.prisma.experience.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.experience.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getExperienceById = async (id) => {
    const experience = await prisma_1.prisma.experience.findUnique({ where: { id } });
    if (!experience)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Experience not found");
    return experience;
};
const createExperience = async (payload) => prisma_1.prisma.experience.create({ data: payload });
const updateExperience = async (id, payload) => prisma_1.prisma.experience.update({ where: { id }, data: payload });
const deleteExperience = async (id) => prisma_1.prisma.experience.delete({ where: { id } });
exports.experienceService = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };
//# sourceMappingURL=experience.service.js.map