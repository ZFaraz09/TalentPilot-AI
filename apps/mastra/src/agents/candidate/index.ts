import { Agent } from "@mastra/core/agent";
import { llm } from "../../config/llm.config.js";
import { candidateInstructions } from "./instructions.js";
import { candidateTools } from "./tools.js";

export const candidateAgent = new Agent({
  id: "candidate-agent",
  name: "Candidate Agent",
  instructions: candidateInstructions,
  model: llm,
  tools: candidateTools,
});