import { createTalentPilotAgent } from "../create-agent.js";
import { candidateInstructions } from "./instructions.js";
import { candidateTools } from "./tools.js";

export const candidateAgent = createTalentPilotAgent({
  id: "candidate-agent",
  name: "Candidate Agent",
  instructions: candidateInstructions,
  tools: candidateTools,
});