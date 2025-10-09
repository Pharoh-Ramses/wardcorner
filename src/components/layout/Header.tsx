'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation'

export default function Header() {
  const pathname = usePathname()
  const ctaLabel = process.env.NEXT_PUBLIC_NAV_CTA_LABEL || 'Contact Ward'
  const ctaHref = process.env.NEXT_PUBLIC_NAV_CTA_URL || '/contact'

  return (
    <header className="header">
      <div className="container">
        <div className="nav-shell">
          <div className="nav-left">
            <Link href="/" className="nav-link nav-brand">
              {process.env.NEXT_PUBLIC_SITE_NAME || 'Ward Website'}
            </Link>
          </div>

          <nav className="nav-menu">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href={ctaHref} className="btn cta-btn">
              <span className="cta-icon" aria-hidden="true">
                {/* Contact/mail icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2zm0 1h12v.5L8 8.5 2 4.5V4zm0 1.5V12h12V5.5L8 9.5 2 5.5z" />
                </svg>
              </span>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
