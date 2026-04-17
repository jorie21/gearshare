# GEMINI.md - Project Context & Instructions

This document provides essential context and instructions for AI agents interacting with the **GearShare** codebase.

## Project Overview
**GearShare** is a community-driven gear sharing platform. It allows users (Renters) to list, find, and rent equipment. The project follows a strict **Clean Architecture** and a **Service-First** implementation pattern.

### Key Technologies
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS 4
- **Validation:** Zod
- **Font:** Geist (Sans & Mono)

## Core Architectural Mandates
Refer to `PROJECT_STRUCTURE.md` for absolute principles.

### 1. Implementation Flow
Every feature MUST follow this sequence:
1.  **Zod Schema:** Define validation in `/lib/validations`.
2.  **Service:** Implement business logic and DB queries in `/lib/services`.
3.  **Action:** Create an orchestrator in `/lib/actions` (calls services, handles revalidation/redirects).
4.  **UI:** Build the presentation layer in `/app` or `/components`.

**Pattern:** `[Component]` -> `[Server Action]` -> `[Service]` -> `[DB]`

### 2. Design Patterns
- **Service Pattern:** Business logic is FORBIDDEN in Server Actions or UI Components. It must reside in `/lib/services`.
- **Server-First:** Default to Server Components. Use `'use client'` only at leaf nodes.
- **Donut Pattern:** Use Static Layouts with React Suspense boundaries. Isolate session-dependent UI in Client Components.
- **Type Safety:** Explicit TypeScript interfaces for everything. No `any`.

### 3. Consistency
- **Response Object:** Every Service and Action must return:
  `{ success: boolean, data: T, error: string }`
- **Error Handling:** Centralized in Services/Actions.

## Directory Structure
- `app/`: Route groups: `(admin)`, `(auth)`, `(client)`.
- `db/`: Schema definitions (`schema.ts`), migrations, and seed scripts.
- `lib/`:
    - `services/`: The "Brain" (Queries, business logic).
    - `actions/`: The "Bridge" (Server Actions).
    - `validations/`: Zod schemas.
- `components/`:
    - `ui/`: Atomic components.
    - `forms/`: Client-side logic.
    - `cards/`, `shared/`: Reusable presentation.

## Building and Running
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Database:**
    - `npm run db:push`: Push schema changes.
    - `npm run db:generate`: Generate migrations.
    - `npm run db:migrate`: Run migrations.
    - `npm run db:seed`: Seed the database.
    - `npm run db:setup`: Full DB initialization (generate + migrate + seed).
    - `npm run db:studio`: Open Drizzle Studio.

## Critical Notes
- **Next.js Version:** This project may use a version of Next.js with breaking changes (see `AGENTS.md`). Always verify APIs against `node_modules/next/dist/docs/` if available.
- **Renter-First:** Every account can rent by default. The same account can also lend by creating items.
- **Role Modeling:** The current schema is capability-based, not auth-route-based. Users become renters through bookings and lenders through owned items.
- **Data Mutation:** MUST be handled via Server Actions.
