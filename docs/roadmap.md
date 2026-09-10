# Roadmap

## v1.0 - Production Foundation

Primary goal: ship a polished, reliable incident-response playground.

Included:

- 12 official scenarios
- Docker lab isolation
- investigation UI
- deterministic scoring
- authentication/history
- scenario authoring interface
- tests/CI
- self-hosting
- security hardening

See `IMPLEMENTATION.md` for phase-level details.

## Post-v1 Candidates

These are ideas, not commitments.

### Scenario Ecosystem

- additional official scenario packs
- community scenario repository
- scenario validation CLI
- scenario test harness

### Additional Service Templates

Potential examples:

- Go API
- Python/FastAPI
- Java/Spring
- MySQL
- MongoDB
- RabbitMQ
- Kafka
- NATS

### Observability Integrations

Potential optional integrations:

- OpenTelemetry
- Prometheus
- Loki

These should augment Rupture, not turn it into an observability platform.

### Training Features

Potential additions:

- curated learning tracks
- team training sessions
- scenario collections by skill level
- shareable result summaries

## Explicitly Deferred

Do not add these without revisiting the security and architecture model:

- arbitrary third-party runtime plugins
- arbitrary shell access
- arbitrary user-provided infrastructure
- public plugin marketplace
- Kubernetes cluster orchestration
- cloud account provisioning
