import type { SacramentProgram } from '@/payload-types'
import { getSacramentPrograms } from '@/lib/payload'
import Section from '@/components/ui/Section'
import ContentList from '@/components/ui/ContentList'
import Card from '@/components/content/Card'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { formatDate } from '@/lib/utils/formatters'

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

  // Sort programs by date (most recent first)
  programs.sort((a, b) => {
    const aDate = new Date(a.date || a.updatedAt || a.createdAt || 0)
    const bDate = new Date(b.date || b.updatedAt || b.createdAt || 0)
    return bDate.getTime() - aDate.getTime()
  })

  const nextProgram = programs[0] ?? null

  const totalPrograms = programs.length
  const monthsRepresented = new Set(
    programs.map((program) => {
      const date = new Date(program.date || program.updatedAt || program.createdAt || 0)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }),
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
      {/* Hero Section */}
      <Section variant="default">
        <div className="sacrament-programs-hero">
          <div className="sacrament-programs-hero__content">
            <p className="sacrament-programs-hero__chip">Worship planning</p>
            <h1 className="sacrament-programs-hero__title">Sacrament Programs</h1>
            <p className="sacrament-programs-hero__description">{heroDescription}</p>

            <div className="sacrament-programs-hero__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="sacrament-programs-hero__stat">
                  <span className="sacrament-programs-hero__stat-value">{stat.value}</span>
                  <span className="sacrament-programs-hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {nextProgram && (
            <div className="sacrament-programs-hero__featured">
              <div className="sacrament-programs-hero__featured-label">Upcoming outline</div>
              <Card type="sacrament-program" data={nextProgram} />
            </div>
          )}
        </div>
      </Section>

      {/* Programs List */}
      <Section variant="highlighted">
        <ContentList
          items={programs}
          type="sacrament-program"
          title="Sacrament Programs"
          description="Browse past and upcoming sacrament meeting outlines"
          groupBy="calendar_month"
          showFilters={false}
          maxItemsPerGroup={10}
          itemsPerPage={20}
        />
      </Section>
    </>
  )
}
