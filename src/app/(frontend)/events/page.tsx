import Link from 'next/link'
import { getAllEvents } from '@/lib/payload'
import type { Event } from '@/payload-types'
import { formatEventDateTime } from '@/lib/utils/formatters'

interface PartitionedEvents {
  upcoming: Event[]
  past: Event[]
}

type EventTypeKey = NonNullable<Event['eventType']>

type TimelineSection = {
  label: string
  events: Event[]
}

const EVENT_TYPE_META: Record<
  EventTypeKey,
  { label: string; description: string; helper: string }
> = {
  meeting: {
    label: 'Meetings',
    description: 'Worship, councils, and presidency gatherings keep everyone aligned.',
    helper: 'Ideal for leaders tracking weekly coordination.',
  },
  activity: {
    label: 'Activities',
    description: 'Social nights, youth adventures, and family-friendly fun.',
    helper: 'Great for inviting neighbors and new members.',
  },
  service: {
    label: 'Service',
    description: 'Ministering, welfare, and community outreach opportunities.',
    helper: 'Perfect for hands-on discipleship moments.',
  },
  other: {
    label: 'Other',
    description: 'Special events that don’t fit the usual mold.',
    helper: 'Stay curious—details vary each time.',
  },
}

const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

const TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

const MONTH_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
})

