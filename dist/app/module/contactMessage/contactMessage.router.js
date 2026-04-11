import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { contactMessageController } from "./contactMessage.controller.js";
import { ContactMessageValidation } from "./contactMessage.validation.js";
const contactMessageRouter = Router();
contactMessageRouter.post("/", validateRequest(ContactMessageValidation.createContactMessageZodSchema), contactMessageController.createContactMessage);
contactMessageRouter.get("/", checkAuth(Role.ADMIN, Role.OWNER), contactMessageController.getAllContactMessages);
contactMessageRouter.get("/:id", checkAuth(Role.ADMIN, Role.OWNER), contactMessageController.getContactMessageById);
contactMessageRouter.patch("/:id/status", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(ContactMessageValidation.updateContactMessageZodSchema), contactMessageController.updateContactMessageStatus);
contactMessageRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), contactMessageController.deleteContactMessage);
export default contactMessageRouter;
//# sourceMappingURL=contactMessage.router.js.map