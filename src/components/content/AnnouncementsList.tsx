'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Announcement } from '@/payload-types'
import AnnouncementFilters from '@/components/ui/AnnouncementFilters'

interface CategoryMeta {
  label: string
  description: string
  helper: string
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  'ward-business': {
    label: 'Ward Business',
    description: 'Official leadership messages and callings.',
    helper: 'Stay informed on ward administration.',
  },
  activities: {
    label: 'Activities',
    description: 'Recaps and details for ward gatherings.',
    helper: 'Fun and fellowship for everyone.',
  },
  updates: {
    label: 'Updates',
    description: 'General news and community information.',
    helper: "Keep up with what's happening.",
  },
}

const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

function groupAnnouncementsByCategory(
  announcements: Announcement[],
): Record<string, Announcement[]> {
  const base: Record<string, Announcement[]> = {
    'ward-business': [],
    activities: [],
    updates: [],
  }

  return announcements.reduce((acc, announcement) => {
    const category = announcement.category as string
    if (acc[category]) {
      acc[category].push(announcement)
    }
    return acc
  }, base)
}

interface AnnouncementsListProps {
  announcements: Announcement[]
}

export default function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements)
  const grouped = useMemo(
    () => groupAnnouncementsByCategory(filteredAnnouncements),
    [filteredAnnouncements],
  )

  const categorySummaries = Object.entries(grouped)
    .map(([category, list]) => ({
      category,
      count: list.length,
    }))
    .filter((summary) => summary.count > 0)

  return (
    <section className="events-upcoming" id="announcements-list">
      <div className="container">
        <div className="events-upcoming__header">
          <div>
            <p className="events-upcoming__eyebrow">Latest News</p>
            <h2 className="events-upcoming__title">Ward Updates</h2>
            <p className="events-upcoming__subtitle">Browse announcements by category.</p>
          </div>
          {categorySummaries.length > 0 && (
            <div className="events-upcoming__filters">
              {categorySummaries.map((summary) => (
                <div key={summary.category} className="events-upcoming__filter">
                  <span className="events-upcoming__filter-label">
                    {CATEGORY_META[summary.category].label}
                  </span>
                  <span className="events-upcoming__filter-count">{summary.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <AnnouncementFilters
          announcements={announcements}
          onFilteredAnnouncements={setFilteredAnnouncements}
        />

        {filteredAnnouncements.length === 0 ? (
          <div className="events-upcoming__empty">
            <p>No announcements match the selected filters.</p>
            <p>Try adjusting your filter criteria to see more announcements.</p>
          </div>
        ) : (
          <div className="events-upcoming__grid">
            {Object.entries(CATEGORY_META).map(([categoryKey, meta]) => {
              const categoryAnnouncements = grouped[categoryKey] as Announcement[]
              if (!categoryAnnouncements || categoryAnnouncements.length === 0) return null

              return (
                <div
                  key={categoryKey}
                  className={`events-upcoming__column events-upcoming__column--${categoryKey}`}
                >
                  <div className="events-upcoming__type-meta">
                    <span className="events-upcoming__badge">{(meta as CategoryMeta).label}</span>
                    <p className="events-upcoming__type-title">
                      {(meta as CategoryMeta).description}
                    </p>
                    <p className="events-upcoming__type-helper">{(meta as CategoryMeta).helper}</p>
                  </div>
                  <ul className="events-upcoming__list">
                    {categoryAnnouncements.slice(0, 5).map((announcement: Announcement) => (
                      <li key={announcement.id}>
                        <Link
                          href={`/announcements/${announcement.id}`}
                          className={`events-upcoming__item events-upcoming__item--${categoryKey}`}
                        >
                          <div>
                            <p className="events-upcoming__item-date">
                              {SHORT_DATE_FORMAT.format(new Date(announcement.publishDate))}
                            </p>
                            <p className="events-upcoming__item-title">{announcement.title}</p>
                          </div>
                          <div className="events-upcoming__item-meta">
                            <span className="events-upcoming__item-action">Read</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {categoryAnnouncements.length > 5 && (
                    <p className="events-upcoming__more">
                      +{categoryAnnouncements.length - 5} more
                    </p>
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
