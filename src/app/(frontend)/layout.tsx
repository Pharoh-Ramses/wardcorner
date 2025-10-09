import React from 'react'
import type { Metadata } from 'next'
import { Inter, Cormorant } from 'next/font/google'
import './styles.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Inter for headings (bold) and body (regular)
const interHeading = Inter({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

// Cormorant for section headings
const serifHeading = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const interBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
      --font-heading: ${serifHeading.style.fontFamily};
      --font-body: ${interBody.style.fontFamily};
      --primary-color: ${process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#6d6afe'};
      --primary-hover: ${process.env.NEXT_PUBLIC_PRIMARY_HOVER || '#5753f3'};
      --secondary-color: ${process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#64748b'};
      --accent-color: ${process.env.NEXT_PUBLIC_ACCENT_COLOR || '#edeaff'};
      --bg-primary: ${process.env.NEXT_PUBLIC_BG_PRIMARY || '#ffffff'};
      --bg-secondary: ${process.env.NEXT_PUBLIC_BG_SECONDARY || '#f7f8fc'};
      --bg-tertiary: ${process.env.NEXT_PUBLIC_BG_TERTIARY || '#eef1f6'};
      --text-primary: ${process.env.NEXT_PUBLIC_TEXT_PRIMARY || '#0b0b0f'};
      --text-secondary: ${process.env.NEXT_PUBLIC_TEXT_SECONDARY || '#3a3a40'};
      --text-muted: ${process.env.NEXT_PUBLIC_TEXT_MUTED || '#6b7280'};
      --border-color: ${process.env.NEXT_PUBLIC_BORDER_COLOR || '#eaecf0'};
      --border-hover: ${process.env.NEXT_PUBLIC_BORDER_HOVER || '#d0d5dd'};
    }
  `

  return (
    <html
      lang="en"
      className={`${interHeading.variable} ${interBody.variable} ${serifHeading.variable}`}
    >
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
