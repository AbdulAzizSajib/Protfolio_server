import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { certificationController } from "./certification.controller.js";
import { CertificationValidation } from "./certification.validation.js";
const certificationRouter = Router();
certificationRouter.get("/", certificationController.getAllCertifications);
certificationRouter.get("/:id", certificationController.getCertificationById);
certificationRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(CertificationValidation.createCertificationZodSchema), certificationController.createCertification);
certificationRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(CertificationValidation.updateCertificationZodSchema), certificationController.updateCertification);
certificationRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), certificationController.deleteCertification);
export default certificationRouter;
//# sourceMappingURL=certification.router.js.map