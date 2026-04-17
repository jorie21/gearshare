import Link from "next/link";
import { Lock, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export default function SetupPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-border bg-card p-8 shadow-2xl sm:rounded-3xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className={cn(syne.className, "text-3xl font-bold tracking-tight mt-6")}>
            Set Your Password
          </h1>
          <p className="text-muted-foreground">
            Create a secure password to protect your account.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="New Password"
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-11 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
              <EyeOff className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
            />
          </div>

          <div className="bg-secondary/50 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password Requirements:</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-accent" />
                Minimum 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-accent" />
                At least one uppercase letter
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-accent" />
                At least one number or symbol
              </li>
            </ul>
          </div>

          <Link 
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Finish Setup
          </Link>
        </div>
      </div>
    </div>
  );
}
