import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { categories } from '../schema';

export const insertCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);
