"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const category_service_1 = require("./category.service");
const getAllCategories = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await category_service_1.categoryService.getAllCategories(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Categories retrieved successfully", data: result.data, meta: result.meta });
});
const getCategoryById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await category_service_1.categoryService.getCategoryById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Category retrieved successfully", data: result });
});
const createCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await category_service_1.categoryService.createCategory(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Category created successfully", data: result });
});
const updateCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await category_service_1.categoryService.updateCategory(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Category updated successfully", data: result });
});
const deleteCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await category_service_1.categoryService.deleteCategory(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Category deleted successfully", data: result });
});
exports.categoryController = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
//# sourceMappingURL=category.controller.js.map