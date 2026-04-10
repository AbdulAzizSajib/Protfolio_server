"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const validateRequest_1 = require("../../middleware/validateRequest");
const testimonial_controller_1 = require("./testimonial.controller");
const testimonial_validation_1 = require("./testimonial.validation");
const testimonialRouter = (0, express_1.Router)();
testimonialRouter.get("/", testimonial_controller_1.testimonialController.getAllTestimonials);
testimonialRouter.get("/:id", testimonial_controller_1.testimonialController.getTestimonialById);
testimonialRouter.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(testimonial_validation_1.TestimonialValidation.createTestimonialZodSchema), testimonial_controller_1.testimonialController.createTestimonial);
testimonialRouter.patch("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), (0, validateRequest_1.validateRequest)(testimonial_validation_1.TestimonialValidation.updateTestimonialZodSchema), testimonial_controller_1.testimonialController.updateTestimonial);
testimonialRouter.delete("/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.OWNER), testimonial_controller_1.testimonialController.deleteTestimonial);
exports.default = testimonialRouter;
//# sourceMappingURL=testimonial.router.js.map