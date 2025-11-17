import type { Announcement } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'
import RichText from '@/components/ui/RichText'

interface AnnouncementDetailProps {
  announcement: Announcement
}

export default function AnnouncementDetail({ announcement }: AnnouncementDetailProps) {
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
      </div>
    </div>
  )
}
