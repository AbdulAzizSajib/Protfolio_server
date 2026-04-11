import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { auth } from "../../lib/auth.js";
import { prisma } from "../../lib/prisma.js";
import { deleteFileFromCloudinary, uploadFileToCloudinary, } from "../../config/cloudinary.config.js";
const createAdmin = async (payload) => {
    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.admin.email,
        },
    });
    if (userExists) {
        throw new AppError(status.CONFLICT, "User with this email already exists");
    }
    const { admin, role, password } = payload;
    const userData = await auth.api.signUpEmail({
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
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    const updateData = {
        ...payload,
    };
    if (file) {
        // Delete old image if exists
        if (user.image) {
            await deleteFileFromCloudinary(user.image);
        }
        const uploaded = await uploadFileToCloudinary(file.buffer, file.originalname);
        updateData.image = uploaded.secure_url;
    }
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });
    return updatedUser;
};
const getMyDashboard = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
        },
    });
    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    const [projectsCount, featuredProjectsCount, testimonialsCount, approvedTestimonialsCount, contactMessagesCount, unreadContactMessagesCount, postsCount,] = await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { featured: true } }),
        prisma.testimonial.count(),
        prisma.testimonial.count({ where: { approved: true } }),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { status: "UNREAD" } }),
        prisma.post.count(),
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
export const userService = {
    createAdmin,
    updateProfile,
    getMyDashboard,
};
//# sourceMappingURL=user.service.js.map