"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/", category_controller_1.categoryController.getAllCategories);
categoryRouter.get("/:id", category_controller_1.categoryController.getCategoryById);
categoryRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.categoryController.createCategory);
categoryRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(category_validation_1.CategoryValidation.updateCategoryZodSchema), category_controller_1.categoryController.updateCategory);
categoryRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), category_controller_1.categoryController.deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=category.router.js.map