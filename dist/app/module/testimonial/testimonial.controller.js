"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const testimonial_service_1 = require("./testimonial.service");
const getAllTestimonials = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await testimonial_service_1.testimonialService.getAllTestimonials(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Testimonials retrieved successfully", data: result.data, meta: result.meta });
});
const getTestimonialById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await testimonial_service_1.testimonialService.getTestimonialById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Testimonial retrieved successfully", data: result });
});
const createTestimonial = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await testimonial_service_1.testimonialService.createTestimonial(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Testimonial created successfully", data: result });
});
const updateTestimonial = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await testimonial_service_1.testimonialService.updateTestimonial(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Testimonial updated successfully", data: result });
});
const deleteTestimonial = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await testimonial_service_1.testimonialService.deleteTestimonial(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Testimonial deleted successfully", data: result });
});
exports.testimonialController = { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
//# sourceMappingURL=testimonial.controller.js.map