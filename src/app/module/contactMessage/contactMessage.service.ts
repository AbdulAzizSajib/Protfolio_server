import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { getPaginationOptions } from "../../utils/pagination";

const getAllContactMessages = async (query: Record<string, unknown>) => {
  const { page, limit, skip, sortBy, sortOrder, searchTerm } = getPaginationOptions(query);
  const statusFilter = typeof query.status === "string" ? query.status : undefined;

  const where = {
    ...(statusFilter ? { status: statusFilter as never } : {}),
    ...(searchTerm
      ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" as const } }, { email: { contains: searchTerm, mode: "insensitive" as const } }] }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
    prisma.contactMessage.count({ where }),
  ]);

  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getContactMessageById = async (id: string) => {
  const contactMessage = await prisma.contactMessage.findUnique({ where: { id } });
  if (!contactMessage) throw new AppError(status.NOT_FOUND, "Contact message not found");
  return contactMessage;
};
const createContactMessage = async (payload: Record<string, unknown>) => prisma.contactMessage.create({ data: payload as never });
const updateContactMessageStatus = async (id: string, payload: Record<string, unknown>) => prisma.contactMessage.update({ where: { id }, data: payload as never });
const deleteContactMessage = async (id: string) => prisma.contactMessage.delete({ where: { id } });

export const contactMessageService = { getAllContactMessages, getContactMessageById, createContactMessage, updateContactMessageStatus, deleteContactMessage };
