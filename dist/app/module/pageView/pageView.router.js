"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const pageView_controller_1 = require("./pageView.controller");
const pageView_validation_1 = require("./pageView.validation");
const pageViewRouter = (0, express_1.Router)();
pageViewRouter.post("/", (0, validateRequest_1.validateRequest)(pageView_validation_1.PageViewValidation.createPageViewZodSchema), pageView_controller_1.pageViewController.createPageView);
pageViewRouter.get("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), pageView_controller_1.pageViewController.getAllPageViews);
pageViewRouter.get("/summary", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), pageView_controller_1.pageViewController.getPageViewsSummary);
pageViewRouter.get("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), pageView_controller_1.pageViewController.getPageViewById);
pageViewRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), pageView_controller_1.pageViewController.deletePageView);
exports.default = pageViewRouter;
//# sourceMappingURL=pageView.router.js.map