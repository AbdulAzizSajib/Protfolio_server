"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactMessageController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = require("../../shared/sendResponse");
const contactMessage_service_1 = require("./contactMessage.service");
const getAllContactMessages = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contactMessage_service_1.contactMessageService.getAllContactMessages(req.query);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Contact messages retrieved successfully", data: result.data, meta: result.meta });
});
const getContactMessageById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await contactMessage_service_1.contactMessageService.getContactMessageById(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Contact message retrieved successfully", data: result });
});
const createContactMessage = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contactMessage_service_1.contactMessageService.createContactMessage(req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.CREATED, success: true, message: "Message sent successfully", data: result });
});
const updateContactMessageStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await contactMessage_service_1.contactMessageService.updateContactMessageStatus(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Contact message updated successfully", data: result });
});
const deleteContactMessage = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await contactMessage_service_1.contactMessageService.deleteContactMessage(id);
    (0, sendResponse_1.sendResponse)(res, { httpStatusCode: http_status_1.default.OK, success: true, message: "Contact message deleted successfully", data: result });
});
exports.contactMessageController = { getAllContactMessages, getContactMessageById, createContactMessage, updateContactMessageStatus, deleteContactMessage };
//# sourceMappingURL=contactMessage.controller.js.map