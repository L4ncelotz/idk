# Scenarios

## Goal

Scenarios are reproducible incident definitions. They should be easy to add without modifying Rupture core behavior.

Rupture v1 supports predefined, source-controlled scenarios only.

## Scenario Principles

Each scenario must:

- start from the healthy baseline lab
- inject one primary root cause
- produce understandable symptoms
- expose enough evidence to diagnose the issue
- define expected diagnosis metadata
- define cleanup/reset behavior
- be deterministic enough for automated tests

Avoid scenarios that depend on random external internet services.

## Initial Scenario Set

| ID                        | Scenario                            | Difficulty |
| ------------------------- | ----------------------------------- | ---------- |
| `bad-env`                 | Bad environment variable            | Easy       |
| `redis-unavailable`       | Redis unavailable                   | Easy       |
| `upstream-unavailable`    | Upstream service unavailable        | Easy       |
| `http-500-storm`          | HTTP 500 storm                      | Easy       |
| `db-pool-exhaustion`      | Database connection pool exhaustion | Medium     |
| `redis-memory-pressure`   | Redis memory pressure               | Medium     |
| `slow-query`              | Slow database query                 | Medium     |
| `rate-limit-misconfig`    | Rate-limit misconfiguration         | Medium     |
| `dns-failure`             | DNS resolution failure              | Medium     |
| `worker-backlog`          | Worker queue backlog                | Medium     |
| `memory-pressure`         | Application memory pressure         | Hard       |
| `reverse-proxy-misconfig` | Reverse proxy misconfiguration      | Hard       |

## Suggested Schema

Conceptual example:

```ts
export const scenario = defineScenario({
  id: "redis-unavailable",
  title: "Redis Unavailable",
  description: "Requests depending on cache access begin failing.",
  difficulty: "easy",

  fault: {
    type: "service_stop",
    target: "redis",
  },

  symptoms: ["cache_errors", "api_latency_increase", "redis_health_failure"],

  diagnosis: {
    category: "cache",
    rootCause: "redis_unavailable",
  },

  hints: [
    "Compare service health before reading application code.",
    "Check dependencies used by the API.",
  ],
});
```

The exact runtime schema may evolve, but the public authoring model should remain declarative.

## Fault Strategy Registry

Initial strategies may include:

- `service_stop`
- `env_override`
- `resource_limit`
- `latency_injection`
- `http_error_mode`
- `connection_pool_limit`
- `memory_pressure`
- `queue_throttle`
- `proxy_config_variant`

Every strategy must be explicitly registered and validated.

## Scenario Directory

Preferred structure:

```text
labs/scenarios/
├── bad-env/
│   ├── scenario.ts
│   └── README.md
├── redis-unavailable/
│   ├── scenario.ts
│   └── README.md
└── ...
```

## Scenario Authoring Requirements

A scenario contribution must include:

- scenario definition
- explanation of root cause
- expected symptoms
- expected evidence
- automated lifecycle test
- cleanup verification

## What v1 Does Not Support

- dynamically downloaded plugins
- arbitrary JavaScript packages loaded at runtime
- user-uploaded Compose files
- arbitrary shell injection scripts
- scenario marketplace

Those features would materially expand the security model and are intentionally excluded.
