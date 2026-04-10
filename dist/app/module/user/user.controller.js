"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const result = await user_service_1.userService.createAdmin(payload);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
});
const updateProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.userService.updateProfile(req.user.userId, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
const getMyDashboard = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.userService.getMyDashboard(req.user.userId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Dashboard data retrieved successfully",
        data: result,
    });
});
exports.userController = {
    createAdmin,
    updateProfile,
    getMyDashboard,
};
//# sourceMappingURL=user.controller.js.map