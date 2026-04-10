"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const contactMessage_controller_1 = require("./contactMessage.controller");
const contactMessage_validation_1 = require("./contactMessage.validation");
const contactMessageRouter = (0, express_1.Router)();
contactMessageRouter.post("/", (0, validateRequest_1.validateRequest)(contactMessage_validation_1.ContactMessageValidation.createContactMessageZodSchema), contactMessage_controller_1.contactMessageController.createContactMessage);
contactMessageRouter.get("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), contactMessage_controller_1.contactMessageController.getAllContactMessages);
contactMessageRouter.get("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), contactMessage_controller_1.contactMessageController.getContactMessageById);
contactMessageRouter.patch("/:id/status", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(contactMessage_validation_1.ContactMessageValidation.updateContactMessageZodSchema), contactMessage_controller_1.contactMessageController.updateContactMessageStatus);
contactMessageRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), contactMessage_controller_1.contactMessageController.deleteContactMessage);
exports.default = contactMessageRouter;
//# sourceMappingURL=contactMessage.router.js.map