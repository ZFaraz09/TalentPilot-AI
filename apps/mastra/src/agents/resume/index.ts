import { Agent } from "@mastra/core/agent";
import { llm } from "../../config/llm.config.js";
import { resumeInstructions } from "./instructions.js";
import { resumeTools } from "./tools.js";

export const resumeAgent = new Agent({
  id: "resume-agent",
  name: "Resume Agent",
  instructions: resumeInstructions,
  model: llm,
  tools: resumeTools,
});