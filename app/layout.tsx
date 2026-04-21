import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/shared/auth-provider";
import { auth } from "@/auth";

const syne = localFont({
  src: "../public/fonts/Syne-Variable.ttf",
  variable: "--font-syne",
  weight: "400 800",
});

const dmSans = localFont({
  src: "../public/fonts/DMSans-Variable.ttf",
  variable: "--font-dm-sans",
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
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
