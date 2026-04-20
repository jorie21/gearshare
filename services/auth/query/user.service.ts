import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignUpInput } from "@/services/auth/validations/auth";

export class UserService {
  static async findByEmail(email: string) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email.toLowerCase()),
      });
      return { success: true, data: user, error: null };
    } catch (error) {
      console.error("Error finding user by email:", error);
      return { success: false, data: null, error: "Failed to find user" };
    }
  }

  static async findById(id: string) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });
      return { success: true, data: user, error: null };
    } catch (error) {
      console.error("Error finding user by id:", error);
      return { success: false, data: null, error: "Failed to find user" };
    }
  }

  static async createUser(input: SignUpInput) {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      
      const [newUser] = await db
        .insert(users)
        .values({
          name: input.name,
          email: input.email.toLowerCase(),
          password: hashedPassword,
          role: input.role,
        })
        .returning();

      return { success: true, data: newUser, error: null };
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "23505") {
        return { success: false, data: null, error: "Email already exists" };
      }
      console.error("Error creating user:", error);
      return { success: false, data: null, error: "Failed to create user" };
    }
  }
}
