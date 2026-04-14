# Project Structure: GearShare

This document provides an overview of the directory structure and the purpose of each component in the GearShare project.

## Root Directory
- `app/`: Contains the Next.js application logic and routes using the App Router.
- `components/`: Houses reusable UI components categorized by function.
- `db/`: Database configuration, schemas, and migration files (Drizzle ORM).
- `lib/`: Shared utility functions, server actions, and validation schemas.
- `public/`: Static assets like images and SVG icons.
- `types/`: Global TypeScript type definitions.
- `drizzle.config.ts`: Configuration for the Drizzle database ORM.
- `next.config.ts`: Next.js framework configuration.
- `package.json`: Project dependencies and scripts.

---

## Key Directories Breakdown

### `app/`
- `(admin)/`: Routes for the admin dashboard and inventory management.
- `(auth)/`: Authentication-related pages (login, register).
- `(client)/`: Public-facing client routes.
- `api/`: Backend API endpoints.
- `globals.css`: Global styling for the application.
- `layout.tsx`: Root layout component.

### `components/`
- `cards/`: UI components for displaying data in card formats.
- `forms/`: Reusable form components and input fields.
- `shared/`: Generic components used across multiple pages.
- `ui/`: Base design system components (buttons, modals, etc.).

### `db/`
- `index.ts`: Database connection initialization.
- `seed.ts`: Script for seeding the database with initial data.
- `migrations/`: Automatically generated SQL migration files.
- `schemas/`: Definitions for database tables and relations.

### `lib/`
- `actions/`: Next.js Server Actions for data mutation.
- `validation/`: Zod schemas or other validation logic for forms and APIs.
