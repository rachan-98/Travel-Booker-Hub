# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Auth**: JWT (jsonwebtoken + bcryptjs)
- **Frontend**: React + Vite + TanStack Query + shadcn/ui

## Application

**Hotel & Flight Booking System** — a full-stack booking platform with:
- JWT authentication (register/login)
- Hotel search with destination filtering
- Flight search with origin/destination filtering
- Booking management (create, view, cancel)
- Booking task CRUD (create, read, update, delete)
- Protected routes (redirect unauthenticated users)
- Filter tasks by status (pending/booked) and category

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── booking-app/        # React + Vite frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Database Schema

- `users` — id, name, email, password_hash, created_at
- `bookings` — id, user_id, type (hotel/flight), reference_id, details, total_price, status, check_in, check_out, passengers, guests, created_at
- `tasks` — id, user_id, title, description, category, status (pending/booked), created_at, updated_at

## API Routes

### Auth
- `POST /api/auth/register` — register user → JWT token
- `POST /api/auth/login` — login user → JWT token
- `GET /api/auth/me` — get current user (Bearer)

### Hotels
- `GET /api/hotels/search?destination&checkIn&checkOut&guests`

### Flights
- `GET /api/flights/search?origin&destination&departDate&returnDate&passengers&tripType`

### Bookings (Protected)
- `GET /api/bookings?type&status`
- `POST /api/bookings`
- `GET /api/bookings/:id`
- `DELETE /api/bookings/:id` (cancels booking)

### Tasks (Protected)
- `GET /api/tasks?status&category`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly`

## JWT Secret

JWT_SECRET env variable (defaults to hardcoded dev key). Set in production.

## Redis

Redis integration for caching can be added in `artifacts/api-server/src/lib/cache.ts` using `ioredis`.
