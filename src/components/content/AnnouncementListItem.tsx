import type { Announcement } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'

interface AnnouncementListItemProps {
  announcement: Announcement
  isSelected: boolean
  onSelect: () => void
}

export default function AnnouncementListItem({
  announcement,
  isSelected,
  onSelect,
}: AnnouncementListItemProps) {
  return (
    <div
      className={`announcement-list-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="announcement-list-item__header">
        <h3 className="announcement-list-item__title">{announcement.title}</h3>
        {announcement.featured && (
          <span className="announcement-list-item__featured">Featured</span>
        )}
      </div>

      <div className="announcement-list-item__meta">
        <span className="announcement-list-item__date">{formatDate(announcement.publishDate)}</span>
        <span className="announcement-list-item__category">
          {announcement.category.replace('-', ' ')}
        </span>
      </div>
    </div>
  )
}
