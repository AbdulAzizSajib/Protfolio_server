import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import path from "path";
import authRouter from "./module/auth/auth.router.js";
import userRouter from "./module/user/user.router.js";
import profileRouter from "./module/profile/profile.router.js";
import aboutRouter from "./module/about/about.router.js";
import categoryRouter from "./module/category/category.router.js";
import tagRouter from "./module/tag/tag.router.js";
import skillRouter from "./module/skill/skill.router.js";
import projectRouter from "./module/project/project.router.js";
import experienceRouter from "./module/experience/experience.router.js";
import educationRouter from "./module/education/education.router.js";
import certificationRouter from "./module/certification/certification.router.js";
import testimonialRouter from "./module/testimonial/testimonial.router.js";
import contactMessageRouter from "./module/contactMessage/contactMessage.router.js";
import pageViewRouter from "./module/pageView/pageView.router.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import { notFoundMiddleware } from "./middleware/notFound.js";
import { envVars } from "./config/env.js";
import { auth } from "./lib/auth.js";
import { prisma } from "./lib/prisma.js";
const app = express();
app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));
app.use(cors({
    origin: [
        envVars.FRONTEND_URL,
        envVars.BETTER_AUTH_URL,
        "http://localhost:3000",
        "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Better Auth handler (must be before body parsers)
app.use("/api/auth", toNodeHandler(auth));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// server health check
app.get("/", (_req, res) => {
    res.status(200).send("Server is running...");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/educations", educationRouter);
app.use("/api/v1/certifications", certificationRouter);
app.use("/api/v1/testimonials", testimonialRouter);
app.use("/api/v1/contact-messages", contactMessageRouter);
app.use("/api/v1/page-views", pageViewRouter);
// temporary db test
app.get("/db-test", async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ success: true, message: "Database connected" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Database connection failed" });
    }
});
app.use(globalErrorHandler);
app.use(notFoundMiddleware);
export default app;
//# sourceMappingURL=app.js.map