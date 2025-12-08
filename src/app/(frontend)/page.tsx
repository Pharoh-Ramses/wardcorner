import React from 'react'
import {
  getRecentAnnouncements,
  getUpcomingEvents,
  getMostRecentSacramentProgram,
} from '@/lib/payload'
import type { Announcement, Event, SacramentProgram } from '@/payload-types'
import HomeFeed from '@/components/content/HomeFeed'
import SacramentProgramSection from '@/components/content/SacramentProgramSection'
import AboutSection from '@/components/content/AboutSection'
import Section from '@/components/ui/Section'

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
      <Section variant="default" className="hero">
        <h1 className="hero-title">
          {process.env.NEXT_PUBLIC_HERO_TITLE || 'Welcome to Our Ward'}
        </h1>
        <p className="hero-subtitle">
          {process.env.NEXT_PUBLIC_HERO_SUBTITLE ||
            'Stay connected with the latest announcements, events, and activities in our ward community.'}
        </p>
      </Section>

      <Section variant="default">
        <AboutSection />
      </Section>

      <Section variant="highlighted">
        <HomeFeed
          events={events}
          announcements={announcements}
          eventsError={eventsError}
          announcementsError={announcementsError}
        />
      </Section>

      <Section variant="highlighted">
        <SacramentProgramSection program={sacramentProgram} error={sacramentProgramError} />
      </Section>
    </>
  )
}
