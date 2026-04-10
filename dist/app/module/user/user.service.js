"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const auth_1 = require("../../lib/auth");
const prisma_1 = require("../../lib/prisma");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createAdmin = async (payload) => {
    const userExists = await prisma_1.prisma.user.findUnique({
        where: {
            email: payload.admin.email,
        },
    });
    if (userExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User with this email already exists");
    }
    const { admin, role, password } = payload;
    const userData = await auth_1.auth.api.signUpEmail({
        body: {
            ...admin,
            password,
            role,
        },
    });
    return {
        id: userData.user.id,
        name: userData.user.name,
        email: userData.user.email,
        role: userData.user.role,
        emailVerified: userData.user.emailVerified,
    };
};
const updateProfile = async (userId, payload, file) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const updateData = {
        ...payload,
    };
    if (file) {
        // Delete old image if exists
        if (user.image) {
            await (0, cloudinary_config_1.deleteFileFromCloudinary)(user.image);
        }
        const uploaded = await (0, cloudinary_config_1.uploadFileToCloudinary)(file.buffer, file.originalname);
        updateData.image = uploaded.secure_url;
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: updateData,
    });
    return updatedUser;
};
const getMyDashboard = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const [projectsCount, featuredProjectsCount, testimonialsCount, approvedTestimonialsCount, contactMessagesCount, unreadContactMessagesCount, postsCount,] = await Promise.all([
        prisma_1.prisma.project.count(),
        prisma_1.prisma.project.count({ where: { featured: true } }),
        prisma_1.prisma.testimonial.count(),
        prisma_1.prisma.testimonial.count({ where: { approved: true } }),
        prisma_1.prisma.contactMessage.count(),
        prisma_1.prisma.contactMessage.count({ where: { status: "UNREAD" } }),
        prisma_1.prisma.post.count(),
    ]);
    return {
        user,
        counts: {
            projects: projectsCount,
            featuredProjects: featuredProjectsCount,
            testimonials: testimonialsCount,
            approvedTestimonials: approvedTestimonialsCount,
            contactMessages: contactMessagesCount,
            unreadContactMessages: unreadContactMessagesCount,
            posts: postsCount,
        },
        profile: user?.profile ?? null,
    };
};
exports.userService = {
    createAdmin,
    updateProfile,
    getMyDashboard,
};
//# sourceMappingURL=user.service.js.map