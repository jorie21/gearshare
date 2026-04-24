"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Store, Phone, Info, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createLenderAccount } from "@/lib/actions/lender.actions";
import { LenderProfileInput } from "@/lib/validations/lender";

export function LenderSetupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<LenderProfileInput>({
    storeName: "",
    bio: "",
    phoneNumber: "",
    pickupAddress: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createLenderAccount(formData);
      
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "An unexpected error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2">
          <Info size={16} />
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Store Basics */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm">1</span>
            Store Identity
          </h3>
          <div className="space-y-4">
            <div className="relative">
              <Store className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                type="text"
                placeholder="Store Name (e.g., Camera Haven)"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-6 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell renters about your gear and experience..."
              className="w-full rounded-2xl border border-border bg-background p-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none min-h-[100px] resize-none"
            />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm">2</span>
            Contact & Location
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-6 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="City / Area"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-6 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
            <textarea
              required
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              placeholder="Full Pickup Address (Only shared after confirmed booking)"
              className="w-full rounded-2xl border border-border bg-background pl-11 pr-6 pt-3.5 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none min-h-[80px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
          <ShieldCheck className="h-4 w-4 text-success" />
          Safe & Secure Marketplace
        </div>
        
        <button
          disabled={isPending}
          type="submit"
          className={cn(
            "flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-primary/20",
            isPending && "cursor-not-allowed"
          )}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Activate Lender Account"
          )}
        </button>
      </div>
    </form>
  );
}
