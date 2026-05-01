import { db } from "@/db";
import { items, categories } from "@/db/schema";
import { eq, ilike, or, and } from "drizzle-orm";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  imageUrl: string | null;
  categoryId: string;
  status: 'available' | 'rented' | 'maintenance';
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  reviewsCount: number;
  category?: Category;
}

export async function getItems(filters?: { categoryId?: string; search?: string; ownerId?: string }) {
  try {
    const where = [];
    
    if (filters?.categoryId) {
      where.push(eq(items.categoryId, filters.categoryId));
    }

    if (filters?.ownerId) {
      where.push(eq(items.ownerId, filters.ownerId));
    }
    
    if (filters?.search) {
      where.push(
        or(
          ilike(items.name, `%${filters.search}%`),
          ilike(items.description, `%${filters.search}%`)
        )
      );
    }

    const data = await db.query.items.findMany({
      where: where.length > 0 ? and(...where) : undefined,
      with: {
        category: true
      },
      orderBy: (items, { desc }) => [desc(items.createdAt)],
    });

    // Format decimal to number and add defaults for UI fields
    const formattedData = data.map(item => ({
      ...item,
      pricePerDay: Number(item.pricePerDay),
      rating: 4.5, // Default for now
      reviewsCount: Math.floor(Math.random() * 20) + 1, // Default for now
    })) as Item[];

    return { success: true, data: formattedData, error: null };
  } catch (error) {
    console.error("Error fetching items:", error);
    return { success: false, data: [], error: "Failed to fetch items" };
  }
}

export async function getCategories() {
  try {
    const data = await db.select().from(categories);
    return { success: true, data: data as Category[], error: null };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [], error: "Failed to fetch categories" };
  }
}

export async function getItemById(id: string) {
  try {
    const data = await db.query.items.findFirst({
      where: eq(items.id, id),
      with: {
        category: true
      }
    });

    if (!data) return { success: false, data: null, error: 'Item not found' };

    const formattedItem = {
      ...data,
      pricePerDay: Number(data.pricePerDay),
    } as Item;

    return { success: true, data: formattedItem, error: null };
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    return { success: false, data: null, error: "Failed to fetch item" };
  }
}

export async function createItem(data: any) {
  try {
    const [newItem] = await db.insert(items).values(data).returning();
    return { success: true, data: newItem, error: null };
  } catch (error) {
    console.error("Error creating item:", error);
    return { success: false, data: null, error: "Failed to create item" };
  }
}

export async function updateItem(id: string, data: any) {
  try {
    const [updatedItem] = await db.update(items)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(items.id, id))
      .returning();
    return { success: true, data: updatedItem, error: null };
  } catch (error) {
    console.error(`Error updating item ${id}:`, error);
    return { success: false, data: null, error: "Failed to update item" };
  }
}

export async function deleteItem(id: string) {
  try {
    await db.delete(items).where(eq(items.id, id));
    return { success: true, data: null, error: null };
  } catch (error) {
    console.error(`Error deleting item ${id}:`, error);
    return { success: false, data: null, error: "Failed to delete item" };
  }
}
