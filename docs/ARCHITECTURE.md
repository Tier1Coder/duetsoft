Architecture

Stack

Next.js 15 (App Router, RSC, ISR) + TypeScript (strict)

TailwindCSS + Radix UI primitives (optional)

Auth.js (NextAuth) with PrismaAdapter (GitHub/Email providers prewired)

Prisma ORM + PostgreSQL 16 (Docker for local dev)

Playwright for e2e; Vitest/Testing Library for unit/integration (optional)

Env management via .env + schema validation (zod)

CI: GitHub Actions (matrix per client), Postgres service container, caching (pnpm)

CD (pick one per client): Vercel (recommended) or Docker image to your registry

Repository layout (template)

/app
  /(marketing)            # static pages always available
  /(account)              # gated by FLAGS.auth
  /(shop)                 # gated by FLAGS.products
    /products
    /cart
    /checkout
  /api
    /auth/[...nextauth]
    /products
    /cart
    /orders
    /checkout
/components               # UI building blocks
/lib
  auth.ts                 # Auth.js server helpers
  db.ts                   # Prisma client loader (or stubs when DB off)
  feature.ts              # helpers: withFeature(), notFoundOr()
  flags.ts                # GENERATED per client at build time (literal booleans)
  payments/
    index.ts              # PaymentProvider interface
    stripe.ts             # Stripe adapter (optional)
    test.ts               # No-op/test payments for demo
/config
  /clients/
    acme/flags.json
    bakery/flags.json
    static/flags.json
  schema.ts               # zod for flags validation + cross-feature rules
/prisma
  schema.prisma
  seed.ts                 # conditional seeding per FLAGS
