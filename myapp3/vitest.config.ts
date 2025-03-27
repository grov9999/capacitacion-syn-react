import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      exclude: [
        "**/*.config.ts",
        "**/*.config.js",
        "**/*.types.ts",
        "**/*.d.ts",
        "**/types",
        "**/main.tsx",
      ],
      thresholds: {
        functions: 80,
      },
    },
  },
});