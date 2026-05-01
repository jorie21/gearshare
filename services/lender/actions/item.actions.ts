"use server";

import { auth } from "@/auth";
import { itemInputSchema } from "../validations/item";
import * as ItemService from "../query/item.service";
import { revalidatePath } from "next/cache";

export async function createItemAction(values: any) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const validatedFields = itemInputSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields", details: validatedFields.error.flatten().fieldErrors };
  }

  const result = await ItemService.createItem({
    ...validatedFields.data,
    ownerId: session.user.id,
  });

  if (result.success) {
    revalidatePath("/items");
    revalidatePath("/dashboard/inventory");
  }

  return result;
}

export async function updateItemAction(id: string, values: any) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  // Check ownership
  const existing = await ItemService.getItemById(id);
  if (!existing.success || existing.data?.ownerId !== session.user.id) {
    return { success: false, error: "Forbidden or not found" };
  }

  const validatedFields = itemInputSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields", details: validatedFields.error.flatten().fieldErrors };
  }

  const result = await ItemService.updateItem(id, validatedFields.data);

  if (result.success) {
    revalidatePath("/items");
    revalidatePath(`/items/${id}`);
    revalidatePath("/dashboard/inventory");
  }

  return result;
}

export async function deleteItemAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  // Check ownership
  const existing = await ItemService.getItemById(id);
  if (!existing.success || existing.data?.ownerId !== session.user.id) {
    return { success: false, error: "Forbidden or not found" };
  }

  const result = await ItemService.deleteItem(id);

  if (result.success) {
    revalidatePath("/items");
    revalidatePath("/dashboard/inventory");
  }

  return result;
}
