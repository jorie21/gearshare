import Link from "next/link";
import { FileText, Camera, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export default function LenderApplicationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 border border-border bg-card p-8 shadow-2xl sm:rounded-3xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className={cn(syne.className, "text-3xl font-bold tracking-tight")}>
            Lender Verification
          </h1>
          <p className="text-muted-foreground">
            Complete your profile to start listing gear on the GearShare marketplace.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {/* Step 1: Personal Details */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm">1</span>
              Personal & Business Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Government ID Number"
                className="h-12 w-full rounded-full border border-border bg-background px-6 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="h-12 w-full rounded-full border border-border bg-background px-6 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
          </div>

          {/* Step 2: Address */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm">2</span>
              Pickup Location
            </h3>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your primary pickup address"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            </div>
          </div>

          {/* Step 3: Identity Docs */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm">3</span>
              Identity Verification
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background p-6 transition-colors hover:border-accent">
                <Camera className="h-6 w-6 text-muted-foreground" />
                <p className="text-xs font-medium">Upload ID Front</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background p-6 transition-colors hover:border-accent">
                <ShieldCheck className="h-6 w-6 text-muted-foreground" />
                <p className="text-xs font-medium">Selfie with ID</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Your data is encrypted and stored securely according to our Privacy Policy.
          </div>
          <Link 
            href="/dashboard"
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-95"
          >
            Submit Application
          </Link>
          <Link 
            href="/"
            className="text-center text-sm font-medium text-muted-foreground hover:underline"
          >
            I&apos;ll do this later
          </Link>
        </div>
      </div>
    </div>
  );
}
