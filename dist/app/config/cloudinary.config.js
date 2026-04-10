"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.deleteFileFromCloudinary = exports.uploadFileToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const env_1 = require("./env");
cloudinary_1.v2.config({
    cloud_name: env_1.envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: env_1.envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
});
const uploadFileToCloudinary = async (buffer, fileName) => {
    if (!buffer || !fileName) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "File buffer and file name are required for upload");
    }
    const fileNameWithoutExtension = fileName
        .split(".")
        .slice(0, -1)
        .join(".")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    const uniqueName = Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileNameWithoutExtension;
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({
            resource_type: "image",
            public_id: `event-management/images/${uniqueName}`,
            folder: "event-management/images",
        }, (error, result) => {
            if (error) {
                return reject(new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to upload image to Cloudinary"));
            }
            resolve(result);
        })
            .end(buffer);
    });
};
exports.uploadFileToCloudinary = uploadFileToCloudinary;
const deleteFileFromCloudinary = async (url) => {
    try {
        const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
        const match = url.match(regex);
        if (match && match[1]) {
            const publicId = match[1];
            await cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: "image",
            });
        }
    }
    catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to delete file from Cloudinary");
    }
};
exports.deleteFileFromCloudinary = deleteFileFromCloudinary;
exports.cloudinaryUpload = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.config.js.map