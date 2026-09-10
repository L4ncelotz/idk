import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules", "dist"],
    passWithNoTests: false,
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
