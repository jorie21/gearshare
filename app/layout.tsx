import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/shared/auth-provider";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { safeAuth } from "@/auth";

const syne = localFont({
  src: "../public/fonts/Syne-Variable.ttf",
  variable: "--font-syne",
  weight: "400 800",
});

const dmSans = localFont({
  src: "../public/fonts/DMSans-Variable.ttf",
  variable: "--font-dm-sans",
  variableName: "--font-dm-sans", // next/font local might not need this but syne has it
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GearShare",
  description: "Community-driven gear sharing platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await safeAuth();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={session}>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
