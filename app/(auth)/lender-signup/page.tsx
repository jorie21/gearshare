"use client";

import Link from "next/link";
import { Mail, User, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Syne } from "next/font/google";
import { GoogleIcon } from "@/public/icons/simple-icons-google";
import { GithubIcon } from "@/public/icons/simple-icons-github";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services/auth/hooks/use-auth-store";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export default function LenderSignupPage() {
  const router = useRouter();
  const { register, signInWithProvider, isLoading, error, clearError } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      ...formData,
      role: "lender",
    }, () => {
      router.push("/lender-application");
      router.refresh();
    });
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    signInWithProvider(provider);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-border bg-card p-8 shadow-2xl sm:rounded-3xl">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className={cn(syne.className, "text-2xl font-bold tracking-tight text-primary")}>
            Gear<span className="text-accent">Share</span>
          </Link>
          <h1 className={cn(syne.className, "text-3xl font-bold tracking-tight mt-6")}>
            Lender Registration
          </h1>
          <p className="text-muted-foreground">
            Register to list your gear and start earning.
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="grid gap-3 py-4">
          <button
            disabled={isLoading}
            onClick={() => handleSocialLogin("google")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95 disabled:opacity-50"
          >
            <GoogleIcon size={20} />
            Register with Google
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleSocialLogin("github")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95 disabled:opacity-50"
          >
            <GithubIcon size={20} />
            Register with GitHub
          </button>
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                disabled={isLoading}
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none disabled:opacity-50"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                disabled={isLoading}
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none disabled:opacity-50"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                disabled={isLoading}
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 chars)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-11 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="flex h-12 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue to Verification"}
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/renter-login" className="font-bold text-primary hover:underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
