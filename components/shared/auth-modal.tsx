"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Syne } from "next/font/google";
import { GoogleIcon } from "@/public/icons/simple-icons-google";
import { GithubIcon } from "@/public/icons/simple-icons-github";
import { FacebookIcon } from "@/public/icons/simple-icons-facebook";

const syne = Syne({ subsets: ["latin"], weight: ["700"] });

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function SignInModal({ isOpen, onOpenChange, trigger }: AuthModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-8 shadow-2xl duration-200 animate-in fade-in zoom-in-95 sm:rounded-3xl">
          <div className="flex flex-col space-y-2 text-center">
            <Dialog.Title className={cn(syne.className, "text-3xl font-bold tracking-tight")}>
              Welcome Back
            </Dialog.Title>
            <Dialog.Description className="text-muted-foreground">
              Sign in to manage your gear and bookings.
            </Dialog.Description>
          </div>

          <div className="grid gap-3 py-4">
            <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95">
              <GoogleIcon size={20} />
              Continue with Google
            </button>
            <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95">
              <GithubIcon size={20} />
              Continue with GitHub
            </button>
            <button className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary active:scale-95">
              <FacebookIcon size={20} />
              Continue with Facebook
            </button>
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                />
              </div>
              <button className="h-12 w-full rounded-full bg-primary font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95">
                Sign In with Email
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button className="font-bold text-accent hover:underline underline-offset-4">
              Create an account
            </button>
          </div>

          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
