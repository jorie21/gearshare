"use server";

import { safeAuth } from "@/auth";
import { lenderProfileSchema, LenderProfileInput } from "../validations/lender";
import { LenderService } from "../services/lender.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLenderAccount(values: LenderProfileInput) {
  const session = await safeAuth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const validatedFields = lenderProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const result = await LenderService.createProfile(session.user.id, validatedFields.data);

  if (result.success) {
    revalidatePath("/dashboard");
    // Note: redirect() throws a special error, should be outside try/catch if any
  }

  return result;
}
