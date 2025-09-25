import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { Poppins, Nunito } from "next/font/google"
import "./globals.css"
import MantineProviderWrapper from './mantine-provider'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "Lensor - Portfolio Builder for Designers & Photographers",
  description: "Portfolio builder for designers & photographers with templates, custom domains, digital asset store, and Reddit-like communities.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={nunito.className} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <MantineProviderWrapper>
            <Notifications />
            {children}
          </MantineProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
