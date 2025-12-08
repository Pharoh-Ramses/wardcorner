import { getAllEvents } from '@/lib/payload'
import Section from '@/components/ui/Section'
import ContentList from '@/components/ui/ContentList'
import Card from '@/components/content/Card'

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export default async function EventsPage() {
  const events = await getAllEvents(200)

  // Sort events by date
  events.sort((a, b) => {
    const aDate = new Date(a.startDateTime || a.createdAt || 0)
    const bDate = new Date(b.startDateTime || b.createdAt || 0)
    return aDate.getTime() - bDate.getTime()
  })

  const now = new Date()
  const nextSevenDays = new Date(now)
  nextSevenDays.setDate(now.getDate() + 7)

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.startDateTime || event.createdAt || 0)
    return eventDate >= now
  })

  const nextEvent = upcomingEvents[0] ?? null

  const eventsThisWeek = upcomingEvents.filter((event) => {
    const eventDate = new Date(event.startDateTime || event.createdAt || 0)
    return eventDate >= now && eventDate <= nextSevenDays
  }).length

  const thisMonthEvents = upcomingEvents.filter((event) => {
    const eventDate = new Date(event.startDateTime || event.createdAt || 0)
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
  }).length

  const uniqueTypes = new Set(upcomingEvents.map((event) => event.eventType || 'other')).size

  const stats = [
    { label: 'Upcoming events', value: upcomingEvents.length },
    { label: 'Happening this week', value: eventsThisWeek },
    { label: 'Focus areas', value: uniqueTypes },
  ]

  const heroDescription = upcomingEvents.length
    ? `This month already features ${thisMonthEvents} planned ${pluralize(thisMonthEvents, 'gathering', 'gatherings')} and plenty of chances to invite friends.`
    : 'As soon as new activities are posted in Payload they&apos;ll appear here. Check back often!'

  return (
    <>
      {/* Hero Section */}
      <Section variant="default">
        <div className="events-hero">
          <div className="events-hero__content">
            <p className="events-hero__chip">Ward calendar</p>
            <h1 className="events-hero__title">Ward Events</h1>
            <p className="events-hero__description">{heroDescription}</p>

            <div className="events-hero__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="events-hero__stat">
                  <span className="events-hero__stat-value">{stat.value}</span>
                  <span className="events-hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {nextEvent && (
            <div className="events-hero__featured">
              <div className="events-hero__featured-label">Next on the calendar</div>
              <Card type="event" data={nextEvent} />
            </div>
          )}
        </div>
      </Section>

      {/* Events List */}
      <Section variant="highlighted">
        <ContentList
          items={events}
          type="event"
          title="Ward Events"
          description="Browse upcoming and past events by category"
          groupBy="upcoming"
          showFilters={true}
          maxItemsPerGroup={5}
          itemsPerPage={20}
        />
      </Section>
    </>
  )
}
