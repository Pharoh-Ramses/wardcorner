'use client'

import React, { useState } from 'react'
import type { Announcement } from '@/payload-types'
import AnnouncementListItem from './AnnouncementListItem'
import AnnouncementDetail from './AnnouncementDetail'
import Loading from '@/components/ui/Loading'
import ErrorMessage from '@/components/ui/ErrorMessage'

interface AnnouncementsSplitProps {
  announcements: Announcement[]
  loading?: boolean
  error?: string | null
  showViewAll?: boolean
  title?: string
}

export default function AnnouncementsSplit({
  announcements,
  loading = false,
  error = null,
  showViewAll = true,
  title = 'Recent Announcements',
}: AnnouncementsSplitProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    announcements.length > 0 ? announcements[0].id : null,
  )

  if (loading) return <Loading message="Loading announcements..." />
  if (error) return <ErrorMessage message={error} />

  const selectedAnnouncement = announcements.find((a) => a.id === selectedId)

  return (
    <section className="announcements-split">
      <div className="container">
        <h2 className="announcements-split__title">{title}</h2>
      </div>

      {announcements.length === 0 ? (
        <div className="announcements-split__empty">No announcements available.</div>
      ) : (
        <div className="announcements-split__container">
          {/* Left column - Announcement list */}
          <div className="announcements-split__list">
            <div className="announcements-list">
              {announcements.map((announcement) => (
                <AnnouncementListItem
                  key={announcement.id}
                  announcement={announcement}
                  isSelected={selectedId === announcement.id}
                  onSelect={() => setSelectedId(announcement.id)}
                />
              ))}
            </div>

            {showViewAll && (
              <div className="announcements-split__view-all">
                <a href="/announcements" className="btn">
                  View All Announcements
                </a>
              </div>
            )}
          </div>

          {/* Right column - Announcement details */}
          <div className="announcements-split__detail">
            {selectedAnnouncement ? (
              <AnnouncementDetail announcement={selectedAnnouncement} />
            ) : (
              <div className="announcements-split__placeholder">
                Select an announcement to view details
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
