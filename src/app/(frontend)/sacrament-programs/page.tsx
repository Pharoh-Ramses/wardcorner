import Link from 'next/link'
import type { SacramentProgram } from '@/payload-types'
import { getSacramentPrograms } from '@/lib/payload'
import SacramentProgramCard from '@/components/content/SacramentProgramCard'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { formatDate } from '@/lib/utils/formatters'

const MONTH_LABEL_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
})

const DAY_FORMAT = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
})

type ArchiveGroup = {
  label: string
  programs: SacramentProgram[]
}

function toValidDate(value?: string | null): Date | null {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function getProgramDate(program: SacramentProgram): Date {
  return (
    toValidDate(program.date) ||
    toValidDate(program.updatedAt) ||
    toValidDate(program.createdAt) ||
    new Date()
  )
}

function groupProgramsByMonth(programs: SacramentProgram[]): ArchiveGroup[] {
  const buckets = new Map<string, SacramentProgram[]>()

  programs.forEach((program) => {
    const label = MONTH_LABEL_FORMAT.format(getProgramDate(program))
    const bucket = buckets.get(label) ?? []
    bucket.push(program)
    buckets.set(label, bucket)
  })

  return Array.from(buckets.entries()).map(([label, list]) => ({ label, programs: list }))
}

function summarizeLeadership(program: SacramentProgram): string {
  const details: string[] = []

  if (program.presiding) {
    details.push(`Presiding: ${program.presiding}`)
  }

  if (program.conducting) {
    details.push(`Conducting: ${program.conducting}`)
  }

  if (details.length === 0) {
    return 'Leadership assignments coming soon'
  }

  return details.join(' • ')
}

function countSpeakers(programs: SacramentProgram[]): number {
  return programs.reduce((total, program) => total + (program.speakers?.length ?? 0), 0)
}

export default async function SacramentProgramsPage() {
  let programs: SacramentProgram[] = []
  let error: string | null = null

  try {
    programs = await getSacramentPrograms(52)
  } catch (_error) {
    error = 'Failed to load sacrament programs'
    console.error('Error fetching sacrament programs:', _error)
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} />
      </div>
    )
  }

  const nextProgram = programs[0] ?? null
  const archivePrograms = nextProgram ? programs.slice(1) : programs
  const archiveGroups = groupProgramsByMonth(archivePrograms)

  const totalPrograms = programs.length
  const monthsRepresented = new Set(
    programs.map((program) => MONTH_LABEL_FORMAT.format(getProgramDate(program))),
  ).size
  const speakerCount = countSpeakers(programs)

  const stats = [
    { label: 'Programs published', value: totalPrograms },
    { label: 'Months covered', value: monthsRepresented },
    { label: 'Speakers featured', value: speakerCount },
  ]

  const heroDescription = nextProgram
    ? `Prepare for the next sacrament meeting on ${formatDate(nextProgram.date)} with hymns, speakers, and assignments.`
    : 'As soon as a new outline is published in Payload it will appear here. Browse the archive to revisit past services.'

  return (
    <>
      <section className="events-hero sacrament-programs-hero">
        <div className="events-hero__glow" />
        <div className="container">
          <div className="events-hero__layout">
            <div className="events-hero__intro">
              <p className="events-hero__chip">Worship planning</p>
              <h1 className="events-hero__title">Sacrament Programs</h1>
              <p className="events-hero__lede">{heroDescription}</p>
              <div className="events-hero__stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="events-hero__stat">
                    <span className="events-hero__stat-value">{stat.value}</span>
                    <span className="events-hero__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="events-hero__highlight">
              {nextProgram ? (
                <div className="sacrament-programs-hero__card">
                  <p className="events-hero__subline">Upcoming outline</p>
                  <SacramentProgramCard program={nextProgram} />
                  <div className="events-hero__cta">
                    <Link
                      href={`/sacrament-programs/${nextProgram.id}`}
                      className="btn btn-primary"
                    >
                      View full details
                    </Link>
                    <Link href="#sacrament-programs-archive" className="btn events-hero__secondary">
                      Browse archive
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="events-hero__empty">
                  <p>No sacrament program is scheduled yet.</p>
                  <p>Ward clerks can add the agenda from the Payload admin anytime.</p>
                  <Link href="#sacrament-programs-archive" className="btn btn-primary">
                    View previous programs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sacrament-programs-archive" id="sacrament-programs-archive">
        <div className="container">
          <div className="sacrament-programs-archive__header">
            <div>
              <p className="sacrament-programs-archive__eyebrow">Reference library</p>
              <h2 className="sacrament-programs-archive__title">Past sacrament meetings</h2>
              <p className="sacrament-programs-archive__subtitle">
                Revisit talks, hymns, and assignments from earlier services. Use this archive to
                plan future meetings or share details with speakers.
              </p>
            </div>
            <p className="sacrament-programs-archive__count">
              Showing {archivePrograms.length} saved{' '}
              {archivePrograms.length === 1 ? 'program' : 'programs'}
            </p>
          </div>

          {archiveGroups.length === 0 ? (
            <div className="sacrament-programs-archive__empty">
              <p>No past programs have been published yet.</p>
              <p>As soon as leaders add them, the archive will appear here automatically.</p>
            </div>
          ) : (
            archiveGroups.map((group) => (
              <div key={group.label} className="sacrament-programs-archive__group">
                <h3 className="sacrament-programs-archive__group-title">{group.label}</h3>
                <ul className="sacrament-programs-list">
                  {group.programs.map((program) => {
                    const date = getProgramDate(program)
                    const day = DAY_FORMAT.format(date)
                    const weekday = WEEKDAY_FORMAT.format(date)

                    return (
                      <li key={program.id} className="sacrament-programs-list-item">
                        <div className="sacrament-programs-list-date">
                          <span className="sacrament-programs-list-day">{day}</span>
                          <span className="sacrament-programs-list-weekday">{weekday}</span>
                        </div>
                        <div className="sacrament-programs-list-body">
                          <p className="sacrament-programs-list-title">
                            {formatDate(program.date)}
                          </p>
                          <p className="sacrament-programs-list-meta">
                            {summarizeLeadership(program)}
                          </p>
                        </div>
                        <Link
                          href={`/sacrament-programs/${program.id}`}
                          className="sacrament-programs-list-link"
                        >
                          View details
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}
