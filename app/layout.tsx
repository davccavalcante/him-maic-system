import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inter, IBM_Plex_Sans } from "next/font/google"
import type { ReactNode } from "react"

// Configure Inter as the primary font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Configure IBM Plex Sans as the secondary font
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

// Update the metadata to reflect the unified framework progression
export const metadata = {
  title: "Hybrid Entity Intelligence System",
  description:
    "An advanced AI system integrating Semiotic Hybrid Intelligence philosophy, MAIC architecture, and HIM technical implementation.",
    generator: 'v0.dev'
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable}`}>
      <body className={cn("flex min-h-svh flex-col antialiased")}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </body>
    </html>
  )
}


import './globals.css'