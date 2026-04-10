import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { pageViewController } from "./pageView.controller";
import { PageViewValidation } from "./pageView.validation";

const pageViewRouter: Router = Router();

pageViewRouter.post("/", validateRequest(PageViewValidation.createPageViewZodSchema), pageViewController.createPageView);
pageViewRouter.get("/", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.getAllPageViews);
pageViewRouter.get("/summary", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.getPageViewsSummary);
pageViewRouter.get("/:id", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.getPageViewById);
pageViewRouter.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), pageViewController.deletePageView);

export default pageViewRouter;