/e2e
  playwright.config.ts
  specs/*.spec.ts
/scripts
  gen-flags.ts            # reads config/clients/$CLIENT_ID/flags.json -> lib/flags.ts
  ensure-env.ts           # checks env + cross-feature constraints
docker-compose.yml        # local Postgres
next.config.ts            # rewrites for disabled features + env inlining
package.json / pnpm-lock.yaml
.eslintrc.cjs / .prettierrc
.github/workflows/ci.yml
.env.example


Feature toggle strategy (per-client)

Single-source config: config/clients/<client>/flags.json

{
  "auth": true,
  "db": true,
  "products": true,
  "orders": true,
  "checkout": true,
  "paymentProvider": "test" // or "stripe"
}


Build-time inlining (tree-shake client code):

pnpm gen:flags --client=acme writes lib/flags.ts with literal booleans:

// lib/flags.ts (generated)
export const FLAGS = { auth: true, db: true, products: false, orders: false, checkout: false } as const;


Literal booleans let Next/TS dead-code-eliminate gated imports in client bundles.

Pages/components import FLAGS and conditionally import heavy subtrees lazily:

// app/(shop)/products/page.tsx
import { FLAGS } from "@/lib/flags";
import { notFound } from "next/navigation";
if (!FLAGS.products) notFound();
export { default } from "./_impl"; // this file only built when page remains reachable


Server-side route gating:

Middleware: if a feature is off, rewrite /products|/cart|/checkout|/orders to /404.

API route guards: early 404 (return new Response("Not Found", { status: 404 })) when disabled.

Client-side nav gating: build menus from FLAGS so hidden features never appear.

Cross-feature constraints (validated at build):

auth ⇒ db (Auth requires DB/adapter).

orders ⇒ products ∧ db.

checkout ⇒ orders ∧ paymentProvider.

Runtime toggles (optional): NEXT_PUBLIC_FEATURE_* can hide UI without rebuild (no code stripping). Use only for non-critical visibility; authoritative gates remain server-side.

Auth

Auth.js with PrismaAdapter when FLAGS.auth && FLAGS.db.

Providers: GitHub (default) + Email (magic link). Providers list lives in config/clients/<client>/auth.json if you need per-client sources.

When auth=false, getCurrentUser() returns null, account routes 404 via notFound().

Data

Local dev: docker-compose up -d starts postgres:16 with mounted volume. prisma migrate dev, then prisma db seed (conditional on FLAGS).

Production: managed Postgres (Neon/Planetscale PG-compatible/Render/Supabase) or your own.

Payments

PaymentProvider interface with createCheckoutSession, getPaymentStatus, webhook handler.

Adapters: test (in-memory/fake), stripe (real). FLAGS.checkout decides availability; provider chosen in flags/env.

CI/CD

Matrix per client: strategy.matrix.client = [static, bakery, shop, ...]

Each matrix job sets CLIENT_ID, runs scripts/gen-flags.ts, builds, runs e2e against a Postgres service, and uploads artifacts.

Optional deploy steps (per matrix row) to Vercel or push Docker image.

DB Models

Prisma schema sketches (fields trimmed for brevity; all timestamps include createdAt/updatedAt).

Auth (Auth.js)

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String?  @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  addresses     Address[]
  orders        Order[]
  carts         Cart[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}


Catalog

model Product {
  id          String            @id @default(cuid())
  slug        String            @unique
  title       String
  description String?
  active      Boolean           @default(true)
  images      ProductImage[]
  variants    ProductVariant[]
  categories  Category[]        @relation(references: [id])
}

model ProductVariant {
  id         String   @id @default(cuid())
  sku        String   @unique
  productId  String
  title      String
  priceCents Int      // currency via enum; or Money table if multi-currency
  currency   Currency @default(PLN)
  stock      Int      @default(0)
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@index([productId])
}

model ProductImage {
  id         String  @id @default(cuid())
  productId  String
  url        String
  alt        String?
  position   Int      @default(0)
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Category {
  id    String    @id @default(cuid())
  slug  String    @unique
  name  String
  products Product[]
}

enum Currency { PLN EUR USD }


Cart & Orders

model Cart {
  id        String     @id @default(cuid())
  userId    String?
  sessionId String?    @unique // anon carts
  items     CartItem[]
  user      User?      @relation(fields: [userId], references: [id])
}

model CartItem {
  id           String         @id @default(cuid())
  cartId       String
  variantId    String
  quantity     Int            @default(1)
  unitPriceCts Int
  currency     Currency
  cart         Cart           @relation(fields: [cartId], references: [id], onDelete: Cascade)
  variant      ProductVariant @relation(fields: [variantId], references: [id])
  @@index([cartId])
}

model Order {
  id              String        @id @default(cuid())
  number          String        @unique
  userId          String?
  status          OrderStatus   @default(PENDING)
  paymentStatus   PaymentStatus @default(PAYMENT_PENDING)
  totalCents      Int
  currency        Currency
  billingAddressId  String?
  shippingAddressId String?
  items           OrderItem[]
  user            User?         @relation(fields: [userId], references: [id])
  billingAddress  Address?      @relation("billing", fields: [billingAddressId], references: [id])
  shippingAddress Address?      @relation("shipping", fields: [shippingAddressId], references: [id])
  payments        Payment[]
  @@index([userId])
}

model OrderItem {
  id         String         @id @default(cuid())
  orderId    String
  variantId  String
  quantity   Int
  unitPriceCts Int
  currency   Currency
  order      Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variant    ProductVariant @relation(fields: [variantId], references: [id])
}

model Address {
  id        String  @id @default(cuid())
  userId    String?
  name      String
  line1     String
  line2     String?
  city      String
  postal    String
  country   String
  phone     String?
  user      User?   @relation(fields: [userId], references: [id])
}

model Payment {
  id               String        @id @default(cuid())
  orderId          String
  provider         String
  providerRef      String?
  amountCents      Int
  currency         Currency
  status           PaymentStatus @default(PAYMENT_PENDING)
  raw              Json?
  order            Order         @relation(fields: [orderId], references: [id], onDelete: Cascade)
}

enum OrderStatus { PENDING CONFIRMED FULFILLED CANCELED }
enum PaymentStatus { PAYMENT_PENDING PAID FAILED REFUNDED }


Stubs when DB is off (FLAGS.db=false)

lib/db.ts exports typed no-op repositories (in-memory) so compilation succeeds.

prisma not generated in that build; CI matrix for static client skips DB jobs.

API

All route handlers live in app/api/*/route.ts and are gated by FLAGS on the server.

Auth

GET /api/auth/session → { user: { id, name, email }, expires } | { user: null }

