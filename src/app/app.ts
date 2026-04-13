import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { toNodeHandler } from "better-auth/node";
import path from "path";
import authRouter from "./module/auth/auth.router";
import userRouter from "./module/user/user.router";
import profileRouter from "./module/profile/profile.router";
import aboutRouter from "./module/about/about.router";
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
import { prisma } from "./lib/prisma";

const app: Express = express();

const STATIC_ALLOWED_ORIGINS = [
  envVars.FRONTEND_URL,
  envVars.BETTER_AUTH_URL,
  "https://abdulazizsajib.vercel.app",
  "http://localhost:3000",
  "http://localhost:5000",
];

const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

const allowedOrigins = new Set(
  STATIC_ALLOWED_ORIGINS.filter(Boolean).map((origin) => normalizeOrigin(origin)),
);

const isVercelPreviewOrigin = (origin: string): boolean => {
  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

app.set("trust proxy", true);

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (e.g., curl/Postman/server-to-server).
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.has(normalizedOrigin) || isVercelPreviewOrigin(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database connection failed" });
  }
});

app.use(globalErrorHandler);
app.use(notFoundMiddleware);

export default app;
