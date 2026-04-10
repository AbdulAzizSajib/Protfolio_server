import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { aboutController } from "./about.controller";
import { AboutValidation } from "./about.validation";

const aboutRouter: Router = Router();

aboutRouter.get("/", aboutController.getPublicAbout);
aboutRouter.put(
  "/",
  checkAuth(Role.ADMIN, Role.OWNER),
  validateRequest(AboutValidation.upsertAboutZodSchema),
  aboutController.upsertAbout,
);

export default aboutRouter;
