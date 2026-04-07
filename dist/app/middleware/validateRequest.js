export const validateRequest = (zodSchema) => {
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
//# sourceMappingURL=validateRequest.js.map