import Link from 'next/link'
import type { Announcement, Event } from '@/payload-types'
import Card from './Card'

interface HomeFeedProps {
  events: Event[]
  announcements: Announcement[]
  eventsError?: string | null
  announcementsError?: string | null
}

export default function HomeFeed({
  events,
  announcements,
  eventsError,
  announcementsError,
}: HomeFeedProps) {
  const showEvents = !eventsError && events.length > 0
  const showAnnouncements = !announcementsError && announcements.length > 0

  if (!showEvents && !showAnnouncements) {
    return null
  }

  return (
    <div className="home-feed-grid">
      {/* Events Column */}
      {showEvents && (
        <div className="home-feed-column">
          <div className="home-section__header">
            <h2 className="home-section__title">Upcoming Events</h2>
            <Link href="/events" className="home-section__link">
              View calendar
            </Link>
          </div>
          <div className="home-grid home-grid--single-col">
            {events.map((event) => (
              <Card key={event.id} type="event" data={event} />
            ))}
          </div>
        </div>
      )}

      {/* Announcements Column */}
      {showAnnouncements && (
        <div className="home-feed-column">
          <div className="home-section__header">
            <h2 className="home-section__title">Announcements</h2>
            <Link href="/announcements" className="home-section__link">
              Read all
            </Link>
          </div>
          <div className="home-grid home-grid--single-col">
            {announcements.map((announcement) => (
              <Card key={announcement.id} type="announcement" data={announcement} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
