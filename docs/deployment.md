# Deployment

## v1 Deployment Target

Rupture v1 should support straightforward self-hosting on a single Linux VPS with Docker.

This is intentionally simpler than a Kubernetes/cloud-native deployment.

## Production Components

Expected production topology:

```text
Internet
   |
   v
Reverse Proxy / TLS
   |
   +----> Web
   |
   +----> API ----> PostgreSQL
             |
             v
          Runner ----> Docker Labs
```

The runner should not be publicly routable.

## Production Requirements

- HTTPS via reverse proxy
- production Docker images
- persistent PostgreSQL storage
- database migrations
- restart policies
- health checks
- environment configuration
- runner isolation
- Docker lab resource limits
- lab TTL cleanup
- structured logs

## Environment Variables

The repository must include `.env.example` containing placeholders only.

Environment variables should cover at least:

- public application URL
- database connection
- authentication/session secret
- API-to-runner authentication
- maximum concurrent labs
- default lab TTL
- runner network binding

## Database

Deployment documentation must explain:

- initial migration
- upgrade migration
- backup
- restore

Do not rely on automatic destructive schema synchronization in production.

## Backups

At minimum document:

- PostgreSQL backup procedure
- backup retention recommendation
- restore verification

Lab containers do not require persistent backup because they are disposable session environments.

## Upgrade Procedure

Expected high-level flow:

1. back up PostgreSQL
2. pull/build new images
3. run migrations
4. restart application services
5. verify health checks
6. verify runner availability
7. verify new lab can start and clean up

## Reverse Proxy

Caddy or Nginx are both acceptable.

The proxy should provide:

- TLS termination
- secure headers
- request size limits where appropriate
- upstream health behavior

## Deployment Validation

Before documenting production deployment as supported, test on a clean Linux host or clean VM.
