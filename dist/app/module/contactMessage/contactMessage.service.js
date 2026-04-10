"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactMessageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const env_1 = require("../../config/env");
const prisma_1 = require("../../lib/prisma");
const email_1 = require("../../utils/email");
const pagination_1 = require("../../utils/pagination");
const getAllContactMessages = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const statusFilter = typeof query.status === "string" ? query.status : undefined;
    const where = {
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(searchTerm
            ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { email: { contains: searchTerm, mode: "insensitive" } }] }
            : {}),
    };
    const [data, total] = await Promise.all([
        prisma_1.prisma.contactMessage.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.contactMessage.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getContactMessageById = async (id) => {
    const contactMessage = await prisma_1.prisma.contactMessage.findUnique({ where: { id } });
    if (!contactMessage)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Contact message not found");
    return contactMessage;
};
const createContactMessage = async (payload) => {
    const contactMessage = await prisma_1.prisma.contactMessage.create({ data: payload });
    try {
        await (0, email_1.sendEmail)({
            to: env_1.envVars.EMAIL_SENDER.SMTP_USER,
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
    }
    catch (error) {
        console.error("Failed to send contact message email notification:", error);
    }
    return contactMessage;
};
const updateContactMessageStatus = async (id, payload) => prisma_1.prisma.contactMessage.update({ where: { id }, data: payload });
const deleteContactMessage = async (id) => prisma_1.prisma.contactMessage.delete({ where: { id } });
exports.contactMessageService = { getAllContactMessages, getContactMessageById, createContactMessage, updateContactMessageStatus, deleteContactMessage };
//# sourceMappingURL=contactMessage.service.js.map