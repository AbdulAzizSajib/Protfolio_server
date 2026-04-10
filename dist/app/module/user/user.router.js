"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validation_1 = require("./user.validation");
const checkAuth_1 = require("../../middleware/checkAuth");
const enums_1 = require("../../../generated/prisma/enums");
const multer_config_1 = require("../../config/multer.config");
const userRouter = (0, express_1.Router)();
// Dashboard
userRouter.get("/dashboard", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), user_controller_1.userController.getMyDashboard);
// Update profile (form-data with optional image file)
userRouter.patch("/profile", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), multer_config_1.multerUpload.single("image"), (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.updateProfileZodSchema), user_controller_1.userController.updateProfile);
// Create admin (OWNER or ADMIN only)
userRouter.post("/create-admin", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.createAdminZodSchema), user_controller_1.userController.createAdmin);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map