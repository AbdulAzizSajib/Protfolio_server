import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { tagController } from "./tag.controller.js";
import { TagValidation } from "./tag.validation.js";
const tagRouter = Router();
tagRouter.get("/", tagController.getAllTags);
tagRouter.get("/:id", tagController.getTagById);
tagRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TagValidation.createTagZodSchema), tagController.createTag);
tagRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TagValidation.updateTagZodSchema), tagController.updateTag);
tagRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), tagController.deleteTag);
export default tagRouter;
//# sourceMappingURL=tag.router.js.map