function getEventDate(event: Event): Date | null {
  const source = event.startDateTime || event.createdAt
  if (!source) return null
  const parsed = new Date(source)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function partitionEvents(events: Event[]): PartitionedEvents {
  const now = Date.now()
  const sortedEvents = [...events].sort((a, b) => {
    const aTime = getEventDate(a)?.getTime() ?? 0
    const bTime = getEventDate(b)?.getTime() ?? 0
    return aTime - bTime
  })

  const upcoming: Event[] = []
  const past: Event[] = []

  sortedEvents.forEach((event) => {
    const eventTime = getEventDate(event)?.getTime()
    if (eventTime && eventTime >= now) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  })

  const recentPast = past
    .sort((a, b) => (getEventDate(b)?.getTime() ?? 0) - (getEventDate(a)?.getTime() ?? 0))
    .slice(0, 8)

  return { upcoming, past: recentPast }
}

function resolveEventType(event: Event): EventTypeKey {
  const type = event.eventType
  if (type && type in EVENT_TYPE_META) {
    return type as EventTypeKey
  }
  return 'other'
}

function groupEventsByType(events: Event[]): Record<EventTypeKey, Event[]> {
  const base = Object.keys(EVENT_TYPE_META).reduce(
    (acc, key) => {
      acc[key as EventTypeKey] = []
      return acc
    },
    {} as Record<EventTypeKey, Event[]>,
  )

  return events.reduce((acc, event) => {
    const type = resolveEventType(event)
    acc[type].push(event)
    return acc
  }, base)
}

function formatLocationSummary(event: Event): string | null {
  const location = event.location
  if (!location || typeof location !== 'object') return null

  const parts = [location.venueName, location.streetAddress, location.city, location.state].filter(
    (value): value is string => Boolean(value),
  )

  if (parts.length === 0) return null
  if (parts.length === 1) return parts[0]
  return `${parts[0]}, ${parts[1]}`
}

function formatShortRange(event: Event): string {
  const start = getEventDate(event)
  if (!start) return 'Date to be announced'
  const startDate = SHORT_DATE_FORMAT.format(start)
  const startTime = TIME_FORMAT.format(start)

  if (!event.endDateTime) {
    return `${startDate} · ${startTime}`
  }

  const end = new Date(event.endDateTime)
  if (Number.isNaN(end.getTime())) {
    return `${startDate} · ${startTime}`
  }

  const endTime = TIME_FORMAT.format(end)
  return `${startDate} · ${startTime} – ${endTime}`
}

function createTimelineSections(past: Event[]): TimelineSection[] {
  const sortedPast = [...past].sort(
    (a, b) => (getEventDate(b)?.getTime() ?? 0) - (getEventDate(a)?.getTime() ?? 0),
  )
  const buckets = new Map<string, Event[]>()

  sortedPast.forEach((event) => {
    const label = MONTH_FORMAT.format(getEventDate(event) ?? new Date())
    const existing = buckets.get(label) ?? []
    existing.push(event)
    buckets.set(label, existing)
  })

  return Array.from(buckets.entries()).map(([label, events]) => ({ label, events }))
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export default async function EventsPage() {
  const events = await getAllEvents(200)
  const { upcoming, past } = partitionEvents(events)
  const nextEvent = upcoming[0] ?? null
  const groupedUpcoming = groupEventsByType(upcoming)
  const timelineSections = createTimelineSections(past)

  const now = new Date()
  const nextSevenDays = new Date(now)
  nextSevenDays.setDate(now.getDate() + 7)

  const eventsThisWeek = upcoming.filter((event) => {
    const eventDate = getEventDate(event)
    if (!eventDate) return false
    return eventDate >= now && eventDate <= nextSevenDays
  }).length

  const thisMonthEvents = upcoming.filter((event) => {
    const eventDate = getEventDate(event)
    if (!eventDate) return false
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
  }).length

  const uniqueTypes = new Set(upcoming.map(resolveEventType)).size

  const stats = [
    { label: 'Upcoming events', value: upcoming.length },
    { label: 'Happening this week', value: eventsThisWeek },
    { label: 'Focus areas', value: uniqueTypes },
  ]

  const heroDescription = upcoming.length
    ? `This month already features ${thisMonthEvents} planned ${pluralize(thisMonthEvents, 'gathering', 'gatherings')} and plenty of chances to invite friends.`
    : 'As soon as new activities are posted in Payload they’ll appear here. Check back often!'

  const typeSummaries = Object.entries(groupedUpcoming)
    .map(([type, list]) => ({
      type: type as EventTypeKey,
      count: list.length,
    }))
    .filter((summary) => summary.count > 0)

  return (
    <>
      <section className="events-hero">
        <div className="events-hero__glow" />
        <div className="container">
          <div className="events-hero__layout">
            <div className="events-hero__intro">
              <p className="events-hero__chip">Ward calendar</p>
              <h1 className="events-hero__title">Ward Events</h1>
              <p className="events-hero__lede">{heroDescription}</p>
              <div className="events-hero__stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="events-hero__stat">
                    <span className="events-hero__stat-value">{stat.value}</span>
                    <span className="events-hero__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="events-hero__highlight">
              {nextEvent ? (
                <>
                  <p className="events-hero__subline">Next on the calendar</p>
                  <h3 className="events-hero__highlight-title">{nextEvent.title}</h3>
                  <p className="events-hero__detail">
                    {formatEventDateTime(nextEvent.startDateTime, nextEvent.endDateTime)}
                  </p>
                  {formatLocationSummary(nextEvent) && (
                    <p className="events-hero__location">{formatLocationSummary(nextEvent)}</p>
                  )}
                  <div className="events-hero__tags">
                    <span className="events-hero__badge">
                      {EVENT_TYPE_META[resolveEventType(nextEvent)].label}
                    </span>
                    {nextEvent.rsvpRequired && (
                      <span className="events-hero__badge events-hero__badge--accent">
                        RSVP needed
                      </span>
                    )}
                  </div>
                  <div className="events-hero__cta">
                    <Link href={`/events/${nextEvent.id}`} className="btn btn-primary">
                      View details
                    </Link>
                    <Link href="#events-upcoming" className="btn events-hero__secondary">
                      Browse lineup
                    </Link>
                  </div>
                </>
              ) : (
                <div className="events-hero__empty">
                  <p>No events are scheduled just yet.</p>
                  <p>Ward leaders can add new events anytime from the Payload admin.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="events-upcoming" id="events-upcoming">
        <div className="container">
          <div className="events-upcoming__header">
            <div>
              <p className="events-upcoming__eyebrow">Plan ahead</p>
              <h2 className="events-upcoming__title">Upcoming lineup</h2>
              <p className="events-upcoming__subtitle">
                Quickly scan what&apos;s coming in each focus area and jump into the details that
                matter most today.
              </p>
            </div>
            {typeSummaries.length > 0 && (
              <div className="events-upcoming__filters">
                {typeSummaries.map((summary) => (
                  <div key={summary.type} className="events-upcoming__filter">
                    <span className="events-upcoming__filter-label">
                      {EVENT_TYPE_META[summary.type].label}
                    </span>
                    <span className="events-upcoming__filter-count">{summary.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {upcoming.length === 0 ? (
            <div className="events-upcoming__empty">
              <p>The calendar is calm right now.</p>
              <p>Once new events are published they&apos;ll appear here automatically.</p>
            </div>
          ) : (
            <div className="events-upcoming__grid">
              {Object.entries(EVENT_TYPE_META).map(([typeKey, meta]) => {
                const typedKey = typeKey as EventTypeKey
                const typeEvents = groupedUpcoming[typedKey]
                if (!typeEvents || typeEvents.length === 0) return null

                return (
                  <div
                    key={typedKey}
                    className={`events-upcoming__column events-upcoming__column--${typedKey}`}
                  >
                    <div className="events-upcoming__type-meta">
                      <span className="events-upcoming__badge">{meta.label}</span>
                      <p className="events-upcoming__type-title">{meta.description}</p>
                      <p className="events-upcoming__type-helper">{meta.helper}</p>
                    </div>
                    <ul className="events-upcoming__list">
                      {typeEvents.slice(0, 3).map((event) => (
                        <li key={event.id}>
                          <Link
                            href={`/events/${event.id}`}
                            className={`events-upcoming__item events-upcoming__item--${typedKey}`}
                          >
                            <div>
                              <p className="events-upcoming__item-date">
                                {formatShortRange(event)}
                              </p>
                              <p className="events-upcoming__item-title">{event.title}</p>
                              {formatLocationSummary(event) && (
                                <p className="events-upcoming__item-location">
                                  {formatLocationSummary(event)}
                                </p>
                              )}
                            </div>
                            <div className="events-upcoming__item-meta">
                              <span className="events-upcoming__item-action">Open</span>
                              {event.rsvpRequired && (
                                <span className="events-upcoming__item-rsvp">RSVP</span>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {typeEvents.length > 3 && (
                      <p className="events-upcoming__more">
                        +{typeEvents.length - 3} more scheduled
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="events-timeline">
        <div className="container">
          <div className="events-timeline__header">
            <div>
              <p className="events-timeline__eyebrow">Look back</p>
              <h2 className="events-timeline__title">Recent highlights</h2>
              <p className="events-timeline__subtitle">
                Need to recap last week&apos;s activity or share notes? Recent events stay on this
                timeline for quick reference.
              </p>
            </div>
            <p className="events-timeline__note">
              Showing the last {past.length} published events.
            </p>
          </div>

          {timelineSections.length === 0 ? (
            <div className="events-timeline__empty">
              <p>No past events have been recorded yet.</p>
            </div>
          ) : (
            <div className="events-timeline__months">
              {timelineSections.map((section) => (
                <div key={section.label} className="events-timeline__month">
                  <div className="events-timeline__month-title">{section.label}</div>
                  <ul className="events-timeline__list">
                    {section.events.map((event) => {
                      const eventDate = getEventDate(event)
                      const day = eventDate ? eventDate.getDate().toString().padStart(2, '0') : '--'
                      const weekday = eventDate ? WEEKDAY_FORMAT.format(eventDate) : ''
                      return (
                        <li key={event.id} className="events-timeline__item">
                          <div className="events-timeline__date">
                            <span className="events-timeline__day">{day}</span>
                            <span className="events-timeline__weekday">{weekday}</span>
                          </div>
                          <div className="events-timeline__body">
                            <div className="events-timeline__top">
                              <p className="events-timeline__item-title">{event.title}</p>
                              <span className="events-timeline__status">Completed</span>
                            </div>
                            <p className="events-timeline__meta">
                              {formatEventDateTime(event.startDateTime, event.endDateTime)}
                            </p>
                            {formatLocationSummary(event) && (
                              <p className="events-timeline__location">
                                {formatLocationSummary(event)}
                              </p>
                            )}
                            <Link href={`/events/${event.id}`} className="events-timeline__link">
                              Review details
                            </Link>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
