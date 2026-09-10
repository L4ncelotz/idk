# Development

## Expected Tooling

- Node.js LTS/current supported version defined by the repository
- pnpm
- Docker Engine / Docker Desktop
- Docker Compose v2
- Git

## Workspace

The Phase 1 workspace is implemented:

```text
apps/
  web/
  api/
  runner/
packages/
  contracts/
  db/
  scenario/
  scoring/
  config/
```

## Local Development

Start each process directly. Each app loads its own `.env` from its own
directory; when no local `.env` exists the app falls back to `.env.example`, so
a fresh checkout runs without manual setup:

```bash
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

Each app loads its own `.env` from its own directory via an explicit path,
so the process cwd does not matter — running `pnpm --filter` from the
workspace root works. `HOST` and `PORT` are process-local: Compose overrides
them per service, and host-side starts set the appropriate value for each
process.

## Standard Validation

Before completing a meaningful change, run the repository equivalents of:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose config --quiet
```

Run integration/E2E validation when relevant.

## Branch Workflow

Recommended for this project:

```text
main
 |- feat/project-foundation
 |- feat/lab-runtime
 |- feat/scenario-engine
 |- feat/investigation-ui
 |- fix/session-cleanup
```

A permanent `develop` branch is not required for a small team/solo workflow.

## Commit Style

Use conventional commits, for example:

```text
chore: initialize pnpm workspace
feat: add healthy lab runtime
feat: add scenario registry
fix: make lab cleanup idempotent
test: cover invalid session transitions
docs: document runner trust boundary
```

## Documentation Discipline

Update the relevant docs when changing:

- architecture
- security boundaries
- scenario authoring interface
- deployment process
- user-visible behavior

## Agent Workflow

Coding agents should read `AGENTS.md` and `IMPLEMENTATION.md` first, then read phase-specific docs before coding.
