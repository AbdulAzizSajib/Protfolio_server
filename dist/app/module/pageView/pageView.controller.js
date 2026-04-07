import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { pageViewService } from "./pageView.service";
const getAllPageViews = catchAsync(async (req, res) => {
    const result = await pageViewService.getAllPageViews(req.query);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Page views retrieved successfully", data: result.data, meta: result.meta });
});
const getPageViewById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await pageViewService.getPageViewById(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Page view retrieved successfully", data: result });
});
const createPageView = catchAsync(async (req, res) => {
    const result = await pageViewService.createPageView(req.body);
    sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Page view created successfully", data: result });
});
const deletePageView = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await pageViewService.deletePageView(id);
    sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Page view deleted successfully", data: result });
});
export const pageViewController = { getAllPageViews, getPageViewById, createPageView, deletePageView };
//# sourceMappingURL=pageView.controller.js.map