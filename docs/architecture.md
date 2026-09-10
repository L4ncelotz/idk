# Architecture

## System Overview

Rupture separates public application concerns from privileged Docker operations.

```text
Browser
   |
   v
+-------------+
| Next.js Web |
+------+------+
       |
       | HTTPS / JSON
       v
+-------------+        +-------------+
| Fastify API |------->| PostgreSQL  |
+------+------+        +-------------+
       |
       | authenticated internal protocol
       v
+------------------+
| Rupture Runner   |
| privileged zone  |
+--------+---------+
         |
         | allowlisted Docker operations
         v
+-------------------------------+
| Session-scoped Docker Lab     |
|                               |
| API -> Redis                  |
|  |                            |
|  +-> PostgreSQL               |
|  +-> Worker                   |
+-------------------------------+
```

## Repository Structure

```text
rupture/
├── apps/
│   ├── web/
│   ├── api/
│   └── runner/
├── packages/
│   ├── db/
│   ├── scenario/
│   ├── scoring/
│   ├── contracts/
│   └── config/
├── labs/
│   ├── services/
│   └── scenarios/
├── docs/
└── .github/
```

## Application Responsibilities

### `apps/web`

Responsible for:

- landing and lab catalog
- authentication UI
- investigation workspace
- results/history/profile
- user-facing loading/error states

Must not:

- access Docker
- know Docker socket location
- execute runner operations directly

### `apps/api`

Responsible for:

- public API
- validation
- authentication/authorization
- persistence
- session orchestration
- scoring coordination
- telemetry access policy

Must not:

- mount Docker socket
- invoke Docker CLI directly
- accept user shell commands

### `apps/runner`

Responsible for:

- creating session-scoped lab environments
- executing allowlisted fault operations
- enforcing TTL and resource constraints
- reset and cleanup
- orphan reconciliation

The runner is a privileged component and should remain as small as practical.

## Package Responsibilities

### `packages/contracts`

Shared request/response contracts, identifiers, enums, and state models.

### `packages/db`

Drizzle schema, migrations, and database helpers.

### `packages/scenario`

Scenario schema, authoring helpers, registry, and validation.

### `packages/scoring`

Deterministic score calculations.

### `packages/config`

Shared linting/TypeScript/tooling configuration where centralization reduces duplication.

## Session Lifecycle

Expected state model:

```text
CREATED
   |
   v
STARTING ------> FAILED
   |
   v
HEALTHY
   |
   v
INJECTING -----> FAILED
   |
   v
ACTIVE
   | \
   |  +--------> EXPIRED
   |  +--------> ABORTED
   v
DIAGNOSED
   |
   v
COMPLETED
   |
   v
CLEANING
   |
   v
CLEANED
```

All state transitions must be validated.

Invalid examples:

```text
ACTIVE -> CREATED
COMPLETED -> ACTIVE
CLEANED -> ACTIVE
```

## Lab Isolation

Each lab session must receive a unique Compose project namespace, for example:

```text
rupture-a12f
rupture-c91e
rupture-f72a
```

Session resources must not be shared unless explicitly designed as safe shared infrastructure.

## Implementation Status

### Phase 1 — Implemented

- `apps/web` — Next.js App Router process, port 3000, renders the product
  name and tagline only. No API, Docker, auth, or investigation endpoints.
- `apps/api` — Fastify process, port 4000, exposes `GET /health` returning
  `{ service: "api", status: "ok" }`. No Docker, database, auth, sessions,
  scenarios, scoring, or telemetry.
- `apps/runner` — Fastify process, port 5000, exposes `GET /health` returning
  `{ service: "runner", status: "ok" }`. Internal to Compose; no Docker
  imports, subprocess execution, lifecycle routes, or command acceptance.
- `packages/config` — `readRuntimeEnvironment` parser for required
  `HOST`/`PORT` values.
- `packages/contracts` — shared `HealthResponse`, `HealthStatus`, and
  `ServiceName` types for `api` and `runner`.
- `packages/db`, `packages/scenario`, `packages/scoring` — buildable empty
  package boundaries with no domain behavior.
- Shared strict TypeScript, ESLint, Prettier, Vitest, Docker Compose
  development foundation, and CI workflow.

### Planned Later Phases

- Database, scenario engine, scoring, lab services, lifecycle, telemetry,
  authentication, and UI investigation surfaces are not implemented in
  Phase 1. The session lifecycle state model, lab isolation, and design
  decisions describe the target architecture for those phases.

## Design Decisions

### Why Docker Compose instead of Kubernetes?

Rupture v1 needs reproducible isolated service environments, not a general cluster orchestration platform. Docker Compose keeps the operational model understandable and deployable on a single Linux host.

### Why a separate runner?

The Docker daemon is highly privileged. Keeping Docker access out of public-facing processes reduces the blast radius of web/API vulnerabilities.

### Why predefined fault operations?

Rupture is an incident training platform, not a remote shell. Predefined fault primitives are easier to validate, test, document, and secure.

### Why deterministic scoring?

Users should receive the same score for the same observable actions. LLM judging may be added later as secondary feedback, but not as the source of truth.
