import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { testimonialController } from "./testimonial.controller.js";
import { TestimonialValidation } from "./testimonial.validation.js";
const testimonialRouter = Router();
testimonialRouter.get("/", testimonialController.getAllTestimonials);
testimonialRouter.get("/:id", testimonialController.getTestimonialById);
testimonialRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TestimonialValidation.createTestimonialZodSchema), testimonialController.createTestimonial);
testimonialRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TestimonialValidation.updateTestimonialZodSchema), testimonialController.updateTestimonial);
testimonialRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), testimonialController.deleteTestimonial);
export default testimonialRouter;
//# sourceMappingURL=testimonial.router.js.map