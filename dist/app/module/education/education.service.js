import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllEducations = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const where = searchTerm
        ? { OR: [{ institution: { contains: searchTerm, mode: "insensitive" } }, { degree: { contains: searchTerm, mode: "insensitive" } }] }
        : {};
    const [data, total] = await Promise.all([
        prisma.education.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.education.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getEducationById = async (id) => {
    const education = await prisma.education.findUnique({ where: { id } });
    if (!education)
        throw new AppError(status.NOT_FOUND, "Education not found");
    return education;
};
const createEducation = async (payload) => prisma.education.create({ data: payload });
const updateEducation = async (id, payload) => prisma.education.update({ where: { id }, data: payload });
const deleteEducation = async (id) => prisma.education.delete({ where: { id } });
export const educationService = { getAllEducations, getEducationById, createEducation, updateEducation, deleteEducation };
//# sourceMappingURL=education.service.js.map