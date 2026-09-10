# Security

## Security Objective

Rupture intentionally creates broken service environments. The goal is to make controlled failure safe without turning the product into an arbitrary command execution platform.

## Primary Trust Boundary

```text
UNPRIVILEGED                         PRIVILEGED

Browser
   |
Web
   |
API  ------------------------------> Runner
                                      |
                                      v
                                    Docker
```

Only the runner is allowed to access Docker.

## Mandatory Rules

- Never mount `/var/run/docker.sock` into `apps/web`.
- Never mount `/var/run/docker.sock` into `apps/api`.
- Do not expose Docker TCP API publicly.
- Do not accept arbitrary shell commands from users.
- Do not accept arbitrary Compose files from users in v1.
- Do not allow user-controlled host paths.
- Do not interpolate raw user input into command strings.
- Do not log secrets or full environment values.
- Do not expose hidden scenario answers to active sessions.

## Allowed Runner Operations

Runner actions should be modeled as validated operations, for example:

```text
START_LAB
STOP_LAB
RESET_LAB
STOP_SERVICE
START_SERVICE
SET_ALLOWED_ENV_OVERRIDE
APPLY_RESOURCE_LIMIT
TRIGGER_ALLOWED_HTTP_FAULT
CLEANUP_LAB
```

The implementation may use Docker APIs internally, but the runner interface must remain constrained.

## Scenario Security

Scenario definitions may reference only known services and known fault strategies.

Bad:

```text
command: "docker exec ... arbitrary input ..."
```

Preferred:

```yaml
fault:
  type: service_stop
  target: redis
```

The runner maps `service_stop` to a validated internal operation.

## Resource Controls

Every lab must define:

- CPU limit
- memory limit
- maximum runtime / TTL
- startup timeout
- cleanup timeout

The production system must also enforce a maximum number of concurrent labs.

## Input Validation

Validate at every trust boundary:

- scenario ID
- session ID
- service ID
- runner action
- environment override key/value
- pagination/filter input
- authentication/session tokens

## Authentication Between API and Runner

The API-to-runner channel must be authenticated.

Acceptable approaches include:

- private network + shared secret with rotation
- mTLS
- signed internal requests

Do not expose runner endpoints directly to the public internet.

## Session Isolation

A user must not be able to:

- inspect another user's lab
- fetch another session's logs
- submit a diagnosis for another session
- terminate another session
- infer hidden root-cause metadata before completion

## Secret Handling

- use environment variables or secret files outside source control
- maintain `.env.example` with non-sensitive placeholders
- redact secrets from structured logs
- do not commit tokens, passwords, private keys, or production URLs containing credentials

## Web Security

At minimum:

- secure cookie/session configuration
- CSRF protection where applicable
- rate limiting
- input validation
- safe error responses
- no stack traces to untrusted users in production
- secure headers at the reverse proxy/application layer

## Phase 1 Status

In Phase 1 there are no Docker socket mounts anywhere. None of the three
services mounts `/var/run/docker.sock`, and the runner imports no Docker
libraries, invokes no Docker client, and exposes no lifecycle or command
routes. The runner is reachable only on the internal Compose network — its
port 5000 is `expose`d, not published to the host.

The permanent rule remains: only the runner may access Docker in later
phases. Web and API must never access the Docker socket.

## Known v1 Limitations

Rupture v1 is designed for trusted self-hosting and public demonstration with controlled scenarios. It is not designed to safely execute arbitrary untrusted third-party code.

## Security Review Checklist

Before v1.0:

- [ ] verify Docker socket exists only in runner runtime
- [ ] inspect all subprocess/process execution code
- [ ] confirm no user-provided command strings exist
- [ ] test path traversal attempts
- [ ] test invalid scenario/service IDs
- [ ] test cross-session authorization
- [ ] verify log redaction
- [ ] verify TTL and resource enforcement
- [ ] verify runner is not publicly routable
- [ ] document residual risks
