import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { multerUpload } from "../../config/multer.config";
import { profileController } from "./profile.controller";
import { ProfileValidation } from "./profile.validation";
const profileRouter = Router();
profileRouter.get("/", profileController.getPublicProfile);
profileRouter.get("/me", checkAuth(Role.ADMIN, Role.OWNER), profileController.getMyProfile);
profileRouter.patch("/me", checkAuth(Role.ADMIN, Role.OWNER), multerUpload.single("avatar"), validateRequest(ProfileValidation.updateProfileZodSchema), profileController.updateMyProfile);
export default profileRouter;
//# sourceMappingURL=profile.router.js.map