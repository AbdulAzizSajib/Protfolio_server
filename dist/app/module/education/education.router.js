import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { educationController } from "./education.controller";
import { EducationValidation } from "./education.validation";
const educationRouter = Router();
educationRouter.get("/", educationController.getAllEducations);
educationRouter.get("/:id", educationController.getEducationById);
educationRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(EducationValidation.createEducationZodSchema), educationController.createEducation);
educationRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(EducationValidation.updateEducationZodSchema), educationController.updateEducation);
educationRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), educationController.deleteEducation);
export default educationRouter;
//# sourceMappingURL=education.router.js.map