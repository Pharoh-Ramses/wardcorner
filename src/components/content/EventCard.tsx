import type { Event } from '@/payload-types'
import { formatEventDateTime } from '@/lib/utils/formatters'
import RichText from '@/components/ui/RichText'
import Link from 'next/link'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="event-card card">
      <h3 className="event-card__title">{event.title}</h3>
      <div className="event-card__date">
        {formatEventDateTime(event.startDateTime, event.endDateTime)}
      </div>
      {event.description && (
        <div className="event-card__description">
          <RichText content={event.description} />
        </div>
      )}
      {event.location && (
        <div className="event-card__location">
          📍 {event.location.venueName || 'Location TBD'}
          {event.location.streetAddress && (
            <div className="event-card__address">
              {event.location.streetAddress}
              {event.location.city && `, ${event.location.city}`}
              {event.location.state && `, ${event.location.state}`}
              {event.location.zipCode && ` ${event.location.zipCode}`}
            </div>
          )}
        </div>
      )}
      <div className="event-card__action">
        <span className="btn btn-primary">View Details</span>
      </div>
    </Link>
  )
}