Auth.js routes under /api/auth/* (callback, signin, signout) enabled only when FLAGS.auth.

Products (FLAGS.products)

GET /api/products?search=&cursor=&limit= → { items: Product[], nextCursor?: string }

GET /api/products/[slug] → Product | 404

GET /api/variants/[sku] → ProductVariant | 404

Cart

GET /api/cart → { id, items: CartItem[], totals } (by user session or x-cart-id cookie)

POST /api/cart/add body { variantId, quantity } → updated cart

POST /api/cart/update body { lineId, quantity } → updated cart

POST /api/cart/clear → { ok: true }

Orders (FLAGS.orders)

POST /api/orders body { cartId, billing, shipping } → { orderId, number }

GET /api/orders/[id] (auth required when FLAGS.auth) → Order

Checkout (FLAGS.checkout)

POST /api/checkout/session body { orderId } → { checkoutUrl, provider, sessionId }

POST /api/checkout/webhook (stripe/test) → 200 (verifies signature, updates Payment/Order)

Public flags for UI

GET /api/flags → { auth, products, orders, checkout } (read from generated FLAGS to sync SSR/CSR)

Errors & validation

All inputs validated via zod; 422 on validation error; 404 when feature disabled; 401 for auth-required.

Checklist

Project bootstrap

 Init Next.js (App Router, experimental.taint off, TS strict) + Tailwind + eslint/prettier.

 Add pnpm scripts: dev, build, start, lint, typecheck, test, e2e, migrate, seed, gen:flags.

 Create config/schema.ts (zod) and scripts/gen-flags.ts (generates lib/flags.ts with literal booleans).

 Implement scripts/ensure-env.ts with cross-feature constraints (auth ⇒ db, etc.).

Feature gates

 middleware.ts: rewrite disabled feature paths to /404.

 Server routes/pages call notFound() if feature off.

 Navigation built from FLAGS; no dead links.

 Add optional NEXT_PUBLIC_FEATURE_* to allow runtime hiding (UI only).

Auth

 Auth.js + PrismaAdapter behind FLAGS.auth.

 Providers: GitHub + Email; .env.example includes GITHUB_ID/SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL.

 lib/auth.ts helpers (auth(), getCurrentUser()), and withAuth route guard.

Database

 docker-compose.yml for local Postgres with volume + healthcheck.

 Prisma schema as above; generate client; add seed with sample products/variants.

 lib/db.ts exports Prisma client or in-memory stubs when FLAGS.db=false.

Catalog/Cart/Orders

 Minimal product listing & detail pages (ISR) gated by FLAGS.products.

 Cart endpoints + cookie/session management.

 Order creation, status transitions, and events (payment succeeded → CONFIRMED).

Checkout

 PaymentProvider interface; implement test + optional stripe.

 Webhook route; signature verification; idempotency.

Testing

 Playwright: smoke flow per feature set (matrix):
- static client: loads home/marketing only, no /shop links.
- shop client: browse → add to cart → create order → checkout (test provider).

 Optional Vitest unit tests for guards, repositories, zod schemas.

CI (GitHub Actions)

 Workflow .github/workflows/ci.yml:

name: CI
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        client: [static, bakery, shop]
    env:
      CLIENT_ID: ${{ matrix.client }}
      NEXT_TELEMETRY_DISABLED: 1
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: app
          POSTGRES_PASSWORD: app
          POSTGRES_DB: app
        ports: ["5432:5432"]
        options: >-
          --health-cmd="pg_isready -U app -d app" --health-interval=10s
          --health-timeout=5s --health-retries=5
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm tsx scripts/gen-flags.ts --client $CLIENT_ID
      - run: pnpm tsx scripts/ensure-env.ts
      - if: env.CLIENT_ID != 'static'
        run: |
          pnpm prisma generate
          pnpm prisma migrate deploy
          pnpm prisma db seed
      - run: pnpm lint && pnpm typecheck
      - run: pnpm build
      - name: E2E
        run: |
          pnpm dlx playwright install --with-deps
          pnpm start & npx wait-on http://localhost:3000
          pnpm e2e


 Optional deploy job per client (Vercel CLI with --scope + project env, or Docker build & push).

Deployment

 Document per-client environment maps (separate .env.<client>) and secrets in GitHub.

 Vercel: create a project per client; connect repo; limit builds to its matrix artifact or branch.

 Docker (alternative): Dockerfile multi-stage; image tagged template:<client> built from matrix.

DX & Ops

 .env.example with all keys (comment which ones required by which features).

 README.md quick-start per client:
- pnpm gen:flags --client=bakery
- docker-compose up -d
- pnpm dev

 Telemetry off by default.

 Sane logging & error boundaries; 404/disabled feature page with support contact.