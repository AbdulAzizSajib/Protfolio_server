import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { testimonialService } from "./testimonial.service";
const getAllTestimonials = catchAsync(async (req, res) => {
    const result = await testimonialService.getAllTestimonials(req.query);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Testimonials retrieved successfully", data: result.data, meta: result.meta });
});
const getTestimonialById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await testimonialService.getTestimonialById(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Testimonial retrieved successfully", data: result });
});
const createTestimonial = catchAsync(async (req, res) => {
    const result = await testimonialService.createTestimonial(req.body);
    sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Testimonial created successfully", data: result });
});
const updateTestimonial = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await testimonialService.updateTestimonial(id, req.body);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Testimonial updated successfully", data: result });
});
const deleteTestimonial = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await testimonialService.deleteTestimonial(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Testimonial deleted successfully", data: result });
});
export const testimonialController = { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
//# sourceMappingURL=testimonial.controller.js.map