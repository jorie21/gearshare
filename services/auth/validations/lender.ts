import { z } from "zod";

export const lenderProfileSchema = z.object({
  storeName: z.string().min(3, "Store name must be at least 3 characters").max(50),
  bio: z.string().max(500).optional(),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  pickupAddress: z.string().min(10, "Please provide a complete pickup address"),
  city: z.string().min(2, "City is required"),
});

export type LenderProfileInput = z.infer<typeof lenderProfileSchema>;
