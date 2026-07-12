import { createWorkflow } from "@mastra/core/workflows";

import {
  ResumeUploadInputSchema,
  ResumeUploadOutputSchema,
} from "./schema.js";

import { parseResumeStep } from "./steps/parse.step.js";
import { embedResumeStep } from "./steps/embed.step.js";
import { storeVectorStep } from "./steps/store-vector.step.js";
import { saveProfileStep } from "./steps/save-profile.step.js";

export const resumeUploadWorkflow = createWorkflow({
  id: "resume-upload",

  inputSchema: ResumeUploadInputSchema,

  outputSchema: ResumeUploadOutputSchema,
})
  .then(parseResumeStep)
  .then(embedResumeStep)
  .then(storeVectorStep)
  .then(saveProfileStep)
  .commit();