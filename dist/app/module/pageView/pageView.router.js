import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { pageViewController } from "./pageView.controller.js";
import { PageViewValidation } from "./pageView.validation.js";
const pageViewRouter = Router();
pageViewRouter.post("/", validateRequest(PageViewValidation.createPageViewZodSchema), pageViewController.createPageView);
pageViewRouter.get("/", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.getAllPageViews);
pageViewRouter.get("/summary", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.getPageViewsSummary);
pageViewRouter.get("/:id", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.getPageViewById);
pageViewRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.deletePageView);
export default pageViewRouter;
//# sourceMappingURL=pageView.router.js.map