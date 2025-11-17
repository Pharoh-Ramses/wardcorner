import type { Event } from '@/payload-types'
import { formatEventDateTime } from '@/lib/utils/formatters'

interface EventListItemProps {
  event: Event
  isSelected: boolean
  onSelect: () => void
}

export default function EventListItem({ event, isSelected, onSelect }: EventListItemProps) {
  return (
    <div
      className={`event-list-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="event-list-item__header">
        <h3 className="event-list-item__title">{event.title}</h3>
        {event.rsvpRequired && <span className="event-list-item__rsvp">RSVP</span>}
      </div>

      <div className="event-list-item__meta">
        <span className="event-list-item__date">
          {formatEventDateTime(event.startDateTime, event.endDateTime)}
        </span>
        <span className="event-list-item__type">{event.eventType}</span>
      </div>

      {event.location && (
        <div className="event-list-item__location">
          📍 {event.location.venueName || 'Location TBD'}
        </div>
      )}
    </div>
  )
}
