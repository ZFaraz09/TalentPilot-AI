import { createTalentPilotAgent } from "../create-agent.js";
import { routerInstructions } from "./instructions.js";
import { routerTools } from "./tools.js";

export const routerAgent = createTalentPilotAgent({
  id: "router-agent",
  name: "Router Agent",
  instructions: routerInstructions,
  tools: routerTools,
});