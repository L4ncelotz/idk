# Rupture Implementation Plan

## Definition of v1.0

Rupture v1.0 is complete only when the product is installable, testable, self-hostable, documented, and reliable enough to use as a public portfolio project.

### Required v1.0 capability

- 12 working predefined scenarios
- reliable lab startup and teardown
- concurrent lab isolation
- deterministic scoring
- authentication and persisted run history
- investigation UI with all required evidence surfaces
- automated cleanup for expired and orphaned labs
- strict Docker trust boundary
- CI passing on every supported change
- production deployment documentation
- no placeholder functionality presented as complete

---

# Phase 1 - Repository Foundation

**Status:** Implemented

## Scope

- pnpm workspace
- `apps/web`
- `apps/api`
- `apps/runner`
- shared packages
- TypeScript strict configuration
- linting and formatting
- test infrastructure
- environment validation foundation
- Docker Compose development foundation
- CI workflow
- documentation skeleton

## Acceptance Criteria

- [x] `pnpm install` succeeds
- [x] web application starts
- [x] API application starts
- [x] runner application starts
- [x] TypeScript strict mode is enabled
- [x] shared contracts package builds
- [x] lint passes
- [x] typecheck passes
- [x] tests pass
- [x] production build passes
- [x] `.env.example` exists
- [x] architecture is documented
- [x] Docker trust boundary is documented
- [x] CI runs all required validation
- [x] no secrets are committed
- [x] README reflects real project state

---

# Phase 2 - Healthy Lab Runtime

**Status:** TODO

## Goal

Create a stable healthy baseline lab before implementing fault injection.

## Scope

- demo API service
- worker service
- Redis
- PostgreSQL
- internal service communication
- health checks
- deterministic seed data
- Compose project isolation

## Acceptance Criteria

- [ ] lab starts from a clean environment
- [ ] all baseline services become healthy
- [ ] API can reach Redis and PostgreSQL
- [ ] worker can process test jobs
- [ ] health status is machine-readable
- [ ] lab teardown removes session resources
- [ ] lab can be started repeatedly without stale state

---

# Phase 3 - Privileged Runner and Lab Lifecycle

**Status:** TODO

## Scope

- runner control interface
- authenticated API-to-runner communication
- session-specific Compose project names
- start/stop/reset operations
- TTL enforcement
- CPU/RAM limits
- timeout handling
- orphan cleanup
- startup reconciliation

## Acceptance Criteria

- [ ] only runner accesses Docker
- [ ] runner accepts allowlisted operations only
- [ ] concurrent sessions are isolated
- [ ] expired labs are removed automatically
- [ ] cleanup is idempotent
- [ ] runner restart recovers or cleans orphaned labs safely
- [ ] no user-controlled shell execution exists

---

# Phase 4 - Scenario Engine

**Status:** TODO

## Scope

- Zod scenario schema
- scenario registry
- scenario lifecycle
- predefined fault strategies
- validation
- reset/cleanup metadata

## Acceptance Criteria

- [ ] invalid scenarios fail validation clearly
- [ ] scenario IDs are unique
- [ ] unsupported fault strategies are rejected
- [ ] scenario application is deterministic
- [ ] scenario cleanup restores a valid lab state

---

# Phase 5 - Telemetry and Investigation APIs

**Status:** TODO

## Scope

- service status
- near-live logs
- basic metrics
- health results
- safe configuration exposure
- event timeline
- evidence tracking

## Acceptance Criteria

- [ ] investigation data is scoped to the active session
- [ ] sensitive values are redacted
- [ ] evidence views cannot access other sessions
- [ ] API failure states are explicit and testable

---

# Phase 6 - Investigation UI

**Status:** TODO

## Scope

- lab catalog
- active session workspace
- service topology
- logs
- metrics
- health
- config
- timeline
- timer
- hints
- responsive states

## Acceptance Criteria

- [ ] investigation workspace works on desktop
- [ ] responsive behavior is acceptable on tablet/mobile
- [ ] loading, empty, error, expired, and runner-offline states exist
- [ ] keyboard focus and labels meet accessibility basics
- [ ] UI does not mimic a generic admin dashboard

---

# Phase 7 - Diagnosis and Scoring

**Status:** TODO

## Scope

Deterministic scoring weights:

- diagnosis accuracy: 50
- time efficiency: 20
- evidence inspection: 15
- hint usage: 10
- unnecessary actions: 5

## Acceptance Criteria

- [ ] primary score requires no LLM judge
- [ ] scoring is reproducible
- [ ] score breakdown is stored
- [ ] user can see why points were added or removed
- [ ] invalid or duplicate diagnosis submissions are handled safely

---

# Phase 8 - Official Scenario Library

**Status:** TODO

Implement and verify all initial scenarios:

1. bad environment variable
2. Redis unavailable
3. upstream service unavailable
4. HTTP 500 storm
5. database connection pool exhaustion
6. Redis memory pressure
7. slow database query
8. rate-limit misconfiguration
9. DNS resolution failure
10. worker queue backlog
11. application memory pressure
12. reverse proxy misconfiguration

## Acceptance Criteria

- [ ] all 12 scenarios can be launched
- [ ] symptoms match documented expectations
- [ ] each scenario has a deterministic root cause
- [ ] each scenario resets cleanly
- [ ] difficulty labels are reasonable

---

# Phase 9 - Authentication and Persistence

**Status:** TODO

## Scope

- account authentication
- profile
- run history
- sessions
- evidence events
- diagnoses
- scores
- migrations
- seed data

## Acceptance Criteria

- [ ] authentication works in production configuration
- [ ] session ownership is enforced
- [ ] history persists across deployments
- [ ] migrations work from a clean database
- [ ] migrations are upgrade-safe for supported versions

---

# Phase 10 - Reliability and Cleanup

**Status:** TODO

## Scope

- graceful shutdown
- retry policy
- transaction boundaries
- orphan cleanup
- session recovery
- failure taxonomy
- health endpoints
- structured logging

## Acceptance Criteria

- [ ] expected runner failures do not corrupt session state
- [ ] cleanup can be retried safely
- [ ] lab expiry works even after process restart
- [ ] API and runner expose health status

---

# Phase 11 - Security Hardening

**Status:** TODO

## Scope

- input validation audit
- runner authorization
- command-injection review
- path traversal review
- Docker socket exposure audit
- secret redaction
- rate limiting
- resource exhaustion protections

## Acceptance Criteria

- [ ] security checklist in `docs/security.md` is complete
- [ ] public containers do not mount Docker socket
- [ ] no arbitrary shell route exists
- [ ] session creation is rate limited
- [ ] resource limits are tested

---

# Phase 12 - Testing Completion

**Status:** TODO

## Scope

- unit tests
- integration tests
- E2E tests
- failure-path coverage

See `docs/testing.md`.

---

# Phase 13 - CI/CD and Deployment

**Status:** TODO

## Scope

- GitHub Actions
- production images
- production Compose
- reverse proxy
- HTTPS-ready deployment
- migrations
- health checks
- backup guidance
- upgrade workflow

---

# Phase 14 - Documentation and Portfolio Polish

**Status:** TODO

## Scope

- README refinement
- architecture diagram
- screenshots
- demo GIF
- social preview image
- 404 page
- error states
- project metadata
- scenario authoring docs

---

# Phase 15 - Final Production Audit

**Status:** TODO

Audit the repository from five perspectives:

1. senior backend engineer
2. senior frontend engineer
3. DevOps engineer
4. security engineer
5. external open-source contributor

Fix significant findings before v1.0.
