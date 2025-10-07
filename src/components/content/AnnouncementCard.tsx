import type { Announcement } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'
import RichText from '@/components/ui/RichText'

interface AnnouncementCardProps {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <div className="announcement-card card">
      <h3 className="announcement-card__title">{announcement.title}</h3>
      <div className="announcement-card__date">
        {formatDate(announcement.publishDate)}
        {announcement.category && (
          <span className="announcement-card__category">
            • {announcement.category.replace('-', ' ')}
          </span>
        )}
      </div>
      <div className="announcement-card__content">
        <RichText content={announcement.content} />
      </div>
    </div>
  )
}
