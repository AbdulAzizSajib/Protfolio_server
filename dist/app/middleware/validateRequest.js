"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (zodSchema) => {
    return (req, res, next) => {
        const parsedResult = zodSchema.safeParse(req.body);
        if (!parsedResult.success) {
            return next(parsedResult.error);
        }
        //sanitizing the data
        req.body = parsedResult.data;
        return next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map