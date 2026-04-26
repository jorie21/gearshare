import { db } from "@/db";
import { lenderProfiles, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { LenderProfileInput } from "../validations/lender";

export class LenderService {
  static async createProfile(userId: string, data: LenderProfileInput) {
    try {
      return await db.transaction(async (tx) => {
        // 1. Create the lender profile
        const [profile] = await tx
          .insert(lenderProfiles)
          .values({
            userId,
            ...data,
          })
          .returning();

        // 2. Update the user role to lender
        await tx
          .update(users)
          .set({ role: "lender" })
          .where(eq(users.id, userId));

        return { success: true, data: profile };
      });
    } catch (error) {
      console.error("Error creating lender profile:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to create lender profile" 
      };
    }
  }

  static async getProfileByUserId(userId: string) {
    try {
      const profile = await db.query.lenderProfiles.findFirst({
        where: eq(lenderProfiles.userId, userId),
      });
      return { success: true, data: profile };
    } catch (error) {
      return { success: false, error: "Failed to fetch lender profile" };
    }
  }
}
