"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const tag_service_1 = require("./tag.service");
const getAllTags = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await tag_service_1.tagService.getAllTags(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Tags retrieved successfully", data: result.data, meta: result.meta });
});
const getTagById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await tag_service_1.tagService.getTagById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Tag retrieved successfully", data: result });
});
const createTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await tag_service_1.tagService.createTag(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Tag created successfully", data: result });
});
const updateTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await tag_service_1.tagService.updateTag(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Tag updated successfully", data: result });
});
const deleteTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await tag_service_1.tagService.deleteTag(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Tag deleted successfully", data: result });
});
exports.tagController = { getAllTags, getTagById, createTag, updateTag, deleteTag };
//# sourceMappingURL=tag.controller.js.map