import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import ModeToggle from "@/dark/Dark" // adjust path if needed
import { Providers } from "./app/providers"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Startups directory",
  description: "Browse and discover innovative startups",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {/* Global Header */}
          <header className="border-b border-border">
            <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
              <span className="font-semibold">
                <Link href="/" className="hover:underline">
                Startups Directory
                </Link>
              </span>

              <ModeToggle />
            </div>
          </header>

          {/* Page Content */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
