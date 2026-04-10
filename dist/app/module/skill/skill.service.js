"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllSkills = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const category = typeof query.category === "string" ? query.category : undefined;
    const where = {
        ...(category ? { category: category } : {}),
        ...(searchTerm ? { name: { contains: searchTerm, mode: "insensitive" } } : {}),
    };
    const [data, total] = await Promise.all([
        prisma_1.prisma.skill.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.skill.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getSkillById = async (id) => {
    const skill = await prisma_1.prisma.skill.findUnique({ where: { id } });
    if (!skill)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Skill not found");
    return skill;
};
const createSkill = async (payload) => prisma_1.prisma.skill.create({ data: payload });
const updateSkill = async (id, payload) => prisma_1.prisma.skill.update({ where: { id }, data: payload });
const deleteSkill = async (id) => prisma_1.prisma.skill.delete({ where: { id } });
exports.skillService = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
//# sourceMappingURL=skill.service.js.map