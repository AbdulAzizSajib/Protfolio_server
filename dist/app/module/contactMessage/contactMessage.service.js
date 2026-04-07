import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";
const getAllContactMessages = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
    const statusFilter = typeof query.status === "string" ? query.status : undefined;
    const where = {
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(searchTerm
            ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { email: { contains: searchTerm, mode: "insensitive" } }] }
            : {}),
    };
    const [data, total] = await Promise.all([
        prisma.contactMessage.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma.contactMessage.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getContactMessageById = async (id) => {
    const contactMessage = await prisma.contactMessage.findUnique({ where: { id } });
    if (!contactMessage)
        throw new AppError(status.NOT_FOUND, "Contact message not found");
    return contactMessage;
};
const createContactMessage = async (payload) => prisma.contactMessage.create({ data: payload });
const updateContactMessageStatus = async (id, payload) => prisma.contactMessage.update({ where: { id }, data: payload });
const deleteContactMessage = async (id) => prisma.contactMessage.delete({ where: { id } });
export const contactMessageService = { getAllContactMessages, getContactMessageById, createContactMessage, updateContactMessageStatus, deleteContactMessage };
//# sourceMappingURL=contactMessage.service.js.map