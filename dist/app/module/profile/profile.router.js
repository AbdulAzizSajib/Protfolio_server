"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const multer_config_1 = require("../../config/multer.config");
const profile_controller_1 = require("./profile.controller");
const profile_validation_1 = require("./profile.validation");
const profileRouter = (0, express_1.Router)();
profileRouter.get("/", profile_controller_1.profileController.getPublicProfile);
profileRouter.get("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), profile_controller_1.profileController.getMyProfile);
profileRouter.patch("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), multer_config_1.multerUpload.single("avatar"), (0, validateRequest_1.validateRequest)(profile_validation_1.ProfileValidation.updateProfileZodSchema), profile_controller_1.profileController.updateMyProfile);
exports.default = profileRouter;
//# sourceMappingURL=profile.router.js.map