import Link from 'next/link'
import type { Event } from '@/payload-types'
import EventCard from './EventCard'
import Loading from '@/components/ui/Loading'
import ErrorMessage from '@/components/ui/ErrorMessage'

interface EventsListProps {
  events: Event[]
  loading?: boolean
  error?: string | null
  showViewAll?: boolean
  title?: string
}

export default function EventsList({
  events,
  loading = false,
  error = null,
  showViewAll = true,
  title = 'Upcoming Events',
}: EventsListProps) {
  if (loading) return <Loading message="Loading events..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <section className="content-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {events.length === 0 ? (
          <div className="loading">No upcoming events scheduled.</div>
        ) : (
          <>
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {showViewAll && (
              <div className="section-footer">
                <Link href="/events" className="btn">
                  View All Events
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
