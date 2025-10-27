"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SenderUserData from "@/app/SenderUserData";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const Convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexProvider client={Convex}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <SenderUserData />
            <Toaster position="top-center" closeButton />
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
