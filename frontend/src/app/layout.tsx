import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import SessionProviderWrapper from "./SessionProviderWrapper";
import Settings from "@/components/Settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aggie Finals | Texas A&M Final Exam Schedule Generator",
  description: "Generate your Texas A&M University final exam schedule instantly. Save time with our easy-to-use tool designed specifically for Aggies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          {children}
          <Analytics />
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
