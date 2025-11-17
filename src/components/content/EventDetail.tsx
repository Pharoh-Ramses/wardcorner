import type { Event } from '@/payload-types'
import { formatEventDateTime } from '@/lib/utils/formatters'
import RichText from '@/components/ui/RichText'
import Image from 'next/image'
import Link from 'next/link'

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
          <h2 className="event-detail__location-title">Location</h2>
          <div className="event-detail__location-details">
            {event.location.venueName && (
              <div className="event-detail__venue">📍 {event.location.venueName}</div>
            )}
            {event.location.streetAddress && (
              <div className="event-detail__address">
                {event.location.streetAddress}
                {event.location.city && `, ${event.location.city}`}
                {event.location.state && `, ${event.location.state}`}
                {event.location.zipCode && ` ${event.location.zipCode}`}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {event.gallery && event.gallery.length > 0 && (
        <div className="event-detail__gallery">
          <h2 className="event-detail__gallery-title">Event Gallery</h2>
          <div className="event-gallery">
            {event.gallery.map((mediaItem, index) => {
              // Handle both direct media objects and relationship references
              const media =
                typeof mediaItem === 'object' && mediaItem !== null
                  ? (mediaItem as { id: string | number; url: string; alt?: string })
                  : null

              if (!media) return null

              return (
                <div key={media.id || index} className="event-gallery__item">
                  <div className="event-gallery__image-container">
                    <Image
                      src={media.url || ''}
                      alt={media.alt || `Event photo ${index + 1}`}
                      width={400}
                      height={300}
                      className="event-gallery__image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {media.alt && <p className="event-gallery__caption">{media.alt}</p>}
                </div>
              )
            })}
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
        <div className="event-detail__actions">
          <Link href="/events" className="btn">
            ← Back to Events
          </Link>
        </div>
      </div>
    </div>
  )
}
