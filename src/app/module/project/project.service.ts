import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllProjects = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const categoryId = typeof query.categoryId === "string" ? query.categoryId : undefined;
  const featured = query.featured === "true" ? true : query.featured === "false" ? false : undefined;
  const statusFilter = typeof query.status === "string" ? query.status : undefined;

  const where = {
    ...(categoryId ? { categoryId } : {}),
    ...(featured !== undefined ? { featured } : {}),
    ...(statusFilter ? { status: statusFilter as never } : {}),
    ...(searchTerm
      ? {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" as const } },
            { description: { contains: searchTerm, mode: "insensitive" as const } },
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

const getProjectById = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { category: true, tags: { include: { tag: true } }, skills: { include: { skill: true } }, images: true, testimonials: true },
  });
  if (!project) throw new AppError(status.NOT_FOUND, "Project not found");
  return project;
};

const createProject = async (payload: Record<string, unknown>) => {
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

  return prisma.project.create({ data: payload as never });
};

const updateProject = async (id: string, payload: Record<string, unknown>) => {
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

  return prisma.project.update({ where: { id }, data: payload as never });
};
const deleteProject = async (id: string) => prisma.project.delete({ where: { id } });

export const projectService = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
