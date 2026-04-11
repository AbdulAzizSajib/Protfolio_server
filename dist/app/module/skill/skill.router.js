import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { skillController } from "./skill.controller.js";
import { SkillValidation } from "./skill.validation.js";
const skillRouter = Router();
skillRouter.get("/", skillController.getAllSkills);
skillRouter.get("/:id", skillController.getSkillById);
skillRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(SkillValidation.createSkillZodSchema), skillController.createSkill);
skillRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(SkillValidation.updateSkillZodSchema), skillController.updateSkill);
skillRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), skillController.deleteSkill);
export default skillRouter;
//# sourceMappingURL=skill.router.js.map