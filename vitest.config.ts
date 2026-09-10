import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
    ],
    exclude: ["node_modules", "dist", "build", ".next"],
    passWithNoTests: true,
    isolate: true,
    pool: "threads",
    maxWorkers: 1,
    fileParallelism: false,
    globals: false,
    environment: "node",
    testTimeout: 10000,
    hookTimeout: 10000,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
});
