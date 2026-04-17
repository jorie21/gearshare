import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from '../schema';

// Base Schemas
export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email("Invalid email address"),
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  password: () =>
    z.string().min(8, "Password must be at least 8 characters").optional(),
});
export const selectUserSchema = createSelectSchema(users);

// --- Multi-Step Auth Flow Schemas ---

/**
 * STEP 1: Initial Email Entry
 * Used in: /renter-login and /lender-signup
 */
export const authEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/**
 * STEP 2: Verification Code
 * Used in: /verify
 */
export const verifyCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be exactly 6 digits"),
});

/**
 * STEP 3: Password Configuration
 * Used in: /setup-password
 */
export const setupPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9\W]/, "Include at least one number or symbol"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * Traditional Login (Optional/Future Use)
 * Used if you ever want a single-page Email + Password login
 */
export const traditionalLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
