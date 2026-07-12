import { createTalentPilotAgent } from "../create-agent.js";
import { resumeInstructions } from "./instructions.js";
import { resumeTools } from "./tools.js";

export const resumeAgent = createTalentPilotAgent({
  id: "resume-agent",
  name: "Resume Agent",
  instructions: resumeInstructions,
  tools: resumeTools,
});