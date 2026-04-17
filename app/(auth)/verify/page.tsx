import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-border bg-card p-8 shadow-2xl sm:rounded-3xl">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <h1 className={cn(syne.className, "text-3xl font-bold tracking-tight mt-6")}>
            Check Your Email
          </h1>
          <p className="text-muted-foreground">
            We&apos;ve sent a 6-digit verification code to your email address.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="h-12 w-12 rounded-xl border border-border bg-background text-center text-lg font-bold transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              />
            ))}
          </div>

          <Link 
            href="/setup-password"
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Verify Code
          </Link>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Didn&apos;t receive a code?{" "}
              <button className="font-bold text-accent hover:underline">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
