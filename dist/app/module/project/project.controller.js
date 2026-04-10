"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const project_service_1 = require("./project.service");
const getAllProjects = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await project_service_1.projectService.getAllProjects(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Projects retrieved successfully", data: result.data, meta: result.meta });
});
const getProjectById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await project_service_1.projectService.getProjectById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Project retrieved successfully", data: result });
});
const createProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await project_service_1.projectService.createProject(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Project created successfully", data: result });
});
const updateProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await project_service_1.projectService.updateProject(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Project updated successfully", data: result });
});
const deleteProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await project_service_1.projectService.deleteProject(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Project deleted successfully", data: result });
});
exports.projectController = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
//# sourceMappingURL=project.controller.js.map