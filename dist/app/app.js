"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_1 = require("better-auth/node");
const path_1 = __importDefault(require("path"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const profile_router_1 = __importDefault(require("./module/profile/profile.router"));
const about_router_1 = __importDefault(require("./module/about/about.router"));
const category_router_1 = __importDefault(require("./module/category/category.router"));
const tag_router_1 = __importDefault(require("./module/tag/tag.router"));
const skill_router_1 = __importDefault(require("./module/skill/skill.router"));
const project_router_1 = __importDefault(require("./module/project/project.router"));
const experience_router_1 = __importDefault(require("./module/experience/experience.router"));
const education_router_1 = __importDefault(require("./module/education/education.router"));
const certification_router_1 = __importDefault(require("./module/certification/certification.router"));
const testimonial_router_1 = __importDefault(require("./module/testimonial/testimonial.router"));
const contactMessage_router_1 = __importDefault(require("./module/contactMessage/contactMessage.router"));
const pageView_router_1 = __importDefault(require("./module/pageView/pageView.router"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const notFound_1 = require("./middleware/notFound");
const env_1 = require("./config/env");
const auth_1 = require("./lib/auth");
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve(process.cwd(), `src/app/templates`));
app.use((0, cors_1.default)({
    origin: [
        env_1.envVars.FRONTEND_URL,
        env_1.envVars.BETTER_AUTH_URL,
        "http://localhost:3000",
        "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Better Auth handler (must be before body parsers)
app.use("/api/auth", (0, node_1.toNodeHandler)(auth_1.auth));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// server health check
app.get("/", (_req, res) => {
    res.status(200).send("Server is running...");
});
app.use("/api/v1/auth", auth_router_1.default);
app.use("/api/v1/users", user_router_1.default);
app.use("/api/v1/profile", profile_router_1.default);
app.use("/api/v1/about", about_router_1.default);
app.use("/api/v1/categories", category_router_1.default);
app.use("/api/v1/tags", tag_router_1.default);
app.use("/api/v1/skills", skill_router_1.default);
app.use("/api/v1/projects", project_router_1.default);
app.use("/api/v1/experiences", experience_router_1.default);
app.use("/api/v1/educations", education_router_1.default);
app.use("/api/v1/certifications", certification_router_1.default);
app.use("/api/v1/testimonials", testimonial_router_1.default);
app.use("/api/v1/contact-messages", contactMessage_router_1.default);
app.use("/api/v1/page-views", pageView_router_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFoundMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map