import fastify, { type FastifyInstance } from "fastify";

import type { HealthResponse } from "@rupture/contracts";

const HEALTH_RESPONSE: HealthResponse = {
  service: "api",
  status: "ok",
};

export function buildApiApp(): FastifyInstance {
  const app = fastify();

  app.get("/health", async (_request, reply) => {
    reply.header("content-type", "application/json");
    return HEALTH_RESPONSE;
  });

  return app;
}
