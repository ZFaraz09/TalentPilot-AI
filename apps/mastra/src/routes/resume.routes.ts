import { Router } from "express";

import { mastra } from "../../../mastra/src/index.js";

const router = Router();

router.post("/upload", async (req, res) => {
  try {
    const { candidateId, resumeContent } = req.body;

    const workflow = mastra.getWorkflow("resumeUpload");

    const run = await workflow.createRun();

    const result = await run.start({
      inputData: {
        candidateId,
        resumeContent,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Workflow execution failed.",
    });
  }
});

export default router;