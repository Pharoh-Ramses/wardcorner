import Link from 'next/link'
import type { Announcement, Event, SacramentProgram } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'
import SacramentProgramCard from './SacramentProgramCard'

interface CardProps {
  type: 'event' | 'announcement' | 'sacrament-program'
  data: Event | Announcement | SacramentProgram
}

export default function Card({ type, data }: CardProps) {
  if (type === 'event') {
    const event = data as Event
    const startDate = new Date(event.startDateTime)
    const href = `/events/${event.id}`

    return (
      <Link href={href} className="home-card event-home-card">
        <div className="event-home-card__date-badge">
          <span className="event-home-card__month">
            {startDate.toLocaleDateString('en-US', { month: 'short' })}
          </span>
          <span className="event-home-card__day">{startDate.getDate()}</span>
        </div>
        <div className="home-card__content">
          <h3 className="home-card__title">{event.title}</h3>
          {event.location?.venueName && (
            <p className="home-card__meta">{event.location.venueName}</p>
          )}
        </div>
        <div className="home-card__arrow">&rarr;</div>
      </Link>
    )
  }

  if (type === 'announcement') {
    const announcement = data as Announcement
    const href = `/announcements/${announcement.id}`
    const icon = announcement.icon || 'announcement'

    const iconMap = {
      document: '📄',
      announcement: '📢',
      activity: '🎉',
      update: 'ℹ️',
    }

    const displayIcon = iconMap[icon as keyof typeof iconMap] || '📢'

    return (
      <Link href={href} className="home-card announcement-home-card">
        <div className="announcement-home-card__icon">{displayIcon}</div>
        <div className="home-card__content">
          <h3 className="home-card__title">{announcement.title}</h3>
          <span className="home-card__date">{formatDate(announcement.publishDate)}</span>
        </div>
        <div className="home-card__arrow">&rarr;</div>
      </Link>
    )
  }

  if (type === 'sacrament-program') {
    const program = data as SacramentProgram
    return <SacramentProgramCard program={program} />
  }

  return null
}
