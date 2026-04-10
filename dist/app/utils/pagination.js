"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationOptions = void 0;
const getPaginationOptions = (query) => {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const sortBy = typeof query.sortBy === "string" && query.sortBy.trim() ? query.sortBy : "id";
    const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";
    const searchTerm = typeof query.searchTerm === "string" ? query.searchTerm.trim() : "";
    return { page, limit, skip, sortBy, sortOrder, searchTerm };
};
exports.getPaginationOptions = getPaginationOptions;
//# sourceMappingURL=pagination.js.map