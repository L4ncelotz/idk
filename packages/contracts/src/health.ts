export type ServiceName = "api" | "runner";

export type HealthStatus = "ok";

export interface HealthResponse {
  service: ServiceName;
  status: HealthStatus;
}
