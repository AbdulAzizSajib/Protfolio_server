"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            // console.error(error);
            // res.status(500).json({
            //   success: false,
            //   message: "An unexpected error occurred",
            //   error: error instanceof Error ? error.message : String(error),
            // });
            next(error);
        }
    };
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=catchAsync.js.map