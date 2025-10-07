import React from 'react'
import type { Metadata } from 'next'
import { EB_Garamond, Figtree } from 'next/font/google'
import './styles.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Import EB Garamond for headings
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

// Import Figtree for body text
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Ward website for The Church of Jesus Christ of Latter-day Saints',
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Ward Website',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Dynamic CSS custom properties based on environment variables
  const cssVariables = `
    :root {
      --font-heading: ${ebGaramond.style.fontFamily};
      --font-body: ${figtree.style.fontFamily};
      --primary-color: ${process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#034f46'};
      --primary-hover: ${process.env.NEXT_PUBLIC_PRIMARY_HOVER || '#022c26'};
      --secondary-color: ${process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#64748b'};
      --accent-color: ${process.env.NEXT_PUBLIC_ACCENT_COLOR || '#f0d7ff'};
      --bg-primary: ${process.env.NEXT_PUBLIC_BG_PRIMARY || '#FFFFEB'};
      --bg-secondary: ${process.env.NEXT_PUBLIC_BG_SECONDARY || '#f8fafc'};
      --bg-tertiary: ${process.env.NEXT_PUBLIC_BG_TERTIARY || '#f1f5f9'};
      --text-primary: ${process.env.NEXT_PUBLIC_TEXT_PRIMARY || '#1A1A1A'};
      --text-secondary: ${process.env.NEXT_PUBLIC_TEXT_SECONDARY || '#475569'};
      --text-muted: ${process.env.NEXT_PUBLIC_TEXT_MUTED || '#64748b'};
      --border-color: ${process.env.NEXT_PUBLIC_BORDER_COLOR || '#e2e8f0'};
      --border-hover: ${process.env.NEXT_PUBLIC_BORDER_HOVER || '#cbd5e1'};
    }
  `

  return (
    <html lang="en" className={`${ebGaramond.variable} ${figtree.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
