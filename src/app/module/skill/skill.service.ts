import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllSkills = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const category = typeof query.category === "string" ? query.category : undefined;

  const where = {
    ...(category ? { category: category as never } : {}),
    ...(searchTerm ? { name: { contains: searchTerm, mode: "insensitive" as const } } : {}),
  };

  const [data, total] = await Promise.all([
    prisma.skill.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
    prisma.skill.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getSkillById = async (id: string) => {
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) throw new AppError(status.NOT_FOUND, "Skill not found");
  return skill;
};
const createSkill = async (payload: Record<string, unknown>) => prisma.skill.create({ data: payload as never });
const updateSkill = async (id: string, payload: Record<string, unknown>) => prisma.skill.update({ where: { id }, data: payload as never });
const deleteSkill = async (id: string) => prisma.skill.delete({ where: { id } });

export const skillService = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
