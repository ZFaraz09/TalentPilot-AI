import { Router } from "express";

import { mastra } from "../../../mastra/src/index.js";
import { ResumeUploadInputSchema } from "../workflows/resume-upload/schema.js";

const router = Router();

router.post("/upload", async (req, res) => {
  const inputData = ResumeUploadInputSchema.parse(req.body);

  const workflow = mastra.getWorkflow("resumeUpload");

  const run = await workflow.createRun();

  const result = await run.start({ inputData });

  if (result.status === "failed") {
    throw new Error("Resume upload workflow failed.", {
      cause: result.error,
    });
  }

  if (result.status !== "success") {
    throw new Error(
      `Resume upload workflow did not complete successfully: ${result.status}.`
    );
  }

  res.status(200).json(result);
});

export default router;