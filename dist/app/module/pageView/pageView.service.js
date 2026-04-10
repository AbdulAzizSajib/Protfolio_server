"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageViewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const prisma_1 = require("../../lib/prisma");
const pagination_1 = require("../../utils/pagination");
const ALLOWED_EVENT_TYPES = ["page_view", "cta_click", "nav_click", "project_open", "contact_open", "contact_submit", "section_view"];
const allowedEventTypeSet = new Set(ALLOWED_EVENT_TYPES);
const normalizeEventType = (eventType) => {
    if (typeof eventType !== "string" || !eventType.trim())
        return "page_view";
    const normalized = eventType.trim().toLowerCase();
    return allowedEventTypeSet.has(normalized) ? normalized : "custom";
};
const getAllPageViews = async (query) => {
    const { page, limit, skip, sortBy, sortOrder, searchTerm } = (0, pagination_1.getPaginationOptions)(query);
    const country = typeof query.country === "string" ? query.country : undefined;
    const section = typeof query.section === "string" ? query.section : undefined;
    const eventType = typeof query.eventType === "string" ? normalizeEventType(query.eventType) : undefined;
    const where = {
        ...(country ? { country } : {}),
        ...(section ? { section } : {}),
        ...(eventType ? { eventType } : {}),
        ...(searchTerm ? { path: { contains: searchTerm, mode: "insensitive" } } : {}),
    };
    const [data, total] = await Promise.all([
        prisma_1.prisma.pageView.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
        prisma_1.prisma.pageView.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const getPageViewById = async (id) => {
    const pageView = await prisma_1.prisma.pageView.findUnique({ where: { id } });
    if (!pageView)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Page view not found");
    return pageView;
};
const createPageView = async (payload) => {
    const data = {
        path: String(payload.path ?? ""),
        referrer: typeof payload.referrer === "string" ? payload.referrer : null,
        userAgent: typeof payload.userAgent === "string" ? payload.userAgent : null,
        ip: typeof payload.ip === "string" ? payload.ip : null,
        country: typeof payload.country === "string" ? payload.country : null,
        section: typeof payload.section === "string" ? payload.section : null,
        eventType: normalizeEventType(payload.eventType),
    };
    return prisma_1.prisma.pageView.create({ data });
};
const getPageViewsSummary = async (query) => {
    const from = typeof query.from === "string" ? new Date(query.from) : undefined;
    const to = typeof query.to === "string" ? new Date(query.to) : undefined;
    if (from && Number.isNaN(from.getTime())) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid 'from' date");
    }
    if (to && Number.isNaN(to.getTime())) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid 'to' date");
    }
    const where = {
        createdAt: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {}),
        },
    };
    const [totalViews, uniqueVisitorsByIp, topSectionsRaw, eventBreakdownRaw] = await Promise.all([
        prisma_1.prisma.pageView.count({ where }),
        prisma_1.prisma.pageView.groupBy({ by: ["ip"], where: { ...where, ip: { not: null } } }),
        prisma_1.prisma.pageView.groupBy({ by: ["section"], where: { ...where, section: { not: null } }, _count: { section: true }, orderBy: { _count: { section: "desc" } }, take: 10 }),
        prisma_1.prisma.pageView.groupBy({ by: ["eventType"], where, _count: { eventType: true }, orderBy: { _count: { eventType: "desc" } } }),
    ]);
    const topSections = topSectionsRaw
        .filter((item) => item.section)
        .map((item) => ({ section: item.section, count: item._count.section ?? 0 }));
    const eventBreakdown = eventBreakdownRaw.map((item) => ({ eventType: item.eventType, count: item._count.eventType ?? 0 }));
    return {
        totalViews,
        uniqueVisitors: uniqueVisitorsByIp.length,
        topSections,
        eventBreakdown,
    };
};
const deletePageView = async (id) => prisma_1.prisma.pageView.delete({ where: { id } });
exports.pageViewService = {
    getAllPageViews,
    getPageViewById,
    createPageView,
    getPageViewsSummary,
    deletePageView,
};
//# sourceMappingURL=pageView.service.js.map