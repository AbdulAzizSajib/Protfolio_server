"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const certification_controller_1 = require("./certification.controller");
const certification_validation_1 = require("./certification.validation");
const certificationRouter = (0, express_1.Router)();
certificationRouter.get("/", certification_controller_1.certificationController.getAllCertifications);
certificationRouter.get("/:id", certification_controller_1.certificationController.getCertificationById);
certificationRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(certification_validation_1.CertificationValidation.createCertificationZodSchema), certification_controller_1.certificationController.createCertification);
certificationRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(certification_validation_1.CertificationValidation.updateCertificationZodSchema), certification_controller_1.certificationController.updateCertification);
certificationRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), certification_controller_1.certificationController.deleteCertification);
exports.default = certificationRouter;
//# sourceMappingURL=certification.router.js.map