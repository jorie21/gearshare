"use client";

import Link from "next/link";
import { Mail, Lock, EyeOff, Eye, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Syne } from "next/font/google";
import { GoogleIcon } from "@/public/icons/simple-icons-google";
import { GithubIcon } from "@/public/icons/simple-icons-github";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services/auth/hooks/use-auth-store";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export default function RenterLoginPage() {
  const router = useRouter();
  const { login, signInWithProvider, isLoading, error, clearError } = useAuthStore();
  
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password }, () => {
      router.push("/");
      router.refresh();
    });
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    signInWithProvider(provider);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-border bg-card p-8 shadow-2xl sm:rounded-3xl relative overflow-hidden">
        <div className="flex flex-col space-y-2 text-center">
          <Link
            href="/"
            className={cn(
              syne.className,
              "text-2xl font-bold tracking-tight text-primary"
            )}
          >
            Gear<span className="text-accent">Share</span>
          </Link>
          <h1
            className={cn(
              syne.className,
              "text-3xl font-bold tracking-tight mt-6"
            )}
          >
            {showPasswordLogin ? "Welcome Back" : "Renter Login"}
          </h1>
          <p className="text-muted-foreground">
            {showPasswordLogin
              ? "Sign in with your email and password."
              : "Sign in to your renter account and browse gear."}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showPasswordLogin ? (
            <motion.div
              key="social-login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid gap-3 py-4"
            >
              <button
                disabled={isLoading}
                onClick={() => handleSocialLogin("google")}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95 disabled:opacity-50"
              >
                <GoogleIcon size={20} />
                Continue with Google
              </button>
              <button
                disabled={isLoading}
                onClick={() => handleSocialLogin("github")}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95 disabled:opacity-50"
              >
                <GithubIcon size={20} />
                Continue with GitHub
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>
                <button
                  disabled={true}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  Sign In with Email (Coming Soon)
                </button>
              </div>

              <button
                disabled={isLoading}
                onClick={() => setShowPasswordLogin(true)}
                className="text-center text-sm font-bold text-primary hover:underline mt-2"
              >
                Sign in with Password instead
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="password-login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-4 py-4"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-11 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-xs text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="h-12 w-full flex items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPasswordLogin(false)}
                className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mt-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Magic Link
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
          Want to lend gear instead?{" "}
          <Link
            href="/lender-signup"
            className="font-bold text-accent hover:underline underline-offset-4"
          >
            Become a Lender
          </Link>
        </div>
      </div>
    </div>
  );
}
