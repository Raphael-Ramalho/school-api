import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "generated/**",
        "prisma/**",
        "**/*.config.ts",
        "**/*.types.ts",
        "**/server.ts",
        "**/routes.ts",
        "**/__tests__/**",
        "**/__mocks__/**",
      ],
    },
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules/**", "generated/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
