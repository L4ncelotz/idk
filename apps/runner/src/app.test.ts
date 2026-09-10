import { describe, expect, it } from "vitest";

import { buildRunnerApp } from "./app.js";
import type { HealthResponse } from "@rupture/contracts";

describe("buildRunnerApp", () => {
  it("returns GET /health with the typed runner health response", async () => {
    const app = await buildRunnerApp();

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(JSON.parse(response.body)).toEqual<HealthResponse>({
      service: "runner",
      status: "ok",
    });
  });

  it("does not bind a real port during construction", async () => {
    const app = await buildRunnerApp();
    await app.close();
  });
});
