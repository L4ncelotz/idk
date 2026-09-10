import { describe, expect, it } from "vitest";

import { buildApiApp } from "./app.js";
import type { HealthResponse } from "@rupture/contracts";

describe("buildApiApp", () => {
  it("returns GET /health with the typed api health response", async () => {
    const app = await buildApiApp();

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(JSON.parse(response.body)).toEqual<HealthResponse>({
      service: "api",
      status: "ok",
    });
  });

  it("does not bind a real port during construction", async () => {
    const app = await buildApiApp();
    await app.close();
  });
});
