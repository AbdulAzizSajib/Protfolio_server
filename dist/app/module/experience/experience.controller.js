"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const experience_service_1 = require("./experience.service");
const getAllExperiences = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.experienceService.getAllExperiences(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Experiences retrieved successfully", data: result.data, meta: result.meta });
});
const getExperienceById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await experience_service_1.experienceService.getExperienceById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Experience retrieved successfully", data: result });
});
const createExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.experienceService.createExperience(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Experience created successfully", data: result });
});
const updateExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await experience_service_1.experienceService.updateExperience(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Experience updated successfully", data: result });
});
const deleteExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await experience_service_1.experienceService.deleteExperience(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Experience deleted successfully", data: result });
});
exports.experienceController = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };
//# sourceMappingURL=experience.controller.js.map