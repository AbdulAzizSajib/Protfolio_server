import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { getPaginationOptions } from "../../utils/pagination.js";
const getAllProjects = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const categoryId = typeof query.categoryId === "string" ? query.categoryId : undefined;
    const featured = query.featured === "true" ? true : query.featured === "false" ? false : undefined;
    const statusFilter = typeof query.status === "string" ? query.status : undefined;
    const where = {
        ...(categoryId ? { categoryId } : {}),
        ...(featured !== undefined ? { featured } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(searchTerm
            ? {
                OR: [
                    { title: { contains: searchTerm, mode: "insensitive" } },
                    { description: { contains: searchTerm, mode: "insensitive" } },
                ],
            }
            : {}),
    };
    const [data, total] = await Promise.all([
        prisma.project.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            include: { category: true, tags: { include: { tag: true } }, skills: { include: { skill: true } }, images: true },
        }),
        prisma.project.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getProjectById = async (id) => {
    const project = await prisma.project.findUnique({
        where: { id },
        include: { category: true, tags: { include: { tag: true } }, skills: { include: { skill: true } }, images: true, testimonials: true },
    });
    if (!project)
        throw new AppError(status.NOT_FOUND, "Project not found");
    return project;
};
const createProject = async (payload) => {
    const slug = typeof payload.slug === "string" ? payload.slug : undefined;
    if (slug) {
        const existingProject = await prisma.project.findUnique({
            where: { slug },
            select: { id: true },
        });
        if (existingProject) {
            throw new AppError(status.CONFLICT, "Project slug already exists. Please use a different slug.");
        }
    }
    return prisma.project.create({ data: payload });
};
const updateProject = async (id, payload) => {
    const slug = typeof payload.slug === "string" ? payload.slug : undefined;
    if (slug) {
        const existingProject = await prisma.project.findFirst({
            where: {
                slug,
                NOT: { id },
            },
            select: { id: true },
        });
        if (existingProject) {
            throw new AppError(status.CONFLICT, "Project slug already exists. Please use a different slug.");
        }
    }
    return prisma.project.update({ where: { id }, data: payload });
};
const deleteProject = async (id) => prisma.project.delete({ where: { id } });
export const projectService = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
//# sourceMappingURL=project.service.js.map