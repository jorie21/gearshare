"use server";

import { signIn, signOut } from "@/auth";
import { UserService } from "@/services/auth/query/user.service";
import { TokenService } from "@/services/auth/query/token.service";
import { MailService } from "@/services/auth/query/mail.service";
import { 
  loginSchema, 
  signUpSchema, 
  verifyCodeSchema, 
  passwordSetupSchema,
  SignUpInput, 
  LoginInput,
  VerifyCodeInput,
  PasswordSetupInput
} from "@/services/auth/validations/auth";
import { AuthError } from "next-auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function login(values: LoginInput) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials" };
        default:
          return { success: false, error: "Something went wrong" };
      }
    }
    throw error;
  }
}

export async function register(values: SignUpInput) {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const result = await UserService.createUser(validatedFields.data);

  if (!result.success) {
    return result;
  }

  // Automatically sign in after registration
  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Failed to sign in after registration" };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function signInWithProvider(provider: "google" | "github") {
  await signIn(provider, { redirectTo: "/" });
}

export async function requestEmailCode(email: string) {
  const emailSchema = z.string().email();
  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return { success: false, error: "Invalid email address" };
  }

  // 1. Generate code
  const tokenResult = await TokenService.generateVerificationToken(email);
  if (!tokenResult.success || !tokenResult.data) {
    return { success: false, error: tokenResult.error || "Failed to generate token" };
  }

  // 2. Send email
  const mailResult = await MailService.sendVerificationCode(email, tokenResult.data);
  if (!mailResult.success) {
    return { success: false, error: mailResult.error };
  }

  return { success: true };
}

export async function verifyEmailCode(values: VerifyCodeInput) {
  const validatedFields = verifyCodeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const { email, code } = validatedFields.data;

  // 1. Verify token
  const verifyResult = await TokenService.verifyToken(email, code);
  if (!verifyResult.success) {
    return { success: false, error: verifyResult.error };
  }

  return { success: true };
}

export async function completePasswordSetup(values: PasswordSetupInput) {
  const validatedFields = passwordSetupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const { email, token, password } = validatedFields.data;

  // 1. Verify token one last time (security)
  const verifyResult = await TokenService.verifyToken(email, token);
  if (!verifyResult.success) {
    return { success: false, error: "Verification expired. Please try again." };
  }

  // 2. Check if user exists
  const existingUserResult = await UserService.findByEmail(email);
  const user = existingUserResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (user) {
    // Update existing user
    await db
      .update(users)
      .set({ 
        password: hashedPassword,
        emailVerified: new Date(),
      })
      .where(eq(users.id, user.id));
  } else {
    // Create new user (if they signed up via email for the first time)
    await db.insert(users).values({
      email: email.toLowerCase(),
      password: hashedPassword,
      emailVerified: new Date(),
      role: "renter",
    });
  }

  // 3. Cleanup token
  await TokenService.deleteToken(email, token);

  // 4. Sign in
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Password set but failed to sign in automatically." };
    }
    throw error;
  }
}
