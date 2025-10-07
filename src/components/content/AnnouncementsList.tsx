import Link from 'next/link'
import type { Announcement } from '@/payload-types'
import AnnouncementCard from './AnnouncementCard'
import Loading from '@/components/ui/Loading'
import ErrorMessage from '@/components/ui/ErrorMessage'

interface AnnouncementsListProps {
  announcements: Announcement[]
  loading?: boolean
  error?: string | null
  showViewAll?: boolean
  title?: string
}

export default function AnnouncementsList({
  announcements,
  loading = false,
  error = null,
  showViewAll = true,
  title = 'Recent Announcements',
}: AnnouncementsListProps) {
  if (loading) return <Loading message="Loading announcements..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <section className="content-section">
      <h2 className="section-title">{title}</h2>
      {announcements.length === 0 ? (
        <div className="loading">No announcements available.</div>
      ) : (
        <>
          <div className="announcements-grid">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          {showViewAll && (
            <div className="section-footer">
              <Link href="/announcements" className="btn">
                View All Announcements
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  )
}
