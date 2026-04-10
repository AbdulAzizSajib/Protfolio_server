"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const skill_service_1 = require("./skill.service");
const getAllSkills = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.skillService.getAllSkills(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Skills retrieved successfully", data: result.data, meta: result.meta });
});
const getSkillById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await skill_service_1.skillService.getSkillById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Skill retrieved successfully", data: result });
});
const createSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.skillService.createSkill(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Skill created successfully", data: result });
});
const updateSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await skill_service_1.skillService.updateSkill(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Skill updated successfully", data: result });
});
const deleteSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await skill_service_1.skillService.deleteSkill(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Skill deleted successfully", data: result });
});
exports.skillController = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
//# sourceMappingURL=skill.controller.js.map