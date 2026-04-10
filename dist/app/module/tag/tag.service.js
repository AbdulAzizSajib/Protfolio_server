"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllTags = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const where = searchTerm
        ? { OR: [{ name: { contains: searchTerm, mode: "insensitive" } }, { slug: { contains: searchTerm, mode: "insensitive" } }] }
        : {};
    const [data, total] = await Promise.all([
        prisma_1.prisma.tag.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.tag.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getTagById = async (id) => {
    const tag = await prisma_1.prisma.tag.findUnique({ where: { id } });
    if (!tag)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Tag not found");
    return tag;
};
const createTag = async (payload) => prisma_1.prisma.tag.create({ data: payload });
const updateTag = async (id, payload) => prisma_1.prisma.tag.update({ where: { id }, data: payload });
const deleteTag = async (id) => prisma_1.prisma.tag.delete({ where: { id } });
exports.tagService = { getAllTags, getTagById, createTag, updateTag, deleteTag };
//# sourceMappingURL=tag.service.js.map