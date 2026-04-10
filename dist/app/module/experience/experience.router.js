"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const experience_controller_1 = require("./experience.controller");
const experience_validation_1 = require("./experience.validation");
const experienceRouter = (0, express_1.Router)();
experienceRouter.get("/", experience_controller_1.experienceController.getAllExperiences);
experienceRouter.get("/:id", experience_controller_1.experienceController.getExperienceById);
experienceRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(experience_validation_1.ExperienceValidation.createExperienceZodSchema), experience_controller_1.experienceController.createExperience);
experienceRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(experience_validation_1.ExperienceValidation.updateExperienceZodSchema), experience_controller_1.experienceController.updateExperience);
experienceRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), experience_controller_1.experienceController.deleteExperience);
exports.default = experienceRouter;
//# sourceMappingURL=experience.router.js.map