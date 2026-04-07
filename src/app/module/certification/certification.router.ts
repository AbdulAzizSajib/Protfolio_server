import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { certificationController } from "./certification.controller";
import { CertificationValidation } from "./certification.validation";

const certificationRouter: Router = Router();

certificationRouter.get("/", certificationController.getAllCertifications);
certificationRouter.get("/:id", certificationController.getCertificationById);
certificationRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(CertificationValidation.createCertificationZodSchema), certificationController.createCertification);
certificationRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(CertificationValidation.updateCertificationZodSchema), certificationController.updateCertification);
certificationRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), certificationController.deleteCertification);

export default certificationRouter;
