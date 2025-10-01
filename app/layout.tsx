import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/Context/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'D0lt',
  description: 'Built and maintained by Nasir, delivering smart maintenance solutions.',
  generator: 'Nasir',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
      <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
