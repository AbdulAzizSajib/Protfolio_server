import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { prisma } from "../../lib/prisma";
import { sendEmail } from "../../utils/email";
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
const createContactMessage = async (payload: Record<string, unknown>) => {
  const contactMessage = await prisma.contactMessage.create({ data: payload as never });

  try {
    await sendEmail({
      to: envVars.EMAIL_SENDER.SMTP_USER,
      subject: `New contact message from ${String(payload.name ?? "Unknown")}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${String(payload.name ?? "")}</p>
        <p><strong>Email:</strong> ${String(payload.email ?? "")}</p>
        <p><strong>Subject:</strong> ${String(payload.subject ?? "No subject")}</p>
        <p><strong>Message:</strong></p>
        <p>${String(payload.message ?? "")}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact message email notification:", error);
  }

  return contactMessage;
};
const updateContactMessageStatus = async (id: string, payload: Record<string, unknown>) => prisma.contactMessage.update({ where: { id }, data: payload as never });
const deleteContactMessage = async (id: string) => prisma.contactMessage.delete({ where: { id } });

export const contactMessageService = { getAllContactMessages, getContactMessageById, createContactMessage, updateContactMessageStatus, deleteContactMessage };
