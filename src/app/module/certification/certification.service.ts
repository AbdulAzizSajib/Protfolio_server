import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllCertifications = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const where = searchTerm
    ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" as const } }, { issuer: { contains: searchTerm, mode: "insensitive" as const } }] }
    : {};

  const [data, total] = await Promise.all([
    prisma.certification.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
    prisma.certification.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getCertificationById = async (id: string) => {
  const certification = await prisma.certification.findUnique({ where: { id } });
  if (!certification) throw new AppError(status.NOT_FOUND, "Certification not found");
  return certification;
};
const createCertification = async (payload: Record<string, unknown>) => prisma.certification.create({ data: payload as never });
const updateCertification = async (id: string, payload: Record<string, unknown>) => prisma.certification.update({ where: { id }, data: payload as never });
const deleteCertification = async (id: string) => prisma.certification.delete({ where: { id } });

export const certificationService = { getAllCertifications, getCertificationById, createCertification, updateCertification, deleteCertification };
