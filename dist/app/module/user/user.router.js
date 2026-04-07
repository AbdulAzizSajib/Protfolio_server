import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
const userRouter = Router();
// Dashboard
userRouter.get("/dashboard", checkAuth(Role.ADMIN, Role.OWNER), userController.getMyDashboard);
// Update profile (form-data with optional image file)
userRouter.patch("/profile", checkAuth(Role.ADMIN, Role.OWNER), multerUpload.single("image"), validateRequest(UserValidation.updateProfileZodSchema), userController.updateProfile);
// Create admin (OWNER or ADMIN only)
userRouter.post("/create-admin", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(UserValidation.createAdminZodSchema), userController.createAdmin);
export default userRouter;
//# sourceMappingURL=user.router.js.map