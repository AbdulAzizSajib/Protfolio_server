import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { contactMessageService } from "./contactMessage.service";

const getAllContactMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await contactMessageService.getAllContactMessages(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Contact messages retrieved successfully", data: result.data, meta: result.meta });
});
const getContactMessageById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await contactMessageService.getContactMessageById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Contact message retrieved successfully", data: result });
});
const createContactMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await contactMessageService.createContactMessage(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Message sent successfully", data: result });
});
const updateContactMessageStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await contactMessageService.updateContactMessageStatus(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Contact message updated successfully", data: result });
});
const deleteContactMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await contactMessageService.deleteContactMessage(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Contact message deleted successfully", data: result });
});

export const contactMessageController = { getAllContactMessages, getContactMessageById, createContactMessage, updateContactMessageStatus, deleteContactMessage };
