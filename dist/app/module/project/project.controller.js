import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { projectService } from "./project.service.js";
const getAllProjects = catchAsync(async (req, res) => {
    const result = await projectService.getAllProjects(req.query);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Projects retrieved successfully", data: result.data, meta: result.meta });
});
const getProjectById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await projectService.getProjectById(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Project retrieved successfully", data: result });
});
const createProject = catchAsync(async (req, res) => {
    const result = await projectService.createProject(req.body);
    sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Project created successfully", data: result });
});
const updateProject = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await projectService.updateProject(id, req.body);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Project updated successfully", data: result });
});
const deleteProject = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await projectService.deleteProject(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Project deleted successfully", data: result });
});
export const projectController = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
//# sourceMappingURL=project.controller.js.map