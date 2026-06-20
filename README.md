# grove

A Next.js starter implementing **authentication** and **role-based authorization**.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Auth.js v5** (NextAuth) — credentials (email + password), JWT sessions
- **Prisma 7** ORM with the MySQL driver adapter (`@prisma/adapter-mariadb`)
- **MySQL** database
- **Tailwind CSS v4**
- **TypeScript**, **Zod** validation, **bcryptjs** password hashing

## Features

- Email + password sign-up and sign-in
- Hashed passwords (bcrypt, 12 rounds)
- JWT sessions with `id` and `role` claims
- Role-based access control (`USER` / `ADMIN`)
- Two layers of protection:
  - **Middleware** ([src/middleware.ts](src/middleware.ts)) — coarse, edge-level route gating
  - **Server-side guards** ([src/lib/guards.ts](src/lib/guards.ts)) — authoritative checks in pages/actions
- Structured layouts via route groups: `(auth)` and `(dashboard)`

## Project structure

```
src/
├─ app/
│  ├─ (auth)/                 # centered auth layout
│  │  ├─ layout.tsx
│  │  ├─ login/page.tsx
│  │  └─ register/page.tsx
│  ├─ (dashboard)/            # header + sidebar + footer, auth-guarded
│  │  ├─ layout.tsx
│  │  ├─ dashboard/page.tsx
│  │  └─ admin/page.tsx       # ADMIN only
│  ├─ api/auth/[...nextauth]/route.ts
│  ├─ layout.tsx              # root layout
│  └─ page.tsx                # landing page
├─ actions/auth.ts           # login / register / logout server actions
├─ components/
│  ├─ auth-form.tsx          # login & register forms
│  ├─ logout-button.tsx
│  └─ layout/                # logo, site header/footer, dashboard header/sidebar
├─ lib/
│  ├─ prisma.ts              # Prisma client singleton (MariaDB adapter)
│  ├─ password.ts            # bcrypt hash/verify
│  ├─ validation.ts          # Zod schemas
│  ├─ guards.ts              # requireUser / requireAdmin
│  └─ navigation.ts          # dashboard nav config
├─ types/next-auth.d.ts      # session/JWT type augmentation
├─ auth.config.ts            # edge-safe Auth.js config (callbacks)
└─ auth.ts                   # NextAuth instance (Prisma adapter + Credentials)

prisma/
├─ schema.prisma            # User/Account/Session/VerificationToken + Role enum
└─ seed.ts                  # seeds an admin user
```

## Getting started

### 1. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

- `DATABASE_URL` — your MySQL connection string, e.g. `mysql://root:password@localhost:3306/grove`
- `AUTH_SECRET` — generate one with `npx auth secret` (or `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)
- `AUTH_TRUST_HOST` — set to `true` when self-hosting (non-Vercel)

### 2. Install dependencies

```bash
npm install
```

`postinstall` runs `prisma generate` automatically (client is emitted to `src/generated/prisma`).

### 3. Set up the database

Make sure your MySQL database exists and `DATABASE_URL` points to it, then apply the schema:

```bash
npm run db:migrate     # create + apply a migration (development)
# or, for a quick prototype without migration history:
npm run db:push
```

### 4. (Optional) Seed an admin user

```bash
npm run db:seed
```

Creates `admin@grove.local` / `admin12345` (override with `ADMIN_EMAIL` / `ADMIN_PASSWORD`). **Change the password after first login.**

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run db:generate` | Generate the Prisma client |
| `npm run db:push` | Push the schema to the database (no migration) |
| `npm run db:migrate` | Create and apply a migration (dev) |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed an admin user |

## How auth works

1. **Registration** ([src/actions/auth.ts](src/actions/auth.ts)) validates input with Zod, hashes the password with bcrypt, creates the user, then signs them in.
2. **Sign-in** uses the Auth.js **Credentials** provider ([src/auth.ts](src/auth.ts)), which verifies the password hash and returns the user (including `role`).
3. The `jwt` and `session` callbacks ([src/auth.config.ts](src/auth.config.ts)) put `id` and `role` onto the token and session.
4. **Middleware** redirects unauthenticated users away from protected routes and non-admins away from `/admin`.
5. **Server guards** (`requireUser` / `requireAdmin`) re-check on the server for defense in depth.

## Notes

- Credentials auth requires the **JWT** session strategy; the `Session`/`Account` Prisma models are included so you can add OAuth or database sessions later without a migration.
- Prisma 7 no longer accepts `url` in the schema datasource — the connection is provided via the MariaDB driver adapter at runtime ([src/lib/prisma.ts](src/lib/prisma.ts)) and via `prisma.config.ts` for the CLI.
