import { createTalentPilotAgent } from "../create-agent.js";
import { recruiterInstructions } from "./instructions.js";
import { recruiterTools } from "./tools.js";

export const recruiterAgent = createTalentPilotAgent({
  id: "recruiter-agent",
  name: "Recruiter Agent",
  instructions: recruiterInstructions,
  tools: recruiterTools,
});