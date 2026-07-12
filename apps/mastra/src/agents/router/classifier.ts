export type AgentIntent =
  | "recruiter"
  | "candidate"
  | "resume"
  | "general";

export interface RouteResult {
  agent: AgentIntent;
  confidence: number;
}