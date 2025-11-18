import EventsSplit from '@/components/content/EventsSplit'
import EventsList from '@/components/content/EventsList'
import { getAllEvents } from '@/lib/payload'
import type { Event } from '@/payload-types'

interface PartitionedEvents {
  upcoming: Event[]
  past: Event[]
}

function partitionEvents(events: Event[]): PartitionedEvents {
  const now = Date.now()

  const sortedEvents = [...events].sort((a, b) => {
    const aTime = new Date(a.startDateTime || a.createdAt).getTime()
    const bTime = new Date(b.startDateTime || b.createdAt).getTime()
    return aTime - bTime
  })

  const upcoming: Event[] = []
  const past: Event[] = []

  sortedEvents.forEach((event) => {
    const eventTime = new Date(event.startDateTime || event.createdAt).getTime()

    if (!Number.isNaN(eventTime) && eventTime >= now) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  })

  const recentPast = past
    .sort((a, b) => {
      const aTime = new Date(a.startDateTime || a.createdAt).getTime()
      const bTime = new Date(b.startDateTime || b.createdAt).getTime()
      return bTime - aTime
    })
    .slice(0, 8)

  return { upcoming, past: recentPast }
}

export default async function EventsPage() {
  const events = await getAllEvents(200)
  const { upcoming, past } = partitionEvents(events)

  return (
    <>
      <section className="content-section">
        <div className="container">
          <h1 className="section-title">Ward Events</h1>
          <p className="section-subtitle">
            Explore what&apos;s happening in the ward. Upcoming activities appear first, and
            recently completed events remain available for quick reference.
          </p>
        </div>
      </section>

      {upcoming.length > 0 ? (
        <EventsSplit events={upcoming} showViewAll={false} title="Upcoming Events" />
      ) : (
        <section className="content-section">
          <div className="container">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="events-split__empty">No upcoming events scheduled.</div>
          </div>
        </section>
      )}

      {past.length > 0 ? (
        <EventsList events={past} showViewAll={false} title="Recent Past Events" />
      ) : (
        <section className="content-section">
          <div className="container">
            <h2 className="section-title">Recent Past Events</h2>
            <div className="events-split__empty">No past events to display.</div>
          </div>
        </section>
      )}
    </>
  )
}
