import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllTestimonials = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const featured = query.featured === "true" ? true : query.featured === "false" ? false : undefined;
    const approved = query.approved === "true" ? true : query.approved === "false" ? false : undefined;
    const where = {
        ...(featured !== undefined ? { featured } : {}),
        ...(approved !== undefined ? { approved } : {}),
        ...(searchTerm ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { company: { contains: searchTerm, mode: "insensitive" } }] } : {}),
    };
    const [data, total] = await Promise.all([
        prisma.testimonial.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder }, include: { project: true } }),
        prisma.testimonial.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getTestimonialById = async (id) => {
    const testimonial = await prisma.testimonial.findUnique({ where: { id }, include: { project: true } });
    if (!testimonial)
        throw new AppError(status.NOT_FOUND, "Testimonial not found");
    return testimonial;
};
const createTestimonial = async (payload) => prisma.testimonial.create({ data: payload });
const updateTestimonial = async (id, payload) => prisma.testimonial.update({ where: { id }, data: payload });
const deleteTestimonial = async (id) => prisma.testimonial.delete({ where: { id } });
export const testimonialService = { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
//# sourceMappingURL=testimonial.service.js.map