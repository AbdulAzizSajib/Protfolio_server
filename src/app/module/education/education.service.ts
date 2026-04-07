import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllEducations = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const where = searchTerm
    ? { OR: [{ institution: { contains: searchTerm, mode: "insensitive" as const } }, { degree: { contains: searchTerm, mode: "insensitive" as const } }] }
    : {};

  const [data, total] = await Promise.all([
    prisma.education.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
    prisma.education.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getEducationById = async (id: string) => {
  const education = await prisma.education.findUnique({ where: { id } });
  if (!education) throw new AppError(status.NOT_FOUND, "Education not found");
  return education;
};
const createEducation = async (payload: Record<string, unknown>) => prisma.education.create({ data: payload as never });
const updateEducation = async (id: string, payload: Record<string, unknown>) => prisma.education.update({ where: { id }, data: payload as never });
const deleteEducation = async (id: string) => prisma.education.delete({ where: { id } });

export const educationService = { getAllEducations, getEducationById, createEducation, updateEducation, deleteEducation };
