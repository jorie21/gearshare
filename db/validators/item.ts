import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { items } from '../schema';

export const insertItemSchema = createInsertSchema(items);
export const selectItemSchema = createSelectSchema(items);
