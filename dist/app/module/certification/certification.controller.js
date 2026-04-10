"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const certification_service_1 = require("./certification.service");
const getAllCertifications = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await certification_service_1.certificationService.getAllCertifications(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Certifications retrieved successfully", data: result.data, meta: result.meta });
});
const getCertificationById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await certification_service_1.certificationService.getCertificationById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Certification retrieved successfully", data: result });
});
const createCertification = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await certification_service_1.certificationService.createCertification(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Certification created successfully", data: result });
});
const updateCertification = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await certification_service_1.certificationService.updateCertification(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Certification updated successfully", data: result });
});
const deleteCertification = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await certification_service_1.certificationService.deleteCertification(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Certification deleted successfully", data: result });
});
exports.certificationController = { getAllCertifications, getCertificationById, createCertification, updateCertification, deleteCertification };
//# sourceMappingURL=certification.controller.js.map