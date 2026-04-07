import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { experienceController } from "./experience.controller";
import { ExperienceValidation } from "./experience.validation";
const experienceRouter = Router();
experienceRouter.get("/", experienceController.getAllExperiences);
experienceRouter.get("/:id", experienceController.getExperienceById);
experienceRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(ExperienceValidation.createExperienceZodSchema), experienceController.createExperience);
experienceRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(ExperienceValidation.updateExperienceZodSchema), experienceController.updateExperience);
experienceRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), experienceController.deleteExperience);
export default experienceRouter;
//# sourceMappingURL=experience.router.js.map