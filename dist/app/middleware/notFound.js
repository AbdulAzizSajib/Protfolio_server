"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const http_status_1 = __importDefault(require("http-status"));
const notFoundMiddleware = (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
//# sourceMappingURL=notFound.js.map