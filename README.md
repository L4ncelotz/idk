# Rupture

> **Break it. Trace it. Fix it.**

Rupture is a hands-on incident response playground where developers investigate intentionally broken systems, trace symptoms through logs and telemetry, diagnose the root cause, and receive deterministic scoring.

## Status

Phase 1 — Repository Foundation — is implemented. The pnpm monorepo has
runnable web, API, and runner processes, shared package boundaries,
strict TypeScript, linting/formatting, tests, a Docker Compose
development foundation, and a CI workflow. Labs, scenarios, authentication,
persistence, telemetry, and scoring are **not** implemented yet — they are
planned for later phases.

## Development

Each app loads its own `.env` from its own directory. When no local `.env`
exists, the app falls back to its `.env.example`, so a fresh checkout runs
without manual setup:

```bash
pnpm install
pnpm --filter @rupture/web dev     # http://localhost:3000
pnpm --filter @rupture/api dev     # http://localhost:4000
pnpm --filter @rupture/runner dev  # internal, port 5000
docker compose up
```

Real shell environment variables (e.g. `HOST`/`PORT` set by Compose) always
take precedence over file values. To override `.env.example` defaults for a
single app, copy its example and edit the copy:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/runner/.env.example apps/runner/.env
```

Validation:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose config --quiet
```

See [`docs/development.md`](docs/development.md).

## Why Rupture?

Most DevOps and backend tutorials explain failures after the fact. Rupture creates controlled, reproducible failure scenarios so developers can practice investigating them directly.

A typical session looks like this:

```text
Healthy Lab
   |
   v
Fault Injected
   |
   +-- Logs
   +-- Metrics
   +-- Health
   +-- Config
   +-- Timeline
   |
   v
Diagnosis
   |
   v
Deterministic Score
```

## Planned v1.0 Features

- 12 predefined incident scenarios
- isolated Docker-based lab sessions
- service health and status inspection
- logs, basic metrics, configuration, and event timeline
- deterministic diagnosis scoring
- user accounts and run history
- scenario authoring interface for contributors (planned, no phase assigned yet)
- automatic lab cleanup and TTL enforcement
- production-ready self-hosting workflow
- unit, integration, and E2E test coverage
- CI and production build validation

## Architecture

The public web and API layers do not access Docker directly.

```text
Browser
   |
   v
Next.js Web
   |
   v
Fastify API ------ PostgreSQL
   |
   v
Privileged Runner
   |
   v
Docker Lab
```

See [`docs/architecture.md`](docs/architecture.md).

## Security Model

Rupture intentionally runs faulty services, so its Docker trust boundary is treated as a core architecture concern.

See [`docs/security.md`](docs/security.md).

## Implementation Plan

See [`IMPLEMENTATION.md`](IMPLEMENTATION.md).

## Scenario System

See [`docs/scenarios.md`](docs/scenarios.md).

## UI Direction

See [`docs/ui-design.md`](docs/ui-design.md).

## Testing

See [`docs/testing.md`](docs/testing.md).

## Development

See [`docs/development.md`](docs/development.md).

## Deployment

See [`docs/deployment.md`](docs/deployment.md).

## Roadmap

See [`docs/roadmap.md`](docs/roadmap.md).

## License

Rupture is licensed under the MIT License.
