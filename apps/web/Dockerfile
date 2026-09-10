FROM node:22.15.0-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY packages ./packages

COPY apps/api/package.json ./apps/api/package.json
COPY apps/contracts/package.json ./apps/contracts/package.json
COPY apps/runner/package.json ./apps/runner/package.json
COPY apps/web/package.json ./apps/web/package.json

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @rupture/config --filter @rupture/contracts build

COPY apps/web ./apps/web

CMD ["pnpm", "--filter", "@rupture/web", "dev"]