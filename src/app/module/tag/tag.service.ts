import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllTags = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const where = searchTerm
    ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" as const } }, { slug: { contains: searchTerm, mode: "insensitive" as const } }] }
    : {};

  const [data, total] = await Promise.all([
    prisma.tag.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
    prisma.tag.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUnique({ where: { id } });
  if (!tag) throw new AppError(status.NOT_FOUND, "Tag not found");
  return tag;
};
const createTag = async (payload: Record<string, unknown>) => prisma.tag.create({ data: payload as never });
const updateTag = async (id: string, payload: Record<string, unknown>) => prisma.tag.update({ where: { id }, data: payload as never });
const deleteTag = async (id: string) => prisma.tag.delete({ where: { id } });

export const tagService = { getAllTags, getTagById, createTag, updateTag, deleteTag };
