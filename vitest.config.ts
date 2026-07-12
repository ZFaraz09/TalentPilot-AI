import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["apps/**/*.{test,spec}.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["apps/**/*.ts"],
      exclude: [
        "apps/**/*.{test,spec}.ts",
        "apps/**/index.ts",
        "apps/**/*.d.ts",
      ],
    },
  },
});
