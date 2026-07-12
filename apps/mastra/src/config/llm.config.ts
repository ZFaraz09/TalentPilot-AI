import { google } from "@ai-sdk/google";

/**
 * Central model configuration for the Gemini (Google Generative AI) provider.
 *
 * Model ids are overridable via environment variables so deployments can pin
 * or upgrade models without code changes.
 */
export const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL ?? "gemini-flash-latest";

export const EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001";

/**
 * Reasoning model shared by Mastra agents and structured-extraction tools.
 *
 * Typed as `any` intentionally: the Mastra runtime and the `@ai-sdk/google`
 * provider are built against different AI SDK model-spec versions, so the
 * concrete `LanguageModel` types are not structurally assignable across the
 * boundary even though they interoperate at runtime.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const llm: any = google(CHAT_MODEL);
