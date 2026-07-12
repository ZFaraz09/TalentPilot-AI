import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * LLM configuration.
 *
 * Reasoning / structured-extraction runs on Featherless.ai (an OpenAI-compatible
 * inference gateway). Embeddings run on Gemini, since Featherless does not expose
 * an embeddings endpoint. All model ids and endpoints are env-overridable.
 */
export const CHAT_MODEL =
  process.env.FEATHERLESS_CHAT_MODEL ?? "deepseek-ai/DeepSeek-V3.1";

export const EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001";

const featherless = createOpenAICompatible({
  name: "featherless",
  baseURL: process.env.FEATHERLESS_BASE_URL ?? "https://api.featherless.ai/v1",
  apiKey: process.env.FEATHERLESS_API_KEY,
});

/**
 * Reasoning model shared by Mastra agents and structured-extraction tools.
 *
 * Typed as `any` intentionally: the Mastra runtime and the AI SDK provider are
 * built against different model-spec versions, so the concrete `LanguageModel`
 * types are not structurally assignable across the boundary even though they
 * interoperate at runtime.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const llm: any = featherless(CHAT_MODEL);
