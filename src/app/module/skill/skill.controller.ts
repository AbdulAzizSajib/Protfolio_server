import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { skillService } from "./skill.service";

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.getAllSkills(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skills retrieved successfully", data: result.data, meta: result.meta });
});
const getSkillById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await skillService.getSkillById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skill retrieved successfully", data: result });
});
const createSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.createSkill(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Skill created successfully", data: result });
});
const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await skillService.updateSkill(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skill updated successfully", data: result });
});
const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await skillService.deleteSkill(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skill deleted successfully", data: result });
});

export const skillController = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
