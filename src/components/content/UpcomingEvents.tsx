'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Event } from '@/payload-types'
import EventFilters from '@/components/ui/EventFilters'

interface EventMeta {
  label: string
  description: string
  helper: string
}

const EVENT_TYPE_META: Record<string, EventMeta> = {
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
    description: "Special events that don't fit the usual mold.",
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

function getEventDate(event: Event): Date | null {
  const source = event.startDateTime || event.createdAt
  if (!source) return null
  const parsed = new Date(source)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function resolveEventType(event: Event): string {
  const type = event.eventType
  if (type && type in EVENT_TYPE_META) {
    return type
  }
  return 'other'
}

function groupEventsByType(events: Event[]): Record<string, Event[]> {
  const base = Object.keys(EVENT_TYPE_META).reduce(
    (acc, key) => {
      acc[key] = []
      return acc
    },
    {} as Record<string, Event[]>,
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

interface UpcomingEventsProps {
  upcomingEvents: Event[]
}

export default function UpcomingEvents({ upcomingEvents }: UpcomingEventsProps) {
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents)
  const groupedUpcoming = useMemo(() => groupEventsByType(filteredEvents), [filteredEvents])

  const typeSummaries = Object.entries(groupedUpcoming)
    .map(([type, list]) => ({
      type,
      count: (list as Event[]).length,
    }))
    .filter((summary) => summary.count > 0)

  return (
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

        <EventFilters events={upcomingEvents} onFilteredEvents={setFilteredEvents} />

        {filteredEvents.length === 0 ? (
          <div className="events-upcoming__empty">
            <p>No events match the selected filters.</p>
            <p>Try adjusting your filter criteria to see more events.</p>
          </div>
        ) : (
          <div className="events-upcoming__grid">
            {Object.entries(EVENT_TYPE_META).map(([typeKey, meta]) => {
              const typeEvents = groupedUpcoming[typeKey] as Event[]
              if (!typeEvents || typeEvents.length === 0) return null

              return (
                <div
                  key={typeKey}
                  className={`events-upcoming__column events-upcoming__column--${typeKey}`}
                >
                  <div className="events-upcoming__type-meta">
                    <span className="events-upcoming__badge">{meta.label}</span>
                    <p className="events-upcoming__type-title">{meta.description}</p>
                    <p className="events-upcoming__type-helper">{meta.helper}</p>
                  </div>
                  <ul className="events-upcoming__list">
                    {typeEvents.slice(0, 3).map((event: Event) => (
                      <li key={event.id}>
                        <Link
                          href={`/events/${event.id}`}
                          className={`events-upcoming__item events-upcoming__item--${typeKey}`}
                        >
                          <div>
                            <p className="events-upcoming__item-date">{formatShortRange(event)}</p>
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
                    <p className="events-upcoming__more">+{typeEvents.length - 3} more scheduled</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
