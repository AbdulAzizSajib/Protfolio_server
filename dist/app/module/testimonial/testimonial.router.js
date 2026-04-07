import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { testimonialController } from "./testimonial.controller";
import { TestimonialValidation } from "./testimonial.validation";
const testimonialRouter = Router();
testimonialRouter.get("/", testimonialController.getAllTestimonials);
testimonialRouter.get("/:id", testimonialController.getTestimonialById);
testimonialRouter.post("/", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TestimonialValidation.createTestimonialZodSchema), testimonialController.createTestimonial);
testimonialRouter.patch("/:id", checkAuth(Role.ADMIN, Role.OWNER), validateRequest(TestimonialValidation.updateTestimonialZodSchema), testimonialController.updateTestimonial);
testimonialRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), testimonialController.deleteTestimonial);
export default testimonialRouter;
//# sourceMappingURL=testimonial.router.js.map