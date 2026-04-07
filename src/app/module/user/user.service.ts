import status from "http-status";
import { User } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../../config/cloudinary.config";
import { ICreateAdmin } from "./user.interface";

const createAdmin = async (payload: ICreateAdmin) => {
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

const updateProfile = async (
  userId: string,
  payload: { name?: string; phone?: string },
  file?: Express.Multer.File,
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const updateData: { name?: string; phone?: string; image?: string } = {
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

const getMyDashboard = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const [
    projectsCount,
    featuredProjectsCount,
    testimonialsCount,
    approvedTestimonialsCount,
    contactMessagesCount,
    unreadContactMessagesCount,
    postsCount,
  ] = await Promise.all([
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
