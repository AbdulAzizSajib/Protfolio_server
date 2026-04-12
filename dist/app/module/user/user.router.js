import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { UserValidation } from "./user.validation.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { Role } from "../../../generated/prisma/enums.js";
import { multerUpload } from "../../config/multer.config.js";
const userRouter = Router();
// Dashboard
userRouter.get("/dashboard", checkAuth(Role.ADMIN, Role.OWNER), userController.getMyDashboard);
// Update profile (form-data with optional image file)
userRouter.patch("/profile", checkAuth(Role.ADMIN, Role.OWNER), multerUpload.single("image"), validateRequest(UserValidation.updateProfileZodSchema), userController.updateProfile);
// Create admin (OWNER or ADMIN only)
userRouter.post("/create-admin", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(UserValidation.createAdminZodSchema), userController.createAdmin);
export default userRouter;
//# sourceMappingURL=user.router.js.map