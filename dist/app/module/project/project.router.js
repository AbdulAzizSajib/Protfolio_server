"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const projectRouter = (0, express_1.Router)();
projectRouter.get("/", project_controller_1.projectController.getAllProjects);
projectRouter.get("/:id", project_controller_1.projectController.getProjectById);
projectRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(project_validation_1.ProjectValidation.createProjectZodSchema), project_controller_1.projectController.createProject);
projectRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(project_validation_1.ProjectValidation.updateProjectZodSchema), project_controller_1.projectController.updateProject);
projectRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), project_controller_1.projectController.deleteProject);
exports.default = projectRouter;
//# sourceMappingURL=project.router.js.map