# Fullstack Vibe Template (Next.js + Prisma + Postgres + Playwright)

A reusable Next.js template that can be specialized per client by toggling features (auth, DB, products, orders, checkout). It ships with a Postgres DB (Docker), Prisma ORM, TailwindCSS, and Playwright e2e smoke tests.

---

## Quick Start

### Prerequisites
- Node.js 18+ (tested with Node 22)
- pnpm (recommended) or npm
- Docker & Docker Compose (for local Postgres)
- VS Code extensions (optional but handy):
  - ESLint, Prettier, Tailwind CSS IntelliSense, Prisma, Playwright Test

### 1) Clone & install
```bash
git clone <your-repo-url> fullstack-vibe
cd fullstack-vibe
pnpm install
```

### 2) Bring up Postgres (local)
```bash
# creates a local postgres instance on default ports
docker compose -f infra/docker-compose.yml up -d
```

### 3) Environment variables
Create a `.env` file in the repo root. Minimal example:

```ini
# Prisma/DB
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vibe?schema=public"

# (add any other app secrets here)
```

### 4) Initialize the DB with Prisma
```bash
# generate Prisma Client
pnpm prisma:generate

# push schema to DB (or run migrations if you have them)
pnpm prisma:push

# optional: seed data if seed script exists
pnpm prisma:seed

# optional: open Prisma Studio
pnpm prisma:studio
```

If your package scripts differ, see the Scripts section below.

### 5) Run the dev server
```bash
pnpm dev
# open http://localhost:3000
```

You should see the landing page. A healthcheck endpoint is at:

```bash
GET /api/health  ->  { status: "ok" }
```

---

## What’s in the box
```bash
.
├─ config/
│  ├─ clients/static/flags.json   # per-client static feature flags (example client)
│  └─ schema.ts                   # feature-flag schema/types
├─ docs/
│  ├─ ARCHITECTURE.md             # high-level architecture
│  └─ BACKLOG.md                  # project backlog and plan
├─ e2e/
│  └─ specs/smoke.spec.ts         # Playwright smoke tests
├─ infra/
│  └─ docker-compose.yml          # local Postgres
├─ lib/
│  ├─ db.ts                       # Prisma client singleton
│  ├─ feature.ts                  # feature helpers (server-side gating)
│  └─ flags.ts                    # loads/merges flags (server/client)
├─ prisma/
│  ├─ schema.prisma               # data models
│  └─ seed.ts                     # optional seed script
├─ public/                        # static assets (svgs, icons)
├─ scripts/
│  ├─ ensure/                     # helper/ensure scripts (infra, prechecks)
│  └─ gen/                        # codegen/utility scripts
├─ src/app/
│  ├─ api/health/route.ts         # health endpoint
│  ├─ favicon.ico
│  ├─ globals.css                 # Tailwind base styles
│  ├─ layout.tsx                  # root layout
│  └─ page.tsx                    # landing page
├─ .env                           # your local env (not committed)
├─ eslint.config.mjs              # ESLint config
├─ next.config.ts                 # Next.js config
├─ playwright.config.ts           # Playwright config
├─ postcss.config.mjs             # PostCSS + Tailwind
├─ tailwind.config.ts             # Tailwind CSS config
├─ tsconfig.json                  # TypeScript config
└─ README.md
```

---

## Development Guide

### Feature toggles (per-client)
This template supports turning features on/off both server-side and client-side.

Define flags in `config/clients/static/flags.json`. Example:

```json
{
  "auth": false,
  "db": true,
  "products": false,
  "orders": false,
  "checkout": false
}
```

Access flags through:
- `lib/flags.ts` (loads/validates flags; can be made client-safe via selective exposure)
- `lib/feature.ts` (helpers like `isEnabled('auth')` or conditional utilities)

Server components/routes should read flags at runtime and avoid rendering disabled features. Client components should receive only the subset of flags they require to avoid leaking hidden features.

**Tip:** Keep a `config/clients/` folder per client (e.g., `clients/bakery/flags.json`) and wire selection by env var (`CLIENT_KEY=bakery`). The default example uses `clients/static`.

---

### Database (Prisma + Postgres)
- Schema in `prisma/schema.prisma`.
- Generate client: `pnpm prisma:generate`
- Apply schema: `pnpm prisma:push` (or migrations if you add them)
- Optional seeding: `pnpm prisma:seed`
- Studio (DB UI): `pnpm prisma:studio`

---

### Styling (Tailwind)
- Global styles in `src/app/globals.css`.
- Tailwind config in `tailwind.config.ts`.
- Use utility classes in your components as usual.

---

### API routes (App Router)
- Example healthcheck at `src/app/api/health/route.ts`.
- Add server routes under `src/app/api/<name>/route.ts` with standard Next.js Request/Response.

---

### End-to-end tests (Playwright)
- Config in `playwright.config.ts`.
- Specs in `e2e/specs/`.

Install browsers once:
```bash
pnpm exec playwright install
```

Run tests:
```bash
pnpm test:e2e
```

---

## Scripts
Your `package.json` may already define these. If not, add equivalents or adjust commands accordingly.

Commonly used:
```bash
# Dev & build
pnpm dev             # Next.js dev server
pnpm build           # Next.js production build
pnpm start           # Run built app

# Lint & types
pnpm lint            # ESLint
pnpm typecheck       # tsc --noEmit

# Prisma
pnpm prisma:generate # npx prisma generate
pnpm prisma:push     # npx prisma db push
pnpm prisma:studio   # npx prisma studio
pnpm prisma:seed     # ts-node prisma/seed.ts (or your seed runner)

# Tests
pnpm test:e2e        # Playwright tests
```

---

## Workflows

### Local development loop
1. Run DB with Docker:  
   ```bash
   docker compose -f infra/docker-compose.yml up -d
   ```
2. Ensure `.env` is set (see Quick Start).
3. Run `pnpm dev` and iterate.
4. Optional: open DB UI with `pnpm prisma:studio`.
5. Run smoke e2e: `pnpm test:e2e`.

### Adding a new feature module
- Define a flag (e.g., `"products": true`) in the active client flags JSON.
- Create routes/components under `src/app/(products)/...` or `src/app/products`.
- Gate server-side loaders/handlers with `lib/feature.ts`.
- Add minimal Prisma models (if needed) and push schema.
- Add a smoke test in `e2e/specs/`.

### Per-client specialization
- Create `config/clients/<clientKey>/flags.json`.
- Select client via env var (e.g., `CLIENT_KEY=<clientKey>`) and load that file inside `lib/flags.ts`.
- At build/deploy time, choose the correct `CLIENT_KEY` to build and expose only the needed features.

---

## Troubleshooting

### Cannot connect to Postgres
- Verify Docker is running and `infra/docker-compose.yml` is up.
- Check `DATABASE_URL` in `.env`.
- Run `pnpm prisma:generate` again after any schema changes.

### Playwright test fails to start
- Run `pnpm exec playwright install` once to install browsers.
- Ensure dev server is running if tests assume `http://localhost:3000`.

### Styles not applied
- Confirm Tailwind directives in `src/app/globals.css`.
- Ensure files use `.tsx` extension and include Tailwind classes.

---

## API Surface
- `GET /api/health` → `{ "status": "ok" }` (basic liveness probe)

---

## Contributing
- Keep features gated via `lib/feature.ts` and `config/clients/*/flags.json`.
- Prefer Server Components and route handlers for data access.
- Keep Prisma client as a singleton (`lib/db.ts`) to avoid connection storms in dev.
- Add at least one smoke e2e test for each new top-level feature.
