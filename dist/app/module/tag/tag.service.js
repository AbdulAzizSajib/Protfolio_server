import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllTags = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const where = searchTerm
        ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { slug: { contains: searchTerm, mode: "insensitive" } }] }
        : {};
    const [data, total] = await Promise.all([
        prisma.tag.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.tag.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getTagById = async (id) => {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag)
        throw new AppError(status.NOT_FOUND, "Tag not found");
    return tag;
};
const createTag = async (payload) => prisma.tag.create({ data: payload });
const updateTag = async (id, payload) => prisma.tag.update({ where: { id }, data: payload });
const deleteTag = async (id) => prisma.tag.delete({ where: { id } });
export const tagService = { getAllTags, getTagById, createTag, updateTag, deleteTag };
//# sourceMappingURL=tag.service.js.map