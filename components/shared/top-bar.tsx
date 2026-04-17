"use client";

import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export function TopBar() {
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
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
  );
}
