"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const skill_controller_1 = require("./skill.controller");
const skill_validation_1 = require("./skill.validation");
const skillRouter = (0, express_1.Router)();
skillRouter.get("/", skill_controller_1.skillController.getAllSkills);
skillRouter.get("/:id", skill_controller_1.skillController.getSkillById);
skillRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(skill_validation_1.SkillValidation.createSkillZodSchema), skill_controller_1.skillController.createSkill);
skillRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(skill_validation_1.SkillValidation.updateSkillZodSchema), skill_controller_1.skillController.updateSkill);
skillRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), skill_controller_1.skillController.deleteSkill);
exports.default = skillRouter;
//# sourceMappingURL=skill.router.js.map