import Link from "next/link";
import { cn } from "@/lib/utils";
import { LenderSetupForm } from "@/components/forms/lender-setup-form";

export default function LenderApplicationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 border border-border bg-card p-8 shadow-2xl sm:rounded-3xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight font-heading">
            Lender Setup
          </h1>
          <p className="text-muted-foreground">
            Complete your store profile to start listing gear on the GearShare marketplace.
          </p>
        </div>

        <LenderSetupForm />

        <div className="text-center">
          <Link 
            href="/"
            className="text-sm font-medium text-muted-foreground hover:underline"
          >
            I&apos;ll do this later
          </Link>
        </div>
      </div>
    </div>
  );
}
