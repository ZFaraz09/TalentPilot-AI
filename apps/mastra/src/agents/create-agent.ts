import { Agent, type ToolsInput } from "@mastra/core/agent";

import { llm } from "../config/llm.config.js";

interface TalentPilotAgentConfig<
  TAgentId extends string,
  TTools extends ToolsInput,
> {
  id: TAgentId;
  name: string;
  instructions: string;
  tools: TTools;
}

export function createTalentPilotAgent<
  TAgentId extends string,
  TTools extends ToolsInput,
>({
  id,
  name,
  instructions,
  tools,
}: TalentPilotAgentConfig<TAgentId, TTools>): Agent<TAgentId, TTools> {
  return new Agent({
    id,
    name,
    instructions,
    model: llm,
    tools,
  });
}
