import React from 'react'
import AnnouncementDetail from '@/components/content/AnnouncementDetail'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const { id } = await params
  const payload = await getPayload({ config })

  try {
    const announcement = await payload.findByID({
      collection: 'announcements',
      id,
      depth: 3, // Populate author information
    })

    if (!announcement) {
      return (
        <div className="container">
          <ErrorMessage message="Announcement not found" />
        </div>
      )
    }

    return (
      <div className="container">
        <div className="section">
          <AnnouncementDetail announcement={announcement} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching announcement:', error)
    return (
      <div className="container">
        <ErrorMessage message="Failed to load announcement" />
      </div>
    )
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  try {
    const announcements = await payload.find({
      collection: 'announcements',
      limit: 100,
    })

    return announcements.docs.map((announcement) => ({
      id: announcement.id.toString(),
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
    const announcement = await payload.findByID({
      collection: 'announcements',
      id,
    })

    if (!announcement) {
      return {
        title: 'Announcement Not Found',
      }
    }

    return {
      title: announcement.title,
      description: `Published on ${new Date(announcement.publishDate).toLocaleDateString()}`,
    }
  } catch (_error) {
    return {
      title: 'Announcement Details',
    }
  }
}
