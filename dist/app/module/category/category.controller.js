import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { categoryService } from "./category.service.js";
const getAllCategories = catchAsync(async (req, res) => {
    const result = await categoryService.getAllCategories(req.query);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Categories retrieved successfully", data: result.data, meta: result.meta });
});
const getCategoryById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await categoryService.getCategoryById(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Category retrieved successfully", data: result });
});
const createCategory = catchAsync(async (req, res) => {
    const result = await categoryService.createCategory(req.body);
    sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Category created successfully", data: result });
});
const updateCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await categoryService.updateCategory(id, req.body);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Category updated successfully", data: result });
});
const deleteCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await categoryService.deleteCategory(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Category deleted successfully", data: result });
});
export const categoryController = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
//# sourceMappingURL=category.controller.js.map