import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { toNodeHandler } from "better-auth/node";
import path from "path";
import authRouter from "./module/auth/auth.router";
import userRouter from "./module/user/user.router";
import profileRouter from "./module/profile/profile.router";
import categoryRouter from "./module/category/category.router";
import tagRouter from "./module/tag/tag.router";
import skillRouter from "./module/skill/skill.router";
import projectRouter from "./module/project/project.router";
import experienceRouter from "./module/experience/experience.router";
import educationRouter from "./module/education/education.router";
import certificationRouter from "./module/certification/certification.router";
import testimonialRouter from "./module/testimonial/testimonial.router";
import contactMessageRouter from "./module/contactMessage/contactMessage.router";
import pageViewRouter from "./module/pageView/pageView.router";

import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFoundMiddleware } from "./middleware/notFound";
import { envVars } from "./config/env";
import { auth } from "./lib/auth";

const app: Express = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

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

app.use(globalErrorHandler);
app.use(notFoundMiddleware);

export default app;
