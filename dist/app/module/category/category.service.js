"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const getAllCategories = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const where = searchTerm
        ? {
            OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { slug: { contains: searchTerm, mode: "insensitive" } },
            ],
        }
        : {};
    const [data, total] = await Promise.all([
        prisma_1.prisma.category.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
        }),
        prisma_1.prisma.category.count({ where }),
    ]);
    return {
        data,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
};
const getCategoryById = async (id) => {
    const category = await prisma_1.prisma.category.findUnique({ where: { id } });
    if (!category)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found");
    return category;
};
const createCategory = async (payload) => prisma_1.prisma.category.create({ data: payload });
const updateCategory = async (id, payload) => prisma_1.prisma.category.update({ where: { id }, data: payload });
const deleteCategory = async (id) => prisma_1.prisma.category.delete({ where: { id } });
exports.categoryService = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
//# sourceMappingURL=category.service.js.map