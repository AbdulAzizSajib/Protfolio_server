import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { skillController } from "./skill.controller";
import { SkillValidation } from "./skill.validation";

const skillRouter: Router = Router();

skillRouter.get("/", skillController.getAllSkills);
skillRouter.get("/:id", skillController.getSkillById);
skillRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(SkillValidation.createSkillZodSchema), skillController.createSkill);
skillRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(SkillValidation.updateSkillZodSchema), skillController.updateSkill);
skillRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), skillController.deleteSkill);

export default skillRouter;
