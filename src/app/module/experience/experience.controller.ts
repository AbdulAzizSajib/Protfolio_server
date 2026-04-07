import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { experienceService } from "./experience.service";

const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceService.getAllExperiences(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Experiences retrieved successfully", data: result.data, meta: result.meta });
});
const getExperienceById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await experienceService.getExperienceById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Experience retrieved successfully", data: result });
});
const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceService.createExperience(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Experience created successfully", data: result });
});
const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await experienceService.updateExperience(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Experience updated successfully", data: result });
});
const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await experienceService.deleteExperience(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Experience deleted successfully", data: result });
});

export const experienceController = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };
