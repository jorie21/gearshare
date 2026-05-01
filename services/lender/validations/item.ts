import { z } from "zod";

export const itemInputSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricePerDay: z.coerce.number().positive("Price must be a positive number"),
  categoryId: z.string().uuid("Invalid category"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  status: z.enum(["available", "rented", "maintenance"]).default("available"),
});

export type ItemInput = z.infer<typeof itemInputSchema>;
