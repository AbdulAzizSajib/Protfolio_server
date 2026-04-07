import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { contactMessageController } from "./contactMessage.controller";
import { ContactMessageValidation } from "./contactMessage.validation";

const contactMessageRouter: Router = Router();

contactMessageRouter.post("/", validateRequest(ContactMessageValidation.createContactMessageZodSchema), contactMessageController.createContactMessage);
contactMessageRouter.get("/", checkAuth(Role.ADMIN, Role.OWNER), contactMessageController.getAllContactMessages);
contactMessageRouter.get("/:id", checkAuth(Role.ADMIN, Role.OWNER), contactMessageController.getContactMessageById);
contactMessageRouter.patch("/:id/status", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(ContactMessageValidation.updateContactMessageZodSchema), contactMessageController.updateContactMessageStatus);
contactMessageRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), contactMessageController.deleteContactMessage);

export default contactMessageRouter;
