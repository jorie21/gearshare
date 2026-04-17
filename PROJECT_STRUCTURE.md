# Project Structure: GearShare

This document defines the directory structure, architectural rules, and coding standards for the GearShare project. All development must adhere to these principles without exception.

## 1. Clean Code & Architecture Rules
- **Server-First**: Default to Server Components. Use `'use client'` only at leaf nodes for interactivity.
- **Service Pattern**: Business logic is FORBIDDEN in Server Actions or UI Components.
    - All DB queries and complex logic must reside in `/lib/services`.
    - Server Actions in `/lib/actions` act as orchestrators calling Services.
- **Donut Pattern**: Use Static Layouts with React Suspense boundaries. Isolate session-dependent UI in Client Components ("The Hole") to prevent full-page dynamic rendering.
- **Type Safety**: Explicit TypeScript interfaces for every function. No `any`.

## 2. Folder & Responsibility Standards

### `db/`
- `schemas/`: Pure table definitions.
- `index.ts`: Database connection initialization.
- `seed.ts`: Script for seeding the database.
- `migrations/`: Automatically generated SQL migration files.

### `lib/`
- `validations/`: Zod schemas for all data entry points (Client & Server).
- `services/`: The "Brain" (Queries, Price Calcs, Handshake Logic).
- `actions/`: The "Bridge" (Calls services, handles `revalidatePath`, and `redirect`).

### `components/`
- `ui/`: Atomic, logic-less UI components (buttons, modals, etc.).
- `forms/`: Client-side forms handling local state and validation.
- `cards/`: UI components for displaying data in card formats.
- `shared/`: Generic components used across multiple pages.

### `app/`
- `(admin)/`: Routes for the admin dashboard and inventory management.
- `(auth)/`: Authentication-related pages, split internally by purpose such as session flows and account onboarding.
- `(client)/`: Public-facing client routes.
- `api/`: Backend API endpoints.

## 3. Operational Rules
- **Error Handling**: Every Service and Action must return a consistent Response Object:
  `{ success: boolean, data: T, error: string }`.
- **Data Mutation**: All mutations must be handled via Server Actions.
- **User Flow**: "Renter-First" logic. Every account can rent by default, and the same account can also become a lender by creating items.
- **Capability Model**: The current schema does not store a user `role` column. A user acts as:
  - a renter when referenced by `bookings.renterId`
  - a lender when referenced by `items.ownerId`
  - an admin only through separate admin-specific logic, which is not yet modeled in the current schema

## 4. Feature Implementation Workflow
When building any feature, the following sequence MUST be followed:
1.  **Zod Schema**: Define the validation logic in `/lib/validations`.
2.  **Service**: Implement the business logic and DB queries in `/lib/services`.
3.  **Action**: Create the orchestrator in `/lib/actions`.
4.  **UI**: Build the presentation layer and forms.

## 5. Implementation Pattern
`[Component]` -> Calls `[Server Action]` -> Calls `[Service]` -> Queries `[DB]`
