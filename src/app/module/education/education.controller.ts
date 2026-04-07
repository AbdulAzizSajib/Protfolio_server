import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { educationService } from "./education.service";

const getAllEducations = catchAsync(async (req: Request, res: Response) => {
  const result = await educationService.getAllEducations(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Educations retrieved successfully", data: result.data, meta: result.meta });
});
const getEducationById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await educationService.getEducationById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Education retrieved successfully", data: result });
});
const createEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await educationService.createEducation(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Education created successfully", data: result });
});
const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await educationService.updateEducation(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Education updated successfully", data: result });
});
const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await educationService.deleteEducation(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Education deleted successfully", data: result });
});

export const educationController = { getAllEducations, getEducationById, createEducation, updateEducation, deleteEducation };
