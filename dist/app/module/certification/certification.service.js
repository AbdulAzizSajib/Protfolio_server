"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllCertifications = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const where = searchTerm
        ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { issuer: { contains: searchTerm, mode: "insensitive" } }] }
        : {};
    const [data, total] = await Promise.all([
        prisma_1.prisma.certification.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.certification.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getCertificationById = async (id) => {
    const certification = await prisma_1.prisma.certification.findUnique({ where: { id } });
    if (!certification)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Certification not found");
    return certification;
};
const createCertification = async (payload) => prisma_1.prisma.certification.create({ data: payload });
const updateCertification = async (id, payload) => prisma_1.prisma.certification.update({ where: { id }, data: payload });
const deleteCertification = async (id) => prisma_1.prisma.certification.delete({ where: { id } });
exports.certificationService = { getAllCertifications, getCertificationById, createCertification, updateCertification, deleteCertification };
//# sourceMappingURL=certification.service.js.map