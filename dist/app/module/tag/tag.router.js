import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { tagController } from "./tag.controller";
import { TagValidation } from "./tag.validation";
const tagRouter = Router();
tagRouter.get("/", tagController.getAllTags);
tagRouter.get("/:id", tagController.getTagById);
tagRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TagValidation.createTagZodSchema), tagController.createTag);
tagRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TagValidation.updateTagZodSchema), tagController.updateTag);
tagRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), tagController.deleteTag);
export default tagRouter;
//# sourceMappingURL=tag.router.js.map