import express from "express";

import resumeRoutes from "../../mastra/src/routes/resume.routes.js";
import { errorHandler } from "./error-handler.js";

export const app = express();

app.use(express.json());
app.use("/api/resume", resumeRoutes);
app.use(errorHandler);