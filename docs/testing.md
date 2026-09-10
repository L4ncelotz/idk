# Testing Strategy

## Objective

Rupture must verify both normal application behavior and failure-management behavior.

Passing happy-path tests alone is insufficient.

## Test Layers

### Unit Tests

Required targets:

- scenario schema validation
- scenario registry behavior
- state transition validation
- deterministic scoring
- input validation
- redaction helpers
- identifier parsing

### Integration Tests

Required targets:

- PostgreSQL access
- migrations
- API persistence
- API-to-runner communication
- healthy lab lifecycle
- scenario injection lifecycle
- cleanup and reset
- TTL expiry
- orphan reconciliation

### E2E Tests

Required user flows:

1. login
2. browse scenario catalog
3. start lab
4. wait for active session
5. inspect evidence
6. request hint
7. submit diagnosis
8. receive score
9. view run in history

Failure E2E flows should include:

- runner offline
- lab startup failure
- expired session
- unauthorized session access

## Security Tests

At minimum:

- invalid session ID
- invalid scenario ID
- cross-user session access
- path traversal attempts
- unsupported runner operation
- command-injection-shaped input
- rate-limit behavior

## Runner Tests

Runner behavior requires additional care because it touches privileged infrastructure.

Test:

- project-name isolation
- cleanup idempotency
- startup timeout
- TTL cleanup
- resource limit application
- unknown service rejection
- unsupported operation rejection

## Scenario Acceptance Test

Every official scenario should prove:

```text
healthy baseline
-> fault injection
-> expected symptoms
-> diagnosis metadata available internally
-> cleanup/reset
-> healthy baseline restored
```

## CI Validation

CI must run at least:

```text
install
lint
typecheck
unit tests
integration tests where environment allows
build
```

E2E may run in a separate job if Docker/service startup makes it expensive.

## Phase 1 Validation Surface

Phase 1 covers the repository foundation only. The CI workflow runs
`format:check`, `lint`, `typecheck`, `test`, `build`, and
`docker compose config --quiet`. The test suite is unit-level:

- `packages/config` — `readRuntimeEnvironment` parsing and rejection cases
- `packages/contracts` — health contract shape and exported names
- `apps/api` — `GET /health` returns HTTP 200 with exactly
  `{ service: "api", status: "ok" }` via Fastify injection
- `apps/runner` — `GET /health` returns HTTP 200 with exactly
  `{ service: "runner", status: "ok" }` via Fastify injection

Integration tests, E2E tests, runner lifecycle tests, and security tests
are not yet implemented and must not be claimed as covered.

## Test Integrity

Do not:

- delete tests to fix a build
- lower assertions without explanation
- replace real integration behavior with permanent mocks
- mark failing tests skipped without documenting a tracked reason
