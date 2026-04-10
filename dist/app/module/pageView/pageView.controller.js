"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageViewController = void 0;
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const pageView_service_1 = require("./pageView.service");
const getCountryFromHeaders = (req) => {
    const headerCandidates = [
        req.get("cf-ipcountry"),
        req.get("x-vercel-ip-country"),
        req.get("x-country-code"),
    ];
    for (const value of headerCandidates) {
        if (!value)
            continue;
        const country = value.trim().toUpperCase();
        if (!country || country === "XX" || country === "T1")
            continue;
        if (/^[A-Z]{2}$/.test(country))
            return country;
    }
    return null;
};
const getClientIp = (req) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    const realIp = req.headers["x-real-ip"];
    let rawIp;
    if (typeof forwardedFor === "string" && forwardedFor.trim()) {
        rawIp = forwardedFor.split(",")[0]?.trim();
    }
    else if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
        rawIp = forwardedFor[0]?.trim();
    }
    else if (typeof realIp === "string" && realIp.trim()) {
        rawIp = realIp.trim();
    }
    else if (req.ip) {
        rawIp = req.ip;
    }
    if (!rawIp)
        return null;
    if (rawIp.startsWith("::ffff:"))
        return rawIp.replace("::ffff:", "");
    if (rawIp === "::1")
        return "127.0.0.1";
    return rawIp;
};
const getCountryFromIp = (ip) => {
    if (!ip)
        return null;
    const lookup = geoip_lite_1.default.lookup(ip);
    return lookup?.country ?? null;
};
const getAllPageViews = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await pageView_service_1.pageViewService.getAllPageViews(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Page views retrieved successfully", data: result.data, meta: result.meta });
});
const getPageViewById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await pageView_service_1.pageViewService.getPageViewById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Page view retrieved successfully", data: result });
});
const getPageViewsSummary = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await pageView_service_1.pageViewService.getPageViewsSummary(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Page view summary retrieved successfully", data: result });
});
const createPageView = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const clientIp = getClientIp(req);
    const country = getCountryFromHeaders(req) ?? getCountryFromIp(clientIp);
    const body = req.body;
    const result = await pageView_service_1.pageViewService.createPageView({
        ...body,
        ip: clientIp,
        country,
        userAgent: typeof body.userAgent === "string" ? body.userAgent : req.get("user-agent"),
        referrer: typeof body.referrer === "string" ? body.referrer : req.get("referer"),
    });
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Page view created successfully", data: result });
});
const deletePageView = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await pageView_service_1.pageViewService.deletePageView(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Page view deleted successfully", data: result });
});
exports.pageViewController = {
    getAllPageViews,
    getPageViewById,
    getPageViewsSummary,
    createPageView,
    deletePageView,
};
//# sourceMappingURL=pageView.controller.js.map