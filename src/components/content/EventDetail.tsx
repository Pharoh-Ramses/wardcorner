import type { Event } from '@/payload-types'
import { formatEventDateTime } from '@/lib/utils/formatters'
import RichText from '@/components/ui/RichText'

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="event-detail">
      <div className="event-detail__header">
        <div className="event-detail__meta">
          <span className="event-detail__date">
            {formatEventDateTime(event.startDateTime, event.endDateTime)}
          </span>
          <span className="event-detail__type">{event.eventType}</span>
          {event.rsvpRequired && <span className="event-detail__rsvp">RSVP Required</span>}
        </div>

        <h1 className="event-detail__title">{event.title}</h1>
      </div>

      {event.description && (
        <div className="event-detail__description">
          <RichText content={event.description} />
        </div>
      )}

      {event.location && (
        <div className="event-detail__location">
          <h3 className="event-detail__location-title">Location</h3>
          <div className="event-detail__location-details">
            <div className="event-detail__venue">
              📍 {event.location.venueName || 'Location TBD'}
            </div>
            {event.location.streetAddress && (
              <div className="event-detail__address">
                {event.location.streetAddress}
                {event.location.city && `, ${event.location.city}`}
                {event.location.state && `, ${event.location.state}`}
                {event.location.zipCode && ` ${event.location.zipCode}`}
                {event.location.country && `, ${event.location.country}`}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="event-detail__footer">
        <div className="event-detail__timestamps">
          <span className="event-detail__created">
            Created: {new Date(event.createdAt).toLocaleDateString()}
          </span>
          {event.updatedAt !== event.createdAt && (
            <span className="event-detail__updated">
              Updated: {new Date(event.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
