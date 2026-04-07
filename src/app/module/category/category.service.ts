import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllCategories = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);

  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" as const } },
          { slug: { contains: searchTerm, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError(status.NOT_FOUND, "Category not found");
  return category;
};

const createCategory = async (payload: Record<string, unknown>) => prisma.category.create({ data: payload as never });
const updateCategory = async (id: string, payload: Record<string, unknown>) => prisma.category.update({ where: { id }, data: payload as never });
const deleteCategory = async (id: string) => prisma.category.delete({ where: { id } });

export const categoryService = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
