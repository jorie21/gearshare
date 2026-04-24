"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 bg-muted/50 border border-border px-3 py-1.5 rounded-xl w-full max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <Search size={18} className="text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search gear, bookings, or renters..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
          aria-label="Toggle theme"
        >
          {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground relative border border-transparent hover:border-border">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-card" />
        </button>

        <div className="h-8 w-px bg-border mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold leading-none">Lender Account</p>
            <p className="text-[10px] text-muted-foreground mt-1">ID: #88291</p>
          </div>
        </div>
      </div>
    </header>
  );
}
