import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { multerUpload } from "../../config/multer.config.js";
import { profileController } from "./profile.controller.js";
import { ProfileValidation } from "./profile.validation.js";
const profileRouter = Router();
profileRouter.get("/", profileController.getPublicProfile);
profileRouter.get("/me", checkAuth(Role.ADMIN, Role.OWNER), profileController.getMyProfile);
profileRouter.patch("/me", checkAuth(Role.ADMIN, Role.OWNER), multerUpload.single("avatar"), validateRequest(ProfileValidation.updateProfileZodSchema), profileController.updateMyProfile);
export default profileRouter;
//# sourceMappingURL=profile.router.js.map