import type { Announcement } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'
import RichText from '@/components/ui/RichText'
import Link from 'next/link'

interface AnnouncementDetailProps {
  announcement: Announcement
  showBackLink?: boolean
}

export default function AnnouncementDetail({
  announcement,
  showBackLink = true,
}: AnnouncementDetailProps) {
  return (
    <div className="announcement-detail">
      <div className="announcement-detail__header">
        <div className="announcement-detail__meta">
          <span className="announcement-detail__date">{formatDate(announcement.publishDate)}</span>
          <span className="announcement-detail__category">
            {announcement.category.replace('-', ' ')}
          </span>
          {announcement.featured && <span className="announcement-detail__featured">Featured</span>}
        </div>

        <h1 className="announcement-detail__title">{announcement.title}</h1>
      </div>

      {announcement.author && typeof announcement.author === 'object' && (
        <div className="announcement-detail__author">
          <h3 className="announcement-detail__author-title">Author</h3>
          <div className="announcement-detail__author-info">
            <span className="announcement-detail__author-name">
              👤 {announcement.author.email || 'Unknown'}
            </span>
          </div>
        </div>
      )}

      <div className="announcement-detail__content">
        <RichText content={announcement.content} />
      </div>

      <div className="announcement-detail__footer">
        <div className="announcement-detail__timestamps">
          <span className="announcement-detail__created">
            Created: {formatDate(announcement.createdAt)}
          </span>
          {announcement.updatedAt !== announcement.createdAt && (
            <span className="announcement-detail__updated">
              Updated: {formatDate(announcement.updatedAt)}
            </span>
          )}
        </div>
        {showBackLink && (
          <div className="announcement-detail__actions">
            <Link href="/announcements" className="btn">
              ← Back to Announcements
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
