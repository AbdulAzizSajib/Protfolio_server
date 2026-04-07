import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllCertifications = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const where = searchTerm
        ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { issuer: { contains: searchTerm, mode: "insensitive" } }] }
        : {};
    const [data, total] = await Promise.all([
        prisma.certification.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.certification.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getCertificationById = async (id) => {
    const certification = await prisma.certification.findUnique({ where: { id } });
    if (!certification)
        throw new AppError(status.NOT_FOUND, "Certification not found");
    return certification;
};
const createCertification = async (payload) => prisma.certification.create({ data: payload });
const updateCertification = async (id, payload) => prisma.certification.update({ where: { id }, data: payload });
const deleteCertification = async (id) => prisma.certification.delete({ where: { id } });
export const certificationService = { getAllCertifications, getCertificationById, createCertification, updateCertification, deleteCertification };
//# sourceMappingURL=certification.service.js.map