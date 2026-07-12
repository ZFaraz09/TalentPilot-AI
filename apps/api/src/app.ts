import cors from "cors";
import express, { type Express } from "express";

import { requireApiKey } from "./middleware/auth.js";
import resumeRoutes from "./routes/resume.routes.js";

const JSON_BODY_LIMIT = process.env.JSON_BODY_LIMIT ?? "1mb";

function getAllowedOrigins(): string[] {
  return (process.env.CORS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function createApp(): Express {
  const app = express();
  const allowedOrigins = getAllowedOrigins();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin not allowed by CORS."));
      },
    })
  );

  app.use(express.json({ limit: JSON_BODY_LIMIT }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api", requireApiKey);
  app.use("/api/resume", resumeRoutes);

  return app;
}

export default createApp;
