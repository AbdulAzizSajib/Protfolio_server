import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { categoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(CategoryValidation.createCategoryZodSchema), categoryController.createCategory);
categoryRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(CategoryValidation.updateCategoryZodSchema), categoryController.updateCategory);
categoryRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), categoryController.deleteCategory);

export default categoryRouter;
