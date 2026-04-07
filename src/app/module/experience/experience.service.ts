import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllExperiences = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const locationType = typeof query.locationType === "string" ? query.locationType : undefined;

  const where = {
    ...(locationType ? { locationType: locationType as never } : {}),
    ...(searchTerm
      ? { OR: [{ company: { contains: searchTerm, mode: "insensitive" as const } }, { role: { contains: searchTerm, mode: "insensitive" as const } }] }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.experience.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
    prisma.experience.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getExperienceById = async (id: string) => {
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) throw new AppError(status.NOT_FOUND, "Experience not found");
  return experience;
};
const createExperience = async (payload: Record<string, unknown>) => prisma.experience.create({ data: payload as never });
const updateExperience = async (id: string, payload: Record<string, unknown>) => prisma.experience.update({ where: { id }, data: payload as never });
const deleteExperience = async (id: string) => prisma.experience.delete({ where: { id } });

export const experienceService = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };
