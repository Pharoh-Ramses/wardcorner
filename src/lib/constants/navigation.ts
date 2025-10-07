// Navigation menu items - centralized for consistency
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Announcements', href: '/announcements' },
  { name: 'Events', href: '/events' },
  { name: 'Sacrament Programs', href: '/sacrament-programs' },
] as const

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number]
