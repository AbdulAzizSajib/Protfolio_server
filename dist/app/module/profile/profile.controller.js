import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { profileService } from "./profile.service.js";
const getPublicProfile = catchAsync(async (_req, res) => {
    const result = await profileService.getPublicProfile();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Public profile retrieved successfully",
        data: result,
    });
});
const getMyProfile = catchAsync(async (req, res) => {
    const result = await profileService.getMyProfile(req.user.userId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Profile retrieved successfully",
        data: result,
    });
});
const updateMyProfile = catchAsync(async (req, res) => {
    const result = await profileService.updateMyProfile(req.user.userId, req.body, req.file);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
export const profileController = {
    getPublicProfile,
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=profile.controller.js.map