import { Agent } from "@mastra/core/agent";

import { llm } from "../../config/llm.config.js";
import { routerInstructions } from "./instructions.js";
import { routerTools } from "./tools.js";

export const routerAgent = new Agent({
  id: "router-agent",

  name: "Router Agent",

  instructions: routerInstructions,

  model: llm,

  tools: routerTools,
});