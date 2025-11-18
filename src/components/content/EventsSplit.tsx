'use client'

import React, { useState } from 'react'
import type { Event } from '@/payload-types'
import EventListItem from './EventListItem'
import EventDetail from './EventDetail'
import Loading from '@/components/ui/Loading'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Link from 'next/link'

interface EventsSplitProps {
  events: Event[]
  loading?: boolean
  error?: string | null
  showViewAll?: boolean
  title?: string
}

export default function EventsSplit({
  events,
  loading = false,
  error = null,
  showViewAll = true,
  title = 'Upcoming Events',
}: EventsSplitProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    events.length > 0 ? events[0].id : null,
  )

  if (loading) return <Loading message="Loading events..." />
  if (error) return <ErrorMessage message={error} />

  const selectedEvent = events.find((e) => e.id === selectedId)

  return (
    <section className="events-split">
      <div className="container">
        <h2 className="events-split__title">{title}</h2>
      </div>

      {events.length === 0 ? (
        <div className="events-split__empty">No upcoming events scheduled.</div>
      ) : (
        <div className="events-split__container">
          {/* Left column - Event list */}
          <div className="events-split__list">
            <div className="events-list">
              {events.map((event) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  isSelected={selectedId === event.id}
                  onSelect={() => setSelectedId(event.id)}
                />
              ))}
            </div>

            {showViewAll && (
              <div className="events-split__view-all">
                <Link href="/events" className="btn">
                  View All Events
                </Link>
              </div>
            )}
          </div>

          {/* Right column - Event details */}
          <div className="events-split__detail">
            {selectedEvent ? (
              <EventDetail event={selectedEvent} />
            ) : (
              <div className="events-split__placeholder">Select an event to view details</div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
