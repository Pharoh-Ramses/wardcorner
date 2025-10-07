import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@/payload.config'
import type { Announcement, Event } from '@/payload-types'

export async function getPayloadClient() {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
}

export const getRecentAnnouncements = cache(async (limit: number = 5): Promise<Announcement[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'announcements',
    limit,
    sort: '-publishDate',
    where: {
      publishDate: {
        less_than_equal: new Date().toISOString(),
      },
    },
  })

  return result.docs
})

export const getUpcomingEvents = cache(async (limit: number = 3): Promise<Event[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'events',
    limit,
    sort: 'startDateTime',
    where: {
      startDateTime: {
        greater_than_equal: new Date().toISOString(),
      },
    },
  })

  return result.docs
})
