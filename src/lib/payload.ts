import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@/payload.config'
import type { Announcement, Event, SacramentProgram } from '@/payload-types'

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

export const getMostRecentSacramentProgram = cache(async (): Promise<SacramentProgram | null> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'sacrament-programs',
    limit: 1,
    sort: '-date',
    where: {
      date: {
        less_than_equal: new Date().toISOString(),
      },
    },
  })

  return result.docs[0] || null
})

export const getSacramentPrograms = cache(
  async (limit: number = 52): Promise<SacramentProgram[]> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'sacrament-programs',
      limit,
      sort: '-date',
    })

    return result.docs
  },
)

export const getSacramentProgramById = cache(
  async (id: number | string): Promise<SacramentProgram | null> => {
    const payload = await getPayloadClient()

    try {
      const program = await payload.findByID({
        collection: 'sacrament-programs',
        id,
        depth: 2,
      })

      return program ?? null
    } catch (_error) {
      return null
    }
  },
)

export const getAllEvents = cache(async (limit: number = 100): Promise<Event[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'events',
    limit,
    sort: 'startDateTime',
  })

  return result.docs
})

export const getAllAnnouncements = cache(async (limit: number = 100): Promise<Announcement[]> => {
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
