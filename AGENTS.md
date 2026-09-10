# AGENTS.md

## Project

**Rupture** is a hands-on incident response playground.

Users launch controlled Docker-based labs containing intentionally faulty services, inspect logs/metrics/health/configuration, identify the root cause, and receive deterministic scoring.

Tagline: **Break it. Trace it. Fix it.**

## Primary Goal

Build Rupture as a polished, production-ready, self-hostable developer tool and portfolio project.

Do not treat this repository as a tutorial, mockup, toy project, or UI-only demo.

## Non-Goals

Do not add the following unless a later version explicitly requires them:

- Kubernetes orchestration
- AWS/GCP/Azure provisioning
- arbitrary user-supplied shell commands
- arbitrary third-party plugin execution
- plugin marketplace
- enterprise RBAC
- multi-region infrastructure
- AI-generated incidents
- Grafana/Datadog replacement features
- general-purpose chaos engineering platform behavior

## Engineering Rules

- Read the relevant project docs before modifying code.
- Keep changes scoped to the active implementation phase.
- Prefer simple, explicit architecture over broad abstractions.
- Prefer deterministic behavior over LLM-based decisions.
- Do not add speculative features.
- Do not hide failures with mocks or placeholders presented as complete behavior.
- Do not silently weaken tests to make CI pass.
- Do not duplicate configuration when a shared source is practical.
- Keep TypeScript strict.
- Validate all external input.
- Fail explicitly when an invariant is violated.
- Update documentation when architecture, security boundaries, or behavior change.

## Security Rules

These are mandatory.

- Only `apps/runner` may communicate with Docker.
- `apps/web` must never access the Docker socket.
- `apps/api` must never access the Docker socket.
- Never expose arbitrary command execution to users.
- Scenario fault operations must be predefined and allowlisted.
- Validate service names, scenario identifiers, paths, environment overrides, and runner actions.
- Protect against command injection and path traversal.
- Public services should run as non-root where practical.
- Never write secrets to application logs.
- Labs must have TTL, resource limits, and cleanup behavior.
- Cleanup operations must be idempotent.

Read `docs/security.md` before changing runner or lab-runtime code.

## Dependency Direction

Preferred dependency direction:

```text
apps/web    -> packages/contracts
apps/api    -> packages/contracts, packages/db, packages/scoring
apps/runner -> packages/contracts, packages/scenario
packages/db -> shared config only
packages/scenario -> packages/contracts where needed
packages/scoring -> packages/contracts where needed
```

Forbidden direct dependencies:

```text
apps/web -> apps/runner
apps/web -> Docker
apps/api -> Docker
packages/* -> apps/*
```

## Git Rules

Use conventional commits.

Preferred prefixes:

- `feat:`
- `fix:`
- `test:`
- `docs:`
- `refactor:`
- `chore:`
- `ci:`

Prefer logical commits over one giant phase commit.

Branch examples:

- `feat/project-foundation`
- `feat/lab-runtime`
- `feat/scenario-engine`
- `feat/investigation-ui`
- `fix/session-cleanup`

Do not create branches, commits, or PRs purely to make repository history look busy.

## Workflow

Before coding:

1. Read `IMPLEMENTATION.md`.
2. Identify the active phase.
3. Read the docs referenced by that phase.
4. Inspect existing code before changing it.
5. State assumptions when requirements are ambiguous.
6. Choose the smallest coherent implementation that satisfies the acceptance criteria.

After coding:

1. Run formatting/linting.
2. Run type checking.
3. Run relevant unit and integration tests.
4. Run E2E tests when the change affects user workflows.
5. Run production build.
6. Inspect the git diff.
7. Remove dead code and accidental debug output.
8. Update docs when required.
9. Update the active phase checklist truthfully.

## Completion Rule

Do not claim a phase or task is complete when any required validation is failing.

If blocked, report:

- what is blocked
- why
- exact failing command/test
- what remains to be done
