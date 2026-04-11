import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { getPaginationOptions } from "../../utils/pagination.js";
const getAllExperiences = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const locationType = typeof query.locationType === "string" ? query.locationType : undefined;
    const where = {
        ...(locationType ? { locationType: locationType } : {}),
        ...(searchTerm
            ? { OR: [{ company: { contains: searchTerm, mode: "insensitive" } }, { role: { contains: searchTerm, mode: "insensitive" } }] }
            : {}),
    };
    const [data, total] = await Promise.all([
        prisma.experience.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.experience.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getExperienceById = async (id) => {
    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience)
        throw new AppError(status.NOT_FOUND, "Experience not found");
    return experience;
};
const createExperience = async (payload) => prisma.experience.create({ data: payload });
const updateExperience = async (id, payload) => prisma.experience.update({ where: { id }, data: payload });
const deleteExperience = async (id) => prisma.experience.delete({ where: { id } });
export const experienceService = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };
//# sourceMappingURL=experience.service.js.map