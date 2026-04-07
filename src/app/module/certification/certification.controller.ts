import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { certificationService } from "./certification.service";

const getAllCertifications = catchAsync(async (req: Request, res: Response) => {
  const result = await certificationService.getAllCertifications(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Certifications retrieved successfully", data: result.data, meta: result.meta });
});
const getCertificationById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await certificationService.getCertificationById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Certification retrieved successfully", data: result });
});
const createCertification = catchAsync(async (req: Request, res: Response) => {
  const result = await certificationService.createCertification(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Certification created successfully", data: result });
});
const updateCertification = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await certificationService.updateCertification(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Certification updated successfully", data: result });
});
const deleteCertification = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await certificationService.deleteCertification(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Certification deleted successfully", data: result });
});

export const certificationController = { getAllCertifications, getCertificationById, createCertification, updateCertification, deleteCertification };
