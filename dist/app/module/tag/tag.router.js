"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const tag_controller_1 = require("./tag.controller");
const tag_validation_1 = require("./tag.validation");
const tagRouter = (0, express_1.Router)();
tagRouter.get("/", tag_controller_1.tagController.getAllTags);
tagRouter.get("/:id", tag_controller_1.tagController.getTagById);
tagRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(tag_validation_1.TagValidation.createTagZodSchema), tag_controller_1.tagController.createTag);
tagRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(tag_validation_1.TagValidation.updateTagZodSchema), tag_controller_1.tagController.updateTag);
tagRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), tag_controller_1.tagController.deleteTag);
exports.default = tagRouter;
//# sourceMappingURL=tag.router.js.map