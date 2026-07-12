import { Mastra } from "@mastra/core";
import { routerAgent,
         recruiterAgent,
         candidateAgent,
         resumeAgent,
 } from "./agents/index.js";
 import  { resumeUploadWorkflow } from "./workflows/index.js";

export const mastra = new Mastra({
  agents: {
    router: routerAgent,
    recruiter: recruiterAgent,
    candidate: candidateAgent,
    resume: resumeAgent,

  },
    workflows: {
    resumeUpload: resumeUploadWorkflow,
  },
});