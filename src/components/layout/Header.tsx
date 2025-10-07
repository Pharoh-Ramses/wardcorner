'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="nav-link nav-brand">
            {process.env.NEXT_PUBLIC_SITE_NAME || 'Ward Website'}
          </Link>

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
        </div>
      </div>
    </header>
  )
}
