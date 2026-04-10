"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const education_service_1 = require("./education.service");
const getAllEducations = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await education_service_1.educationService.getAllEducations(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Educations retrieved successfully", data: result.data, meta: result.meta });
});
const getEducationById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await education_service_1.educationService.getEducationById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Education retrieved successfully", data: result });
});
const createEducation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await education_service_1.educationService.createEducation(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Education created successfully", data: result });
});
const updateEducation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await education_service_1.educationService.updateEducation(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Education updated successfully", data: result });
});
const deleteEducation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await education_service_1.educationService.deleteEducation(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Education deleted successfully", data: result });
});
exports.educationController = { getAllEducations, getEducationById, createEducation, updateEducation, deleteEducation };
//# sourceMappingURL=education.controller.js.map