import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { projectService } from "./project.service";

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getAllProjects(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Projects retrieved successfully", data: result.data, meta: result.meta });
});
const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await projectService.getProjectById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Project retrieved successfully", data: result });
});
const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.createProject(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Project created successfully", data: result });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await projectService.updateProject(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Project updated successfully", data: result });
});
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await projectService.deleteProject(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Project deleted successfully", data: result });
});

export const projectController = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
