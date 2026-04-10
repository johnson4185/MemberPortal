/**
 * Root Layout
 * =======================================
 * Top-level layout for the entire application.
 * 
 * Purpose:
 * - Defines HTML structure
 * - Configures global providers (React Query)
 * - Sets up global fonts and styles
 * - Applies to ALL routes in the application
 * 
 * Features:
 * - React Query provider for server state management
 * - Inter font from Google Fonts
 * - Global CSS styles (globals.css)
 * 
 * Used By:
 * - All pages and layouts in the app
 * 
 * Backend Integration:
 * - No direct API calls
 * - React Query client configured here for all API calls
 * 
 * Notes:
 * - This is a client component ("use client") because of React Query
 * - Metadata (title, description) is inlined in head tag
 * 
 * @module app/layout
 */

"use client";

import type { Metadata } from "next";
import { Inter, Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

// Note: Metadata export only works in server components
// Since we need QueryClientProvider (client component), we inline the providers here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="en">
      <head>
        <title>MemberConnect - Your Health Insurance Portal</title>
        <meta name="description" content="Manage your insurance claims, policy, and benefits with MemberConnect" />
        <link rel="icon" href="/DCF.png" />
        <link rel="apple-touch-icon" href="/DCF.png" />
        <meta name="theme-color" content="#0a3352" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${dmSans.variable} font-sans antialiased`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
