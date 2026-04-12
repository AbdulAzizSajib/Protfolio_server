import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../../config/cloudinary.config.js";
import { prisma } from "../../lib/prisma.js";
const getPublicProfile = async () => {
    const profile = await prisma.profile.findFirst({
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
        throw new AppError(status.NOT_FOUND, "Public profile not found");
    }
    return profile;
};
const getMyProfile = async (userId) => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
        return prisma.profile.create({
            data: { userId },
        });
    }
    return profile;
};
const updateMyProfile = async (userId, payload, file) => {
    const existingProfile = await prisma.profile.findUnique({ where: { userId } });
    const updateData = { ...payload };
    if (file) {
        if (existingProfile?.avatarUrl) {
            await deleteFileFromCloudinary(existingProfile.avatarUrl);
        }
        const uploaded = await uploadFileToCloudinary(file.buffer, file.originalname);
        updateData.avatarUrl = uploaded.secure_url;
    }
    const profile = await prisma.profile.upsert({
        where: { userId },
        create: { userId, ...updateData },
        update: updateData,
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Profile not found");
    }
    return profile;
};
export const profileService = {
    getPublicProfile,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=profile.service.js.map