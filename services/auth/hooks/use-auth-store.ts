import { create } from "zustand";
import { 
  login, 
  register, 
  requestEmailCode, 
  verifyEmailCode, 
  completePasswordSetup 
} from "../actions/auth.actions";
import { signIn, signOut } from "next-auth/react";
import { LoginInput, SignUpInput, VerifyCodeInput, PasswordSetupInput } from "../validations/auth";

type AuthStep = "email" | "code" | "password";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  step: AuthStep;
  tempEmail: string | null;
  tempToken: string | null;
  
  // Actions
  login: (values: LoginInput, callback?: () => void) => Promise<void>;
  register: (values: SignUpInput, callback?: () => void) => Promise<void>;
  logout: () => Promise<void>;
  signInWithProvider: (provider: "google" | "github") => Promise<void>;
  
  // Email Flow Actions
  requestEmailCode: (email: string) => Promise<void>;
  verifyEmailCode: (code: string) => Promise<void>;
  setupPassword: (password: string, callback?: () => void) => Promise<void>;
  
  // Helpers
  setStep: (step: AuthStep) => void;
  clearError: () => void;
  resetFlow: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  error: null,
  step: "email",
  tempEmail: null,
  tempToken: null,

  setStep: (step) => set({ step }),
  clearError: () => set({ error: null }),
  resetFlow: () => set({ step: "email", tempEmail: null, tempToken: null, error: null }),

  login: async (values, callback) => {
    set({ isLoading: true, error: null });
    try {
      const result = await login(values);
      if (result.success) {
        if (callback) callback();
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (err) {
      set({ error: "An unexpected error occurred during login", isLoading: false });
    }
  },

  register: async (values, callback) => {
    set({ isLoading: true, error: null });
    try {
      const result = await register(values);
      if (result.success) {
        if (callback) callback();
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (err) {
      set({ error: "An unexpected error occurred during registration", isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut({ callbackUrl: "/" });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithProvider: async (provider) => {
    set({ isLoading: true, error: null });
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      set({ error: `Failed to sign in with ${provider}`, isLoading: false });
    }
  },

  requestEmailCode: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const result = await requestEmailCode(email);
      if (result.success) {
        set({ step: "code", tempEmail: email, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (err) {
      set({ error: "Failed to send code", isLoading: false });
    }
  },

  verifyEmailCode: async (code) => {
    const { tempEmail } = get();
    if (!tempEmail) return set({ error: "Session expired. Please restart." });

    set({ isLoading: true, error: null });
    try {
      const result = await verifyEmailCode({ email: tempEmail, code });
      if (result.success) {
        set({ step: "password", tempToken: code, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (err) {
      set({ error: "Verification failed", isLoading: false });
    }
  },

  setupPassword: async (password, callback) => {
    const { tempEmail, tempToken } = get();
    if (!tempEmail || !tempToken) return set({ error: "Session expired. Please restart." });

    set({ isLoading: true, error: null });
    try {
      const result = await completePasswordSetup({
        email: tempEmail,
        token: tempToken,
        password
      });

      if (result.success) {
        if (callback) callback();
        get().resetFlow();
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (err) {
      set({ error: "Failed to set password", isLoading: false });
    }
  },
}));
