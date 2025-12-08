'use client'

import { useState, useEffect } from 'react'
import type { Event } from '@/payload-types'

type EventTypeKey = NonNullable<Event['eventType']>

interface EventFiltersProps {
  events: Event[]
  onFilteredEvents: (filteredEvents: Event[]) => void
}

const EVENT_TYPE_LABELS: Record<EventTypeKey, string> = {
  meeting: 'Meetings',
  activity: 'Activities',
  service: 'Service',
  other: 'Other',
}

export default function EventFilters({ events, onFilteredEvents }: EventFiltersProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<EventTypeKey>>(new Set())

  useEffect(() => {
    if (selectedTypes.size === 0) {
      onFilteredEvents(events)
    } else {
      const filtered = events.filter((event) => {
        const type = event.eventType as EventTypeKey
        return selectedTypes.has(type)
      })
      onFilteredEvents(filtered)
    }
  }, [selectedTypes, events, onFilteredEvents])

  const toggleType = (type: EventTypeKey) => {
    const newSelected = new Set(selectedTypes)
    if (newSelected.has(type)) {
      newSelected.delete(type)
    } else {
      newSelected.add(type)
    }
    setSelectedTypes(newSelected)
  }

  const clearFilters = () => {
    setSelectedTypes(new Set())
  }

  const eventTypes = Object.keys(EVENT_TYPE_LABELS) as EventTypeKey[]
  const activeCount = selectedTypes.size

  return (
    <div className="event-filters">
      <div className="event-filters__header">
        <h3 className="event-filters__title">Filter by type</h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="event-filters__clear">
            Clear {activeCount} {activeCount === 1 ? 'filter' : 'filters'}
          </button>
        )}
      </div>
      <div className="event-filters__options">
        {eventTypes.map((type) => {
          const isActive = selectedTypes.has(type)
          const count = events.filter((event) => event.eventType === type).length

          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`event-filters__option ${isActive ? 'event-filters__option--active' : ''}`}
              disabled={count === 0}
            >
              <span className="event-filters__option-label">{EVENT_TYPE_LABELS[type]}</span>
              <span className="event-filters__option-count">({count})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
