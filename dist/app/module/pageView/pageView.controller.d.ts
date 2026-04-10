import { Request, Response } from "express";
export declare const pageViewController: {
    getAllPageViews: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPageViewById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPageViewsSummary: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    createPageView: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deletePageView: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=pageView.controller.d.ts.map