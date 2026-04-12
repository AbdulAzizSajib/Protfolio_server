import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { projectController } from "./project.controller.js";
import { ProjectValidation } from "./project.validation.js";
const projectRouter = Router();
projectRouter.get("/", projectController.getAllProjects);
projectRouter.get("/:id", projectController.getProjectById);
projectRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(ProjectValidation.createProjectZodSchema), projectController.createProject);
projectRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(ProjectValidation.updateProjectZodSchema), projectController.updateProject);
projectRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), projectController.deleteProject);
export default projectRouter;
//# sourceMappingURL=project.router.js.map