import React from 'react'
import EventDetail from '@/components/content/EventDetail'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params
  const payload = await getPayload({ config })

  try {
    const event = await payload.findByID({
      collection: 'events',
      id,
      depth: 2, // Populate related media and contact person
    })

    if (!event) {
      return (
        <div className="container">
          <ErrorMessage message="Event not found" />
        </div>
      )
    }

    return (
      <div className="container">
        <div className="section">
          <EventDetail event={event} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching event:', error)
    return (
      <div className="container">
        <ErrorMessage message="Failed to load event" />
      </div>
    )
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  try {
    const events = await payload.find({
      collection: 'events',
      limit: 100, // Adjust based on your needs
    })

    return events.docs.map((event) => ({
      id: event.id.toString(),
    }))
  } catch (_error) {
    console.error('Error generating static params:', _error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayload({ config })

  try {
    const event = await payload.findByID({
      collection: 'events',
      id,
    })

    if (!event) {
      return {
        title: 'Event Not Found',
      }
    }

    return {
      title: event.title,
      description: event.description
        ? `Event on ${new Date(event.startDateTime).toLocaleDateString()}`
        : `Event on ${new Date(event.startDateTime).toLocaleDateString()}`,
    }
  } catch (_error) {
    return {
      title: 'Event Details',
    }
  }
}
