"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const cloudinary_config_1 = require("../../config/cloudinary.config");
const prisma_1 = require("../../lib/prisma");
const getPublicProfile = async () => {
    const profile = await prisma_1.prisma.profile.findFirst({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Public profile not found");
    }
    return profile;
};
const getMyProfile = async (userId) => {
    const profile = await prisma_1.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
        return prisma_1.prisma.profile.create({
            data: { userId },
        });
    }
    return profile;
};
const updateMyProfile = async (userId, payload, file) => {
    const existingProfile = await prisma_1.prisma.profile.findUnique({ where: { userId } });
    const updateData = { ...payload };
    if (file) {
        if (existingProfile?.avatarUrl) {
            await (0, cloudinary_config_1.deleteFileFromCloudinary)(existingProfile.avatarUrl);
        }
        const uploaded = await (0, cloudinary_config_1.uploadFileToCloudinary)(file.buffer, file.originalname);
        updateData.avatarUrl = uploaded.secure_url;
    }
    const profile = await prisma_1.prisma.profile.upsert({
        where: { userId },
        create: { userId, ...updateData },
        update: updateData,
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Profile not found");
    }
    return profile;
};
exports.profileService = {
    getPublicProfile,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=profile.service.js.map