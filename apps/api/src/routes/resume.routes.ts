import { Router } from "express";

import { mastra } from "../../../mastra/src/index.js";
import { ResumeUploadInputSchema } from "../../../mastra/src/workflows/resume-upload/schema.js";

const router = Router();

router.post("/upload", async (req, res) => {
  const parsed = ResumeUploadInputSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body.",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const workflow = mastra.getWorkflow("resumeUpload");

    const run = await workflow.createRun();

    const result = await run.start({
      inputData: parsed.data,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Resume upload workflow failed:", error);

    res.status(500).json({
      success: false,
      message: "Workflow execution failed.",
    });
  }
});

export default router;
