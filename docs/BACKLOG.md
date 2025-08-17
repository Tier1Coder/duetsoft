Backlog (v0)

Bootstrap repo

Create Next.js (App Router, TS strict) project skeleton

Add pnpm workspaces (if planned), EditorConfig, Prettier, ESLint (next/core-web-vitals), Husky + lint-staged

Initialize basic app routes: /, /api/health

Base layout + Tailwind

Configure Tailwind (dark mode class, prettier-plugin-tailwind)

Implement shared <RootLayout> with header/footer, container, and basic SEO

Add UI primitives (Button, Input, Card) and example page

Dockerized Postgres (local dev)

docker-compose.yml with Postgres 16, healthcheck, named volume

.env.example with DB vars; pnpm db:up, db:down

Prisma schema + migrations

Define User, Session/Account (for Auth.js), Product models

Generate client; create initial migration; seed script

Add pnpm db:migrate, db:seed

Auth.js setup

Credentials or GitHub provider (per ARCHITECTURE.md), route handler, session strategy

Protected server actions; getCurrentUser() helper; <SignedIn>/<SignedOut> guards

Feature toggles (build-time + runtime)

Introduce features.config.ts (server-safe) and public-allowed flags

Implement withFeature() guard for routes/API

Example toggles: auth, db, products, orders, checkout

Minimal Products module (CRUD scaffold)

Pages: list, create, edit

API routes / server actions with zod validation

Prisma repo functions; optimistic UI (optional)

Playwright smoke tests

E2E: home page loads, auth flow (if enabled), products list CRUD happy path

Use test toggles/seed

CI (lint, typecheck, test)

GitHub Actions: node setup, pnpm cache, pnpm lint, pnpm typecheck, pnpm test, Playwright

Prisma generate/migrate on CI (for tests) using ephemeral Postgres (service container)

GitHub Actions deploy

Production/staging workflow (e.g., Vercel CLI) with environment secrets

Job gates: only on main + CI green

Documentation

README.md: setup, scripts, envs, feature flags, common tasks

CONTRIBUTING.md: branch strategy, commit style, PR checklist

User Stories

As a developer, I can clone the repo and run one command to start the app and database locally so I can begin building features.

As a developer, I have a consistent base layout and Tailwind utilities so new pages look coherent by default.

As a developer, I can enable/disable features via a single config so the template adapts to different client needs without code rewrites.

As a user, I can sign in using the configured provider so my session is persisted and protected pages are accessible.

As an admin, I can create, read, update, and delete products through a basic UI so I can verify the data flow end-to-end.

As a QA engineer, I can run smoke E2E tests that validate the main flows (home page, auth, products CRUD) to catch regressions quickly.

As a maintainer, I want CI to block merges on lint, typecheck, and tests so code quality remains high.

As a maintainer, I want automatic deploys from main (post-CI) so releases are consistent and repeatable.

As a developer, I want clear docs and scripts so onboarding is fast and mistakes are minimized.

Definition of Done (v0)

Repo bootstrapped with Next.js (App Router, TS strict), ESLint + Prettier + Husky configured; pnpm dev runs locally.

Tailwind configured; base layout renders with header/footer and example components; lighthouse/devtools show no critical errors.

Local Postgres runs via Docker Compose; pnpm db:up/db:down work; connection string loaded from .env.

Prisma schema includes User, Account, Session (or equivalent for Auth.js) and Product; initial migration applied; pnpm db:seed populates minimal records.

Auth.js wired with chosen provider; session retrieval helper works in server components/actions; a protected page correctly redirects when signed out.

Feature toggle system present with features.config.ts; server and client code paths respect flags; when products=false, routes and nav are hidden/blocked.

Products module:

List page shows seeded items

Create/Edit/Delete flows succeed and persist to DB

API/server actions validate input (zod) and return meaningful errors

Playwright configured; headless run passes locally and in CI; tests cover:

Home loads

Auth happy path (if auth=true; otherwise skipped)

Products CRUD happy path (if products=true; otherwise skipped)

CI on GitHub Actions:

Caches pnpm

Runs lint, typecheck, unit (if any) and Playwright E2E against a Postgres service

Fails PRs on any error

Deploy workflow:

On push to main and after CI success, deploys to target (e.g., Vercel)

Environment secrets configured (DB URL, AUTH secrets, provider keys)

Post-deploy smoke hits / and /api/health and reports status

Documentation:

README.md explains setup, environment variables, scripts, toggles, and common tasks

CONTRIBUTING.md defines PR/branch conventions and CI expectations

.env.example lists all required variables with comments