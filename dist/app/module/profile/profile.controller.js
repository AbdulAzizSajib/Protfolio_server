"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const profile_service_1 = require("./profile.service");
const getPublicProfile = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await profile_service_1.profileService.getPublicProfile();
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Public profile retrieved successfully",
        data: result,
    });
});
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await profile_service_1.profileService.getMyProfile(req.user.userId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Profile retrieved successfully",
        data: result,
    });
});
const updateMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await profile_service_1.profileService.updateMyProfile(req.user.userId, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
exports.profileController = {
    getPublicProfile,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=profile.controller.js.map