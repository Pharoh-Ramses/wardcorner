import React from 'react'
import { getRecentAnnouncements, getUpcomingEvents } from '@/lib/payload'
import type { Announcement, Event } from '@/payload-types'
import AnnouncementsList from '@/components/content/AnnouncementsList'
import EventsList from '@/components/content/EventsList'

export default async function HomePage() {
  let announcements: Announcement[] = []
  let events: Event[] = []
  let announcementsError: string | null = null
  let eventsError: string | null = null

  try {
    announcements = await getRecentAnnouncements(5)
  } catch (error) {
    announcementsError = 'Failed to load announcements'
    console.error('Error fetching announcements:', error)
  }

  try {
    events = await getUpcomingEvents(3)
  } catch (error) {
    eventsError = 'Failed to load upcoming events'
    console.error('Error fetching events:', error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            {process.env.NEXT_PUBLIC_HERO_TITLE || 'Welcome to Our Ward'}
          </h1>
          <p className="hero-subtitle">
            {process.env.NEXT_PUBLIC_HERO_SUBTITLE ||
              'Stay connected with the latest announcements, events, and activities in our ward community.'}
          </p>
        </div>
      </section>

      <div className="container">
        <AnnouncementsList
          announcements={announcements}
          error={announcementsError}
          title="Recent Announcements"
        />

        <EventsList events={events} error={eventsError} title="Upcoming Events" />
      </div>
    </>
  )
}
