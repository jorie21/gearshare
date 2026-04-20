import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "renter" | "lender" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "renter" | "lender" | "admin";
  }
}
