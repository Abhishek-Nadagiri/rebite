import type React from "react"
import type { Metadata } from "next"
import { Geist, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "ReBite - Save Food, Save Money, Save the Planet",
  description: "Discover surplus meals from local restaurants at discounted prices. Fight food waste together.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            {children}
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
