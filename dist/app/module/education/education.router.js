"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const education_controller_1 = require("./education.controller");
const education_validation_1 = require("./education.validation");
const educationRouter = (0, express_1.Router)();
educationRouter.get("/", education_controller_1.educationController.getAllEducations);
educationRouter.get("/:id", education_controller_1.educationController.getEducationById);
educationRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(education_validation_1.EducationValidation.createEducationZodSchema), education_controller_1.educationController.createEducation);
educationRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(education_validation_1.EducationValidation.updateEducationZodSchema), education_controller_1.educationController.updateEducation);
educationRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), education_controller_1.educationController.deleteEducation);
exports.default = educationRouter;
//# sourceMappingURL=education.router.js.map