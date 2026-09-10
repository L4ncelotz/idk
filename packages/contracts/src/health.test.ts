import { describe, expect, it } from "vitest";

import type { HealthResponse, HealthStatus, ServiceName } from "./health.js";

describe("health contract", () => {
  it("accepts a valid api health response", () => {
    const response: HealthResponse = {
      service: "api",
      status: "ok",
    };

    expect(response.service).toBe("api");
    expect(response.status).toBe("ok");
  });

  it("accepts a valid runner health response", () => {
    const response: HealthResponse = {
      service: "runner",
      status: "ok",
    };

    expect(response.service).toBe("runner");
    expect(response.status).toBe("ok");
  });

  it("exposes the expected contract names", () => {
    const service: ServiceName = "api";
    const status: HealthStatus = "ok";

    expect(service).toBe("api");
    expect(status).toBe("ok");
  });
});
