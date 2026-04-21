"use client";

import Link from "next/link";
import { Syne } from "next/font/google";
import { useSession } from "next-auth/react";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { Session } from "next-auth";
import { useAuthStore } from "@/services/auth/hooks/use-auth-store";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export function TopBar({ initialSession }: { initialSession?: Session | null }) {
  const { data: sessionData, status } = useSession();
  const { logout } = useAuthStore();
  const session = sessionData || initialSession;
  const isLoading = status === "loading" && !initialSession;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className={`${syne.className} text-xl font-bold tracking-tight text-primary`}>
            Gear<span className="text-accent">Share</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/items" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Browse Gear
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            How it Works
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-muted" />
          ) : session ? (
            <div className="flex items-center gap-4">
              {(session.user.role === "admin" || session.user.role === "lender") && (
                <Link
                  href="/dashboard"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}
              
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card">
                <User size={16} className="text-muted-foreground" />
                <span className="text-xs font-medium max-w-[100px] truncate">
                  {session.user.name || session.user.email}
                </span>
              </div>

              <button
                onClick={() => logout()}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/renter-login"
                className="hidden sm:inline-flex text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Sign In
              </Link>

              <Link 
                href="/lender-signup" 
                className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
              >
                List Your Gear
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
