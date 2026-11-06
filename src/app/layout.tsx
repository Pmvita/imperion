import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { League_Spartan, Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const spartan = League_Spartan({ subsets: ["latin"], variable: "--font-spartan", weight: "700" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Imperion — Unified Financial Super-App",
  description: "Banking, payments, and crypto in one account.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} ${spartan.variable} ${figtree.variable} antialiased min-h-screen bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
