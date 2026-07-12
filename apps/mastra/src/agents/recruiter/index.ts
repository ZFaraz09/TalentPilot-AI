import { Agent } from "@mastra/core/agent";
import { llm } from "../../config/llm.config.js";
import { recruiterInstructions } from "./instructions.js";
import { recruiterTools } from "./tools.js";

export const recruiterAgent = new Agent({
  id: "recruiter-agent",
  name: "Recruiter Agent",
  instructions: recruiterInstructions,
  model: llm,
  tools: recruiterTools,
});