import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "./contexts/LanguageContext"
import { AnimatePresence } from "framer-motion"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Junior Software Engineer Portfolio",
  description: "Personal portfolio showcasing my skills and projects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

