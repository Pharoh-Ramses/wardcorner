import React from 'react'
import {
  getRecentAnnouncements,
  getUpcomingEvents,
  getMostRecentSacramentProgram,
} from '@/lib/payload'
import type { Announcement, Event, SacramentProgram } from '@/payload-types'
import AnnouncementsSplit from '@/components/content/AnnouncementsSplit'
import EventsSplit from '@/components/content/EventsSplit'
import SacramentProgramSection from '@/components/content/SacramentProgramSection'
import AboutSection from '@/components/content/AboutSection'

export default async function HomePage() {
  let announcements: Announcement[] = []
  let events: Event[] = []
  let sacramentProgram: SacramentProgram | null = null
  let announcementsError: string | null = null
  let eventsError: string | null = null
  let sacramentProgramError: string | null = null

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

  try {
    sacramentProgram = await getMostRecentSacramentProgram()
  } catch (error) {
    sacramentProgramError = 'Failed to load sacrament program'
    console.error('Error fetching sacrament program:', error)
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

      <AboutSection />

      <EventsSplit events={events} error={eventsError} title="Upcoming Events" />

      <SacramentProgramSection program={sacramentProgram} error={sacramentProgramError} />

      <AnnouncementsSplit
        announcements={announcements}
        error={announcementsError}
        title="Recent Announcements"
      />
    </>
  )
}
