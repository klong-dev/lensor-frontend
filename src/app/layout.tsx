import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import AuthProvider from "./auth-provider"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { getLocale, getMessages } from "next-intl/server"

export const metadata: Metadata = {
  title: "Lensor - Portfolio Builder for Designers & Photographers",
  description: "Portfolio builder for designers & photographers with templates, custom domains, digital asset store, and Reddit-like communities.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
