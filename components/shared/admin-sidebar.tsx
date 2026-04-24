"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  User, 
  Calendar, 
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-primary text-primary-foreground rounded-full p-1 border border-border hover:scale-110 transition-transform hidden md:block"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo Area */}
      <div className={cn(
        "p-6 flex items-center gap-3",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold text-xl">
          G
        </div>
        {!isCollapsed && (
          <span className="font-heading text-xl font-bold tracking-tight">GearShare</span>
        )}
      </div>

      {/* Profile Summary */}
      <div className={cn(
        "px-4 py-6 mb-4",
        isCollapsed ? "flex flex-col items-center" : ""
      )}>
        <div className={cn(
          "bg-muted/50 rounded-2xl p-4 flex items-center gap-4 border border-border/50 transition-all",
          isCollapsed ? "p-2" : "p-4"
        )}>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shrink-0">
            <User className="text-primary" size={24} />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">Alex Lender</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                <ShieldCheck size={10} className="text-success" />
                Verified Pro
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon size={20} className={cn(
                "shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              {!isCollapsed && <span>{item.name}</span>}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-border mt-auto">
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-medium",
          isCollapsed && "justify-center"
        )}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
