import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { tagService } from "./tag.service";

const getAllTags = catchAsync(async (req: Request, res: Response) => {
  const result = await tagService.getAllTags(req.query as Record<string, unknown>);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tags retrieved successfully", data: result.data, meta: result.meta });
});
const getTagById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await tagService.getTagById(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tag retrieved successfully", data: result });
});
const createTag = catchAsync(async (req: Request, res: Response) => {
  const result = await tagService.createTag(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Tag created successfully", data: result });
});
const updateTag = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await tagService.updateTag(id, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tag updated successfully", data: result });
});
const deleteTag = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await tagService.deleteTag(id);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tag deleted successfully", data: result });
});

export const tagController = { getAllTags, getTagById, createTag, updateTag, deleteTag };
