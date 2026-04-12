import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { skillService } from "./skill.service.js";
const getAllSkills = catchAsync(async (req, res) => {
    const result = await skillService.getAllSkills(req.query);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skills retrieved successfully", data: result.data, meta: result.meta });
});
const getSkillById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await skillService.getSkillById(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skill retrieved successfully", data: result });
});
const createSkill = catchAsync(async (req, res) => {
    const result = await skillService.createSkill(req.body);
    sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Skill created successfully", data: result });
});
const updateSkill = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await skillService.updateSkill(id, req.body);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skill updated successfully", data: result });
});
const deleteSkill = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await skillService.deleteSkill(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Skill deleted successfully", data: result });
});
export const skillController = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
//# sourceMappingURL=skill.controller.js.map