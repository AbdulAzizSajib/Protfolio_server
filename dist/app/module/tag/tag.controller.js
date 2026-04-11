import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { tagService } from "./tag.service.js";
const getAllTags = catchAsync(async (req, res) => {
    const result = await tagService.getAllTags(req.query);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tags retrieved successfully", data: result.data, meta: result.meta });
});
const getTagById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await tagService.getTagById(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tag retrieved successfully", data: result });
});
const createTag = catchAsync(async (req, res) => {
    const result = await tagService.createTag(req.body);
    sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Tag created successfully", data: result });
});
const updateTag = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await tagService.updateTag(id, req.body);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tag updated successfully", data: result });
});
const deleteTag = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await tagService.deleteTag(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Tag deleted successfully", data: result });
});
export const tagController = { getAllTags, getTagById, createTag, updateTag, deleteTag };
//# sourceMappingURL=tag.controller.js.map