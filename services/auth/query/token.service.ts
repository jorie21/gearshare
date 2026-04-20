import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export class TokenService {
  /**
   * Generates a 6-digit random code and saves it to the DB
   */
  static async generateVerificationToken(email: string) {
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();   
      const expires = new Date(Date.now() + 15 * 60 * 1000);

      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.identifier, email));

      await db.insert(verificationTokens).values({
        identifier: email,
        token: code,
        expires,
      });

      return { success: true, data: code, error: null };
    } catch (error) {
      console.error("Error generating verification token:", error);
      return { success: false, data: null, error: "Failed to generate token" };
    }
  }

  /**
   * Verifies if a code is valid and not expired
   */
  static async verifyToken(email: string, code: string) {
    try {
      const existingToken = await db.query.verificationTokens.findFirst({
        where: and(
          eq(verificationTokens.identifier, email),
          eq(verificationTokens.token, code)
        ),
      });

      if (!existingToken) {
        return { success: false, error: "Invalid code" };
      }

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) {
        return { success: false, error: "Code has expired" };
      }

      return { success: true, data: existingToken, error: null };
    } catch (error) {
      console.error("Error verifying token:", error);
      return { success: false, error: "Failed to verify token" };
    }
  }

  /**
   * Deletes a token after use
   */
  static async deleteToken(email: string, code: string) {
    try {
      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, email),
            eq(verificationTokens.token, code)
          )
        );
      return { success: true };
    } catch (error) {
      console.error("Error deleting token:", error);
      return { success: false, error: "Failed to delete token" };
    }
  }
}
