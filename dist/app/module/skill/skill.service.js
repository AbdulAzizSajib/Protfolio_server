import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllSkills = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const category = typeof query.category === "string" ? query.category : undefined;
    const where = {
        ...(category ? { category: category } : {}),
        ...(searchTerm ? { name: { contains: searchTerm, mode: "insensitive" } } : {}),
    };
    const [data, total] = await Promise.all([
        prisma.skill.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.skill.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getSkillById = async (id) => {
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill)
        throw new AppError(status.NOT_FOUND, "Skill not found");
    return skill;
};
const createSkill = async (payload) => prisma.skill.create({ data: payload });
const updateSkill = async (id, payload) => prisma.skill.update({ where: { id }, data: payload });
const deleteSkill = async (id) => prisma.skill.delete({ where: { id } });
export const skillService = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
//# sourceMappingURL=skill.service.js.map