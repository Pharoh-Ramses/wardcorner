import Link from 'next/link'
import type { Metadata } from 'next'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SacramentProgramCard from '@/components/content/SacramentProgramCard'
import { getPayloadClient, getSacramentProgramById } from '@/lib/payload'
import type { Announcement } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

type AnnouncementReference = number | Announcement | null | undefined

function isAnnouncement(document: AnnouncementReference): document is Announcement {
  return Boolean(document && typeof document === 'object' && 'title' in document)
}

export default async function SacramentProgramDetailPage({ params }: PageProps) {
  const { id } = await params
  const program = await getSacramentProgramById(id)

  if (!program) {
    return (
      <div className="container">
        <ErrorMessage message="Sacrament program not found" />
      </div>
    )
  }

  const formattedDate = formatDate(program.date)
  const announcements = (program.announcements ?? []).filter(isAnnouncement)

  return (
    <div className="container">
      <div className="section sacrament-program-detail">
        <Link href="/sacrament-programs" className="sacrament-program-detail__back">
          ← Back to archive
        </Link>
        <div className="sacrament-program-detail__header">
          <p className="sacrament-program-detail__eyebrow">Sacrament meeting</p>
          <h1 className="sacrament-program-detail__title">Program for {formattedDate}</h1>
          <p className="sacrament-program-detail__subtitle">
            Review leadership assignments, hymns, and speaker topics to prepare for this meeting or
            recap afterward.
          </p>
        </div>

        <SacramentProgramCard program={program} />

        {announcements.length > 0 && (
          <section className="sacrament-program-detail__announcements">
            <h2 className="sacrament-program-detail__announcements-title">Related announcements</h2>
            <ul className="sacrament-program-detail__announcements-list">
              {announcements.map((announcement) => (
                <li key={announcement.id} className="sacrament-program-detail__announcement">
                  <p className="sacrament-program-detail__announcement-title">
                    {announcement.title}
                  </p>
                  {announcement.publishDate && (
                    <p className="sacrament-program-detail__announcement-date">
                      Published {formatDate(announcement.publishDate)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'sacrament-programs',
      limit: 100,
      sort: '-date',
    })

    return result.docs.map((program) => ({
      id: program.id.toString(),
    }))
  } catch (_error) {
    console.error('Error generating sacrament program params:', _error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayloadClient()

  try {
    const program = await payload.findByID({
      collection: 'sacrament-programs',
      id,
    })

    if (!program) {
      return {
        title: 'Sacrament Program Not Found',
      }
    }

    return {
      title: `Sacrament Program – ${formatDate(program.date)}`,
      description: 'Agenda, hymns, and speakers for this sacrament meeting.',
    }
  } catch (_error) {
    return {
      title: 'Sacrament Program',
    }
  }
}
