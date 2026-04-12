import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { aboutService } from "./about.service";

const getPublicAbout = catchAsync(async (_req: Request, res: Response) => {
  const result = await aboutService.getPublicAbout();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "About information retrieved successfully",
    data: result,
  });
});

const upsertAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutService.upsertAbout(req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "About information saved successfully",
    data: result,
  });
});

export const aboutController = {
  getPublicAbout,
  upsertAbout,
};
