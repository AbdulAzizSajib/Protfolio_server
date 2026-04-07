import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllPageViews = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const country = typeof query.country === "string" ? query.country : undefined;
    const where = {
        ...(country ? { country } : {}),
        ...(searchTerm ? { path: { contains: searchTerm, mode: "insensitive" } } : {}),
    };
    const [data, total] = await Promise.all([
        prisma.pageView.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.pageView.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getPageViewById = async (id) => {
    const pageView = await prisma.pageView.findUnique({ where: { id } });
    if (!pageView)
        throw new AppError(status.NOT_FOUND, "Page view not found");
    return pageView;
};
const createPageView = async (payload) => prisma.pageView.create({ data: payload });
const deletePageView = async (id) => prisma.pageView.delete({ where: { id } });
export const pageViewService = { getAllPageViews, getPageViewById, createPageView, deletePageView };
//# sourceMappingURL=pageView.service.js.map