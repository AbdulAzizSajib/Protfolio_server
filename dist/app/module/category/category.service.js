import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllCategories = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const where = searchTerm
        ? {
            OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { slug: { contains: searchTerm, mode: "insensitive" } },
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
const getCategoryById = async (id) => {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category)
        throw new AppError(status.NOT_FOUND, "Category not found");
    return category;
};
const createCategory = async (payload) => prisma.category.create({ data: payload });
const updateCategory = async (id, payload) => prisma.category.update({ where: { id }, data: payload });
const deleteCategory = async (id) => prisma.category.delete({ where: { id } });
export const categoryService = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
//# sourceMappingURL=category.service.js.map