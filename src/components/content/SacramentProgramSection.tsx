import type { SacramentProgram } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'
import SacramentProgramCard from './SacramentProgramCard'
import Loading from '@/components/ui/Loading'
import ErrorMessage from '@/components/ui/ErrorMessage'

interface SacramentProgramSectionProps {
  program: SacramentProgram | null
  loading?: boolean
  error?: string | null
}

export default function SacramentProgramSection({
  program,
  loading = false,
  error = null,
}: SacramentProgramSectionProps) {
  if (loading) return <Loading message="Loading sacrament program..." />
  if (error) return <ErrorMessage message={error} />

  if (!program) {
    return (
      <section className="sacrament-program-section">
        <div className="container">
          <div className="sacrament-program-section__intro">
            <div>
              <p className="sacrament-program-section__eyebrow">Worship Service</p>
              <h2 className="sacrament-program-section__title">Sacrament Program</h2>
              <p className="sacrament-program-section__description">
                We'll share the next sacrament meeting outline as soon as it's ready. In the
                meantime, explore past programs for talks, hymns, and assignments.
              </p>
            </div>
            <div className="sacrament-program-section__actions">
              <a href="/sacrament-programs" className="btn btn-primary">
                Browse archive
              </a>
            </div>
          </div>

          <div className="sacrament-program-section__empty-card">
            <p className="sacrament-program-section__empty">No sacrament program available.</p>
            <p className="sacrament-program-section__empty-subtitle">
              Check back later for the latest details.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const programDate = formatDate(program.date)

  return (
    <section className="sacrament-program-section">
      <div className="container">
        <div className="sacrament-program-section__intro">
          <div>
            <p className="sacrament-program-section__eyebrow">Worship Service</p>
            <div className="sacrament-program-section__heading">
              <h2 className="sacrament-program-section__title">Sacrament Program</h2>
              <span className="sacrament-program-section__pill">Updated {programDate}</span>
            </div>
            <p className="sacrament-program-section__description">
              Review the speakers, hymns, and leadership assignments ahead of this week's meeting.
            </p>
          </div>
          <div className="sacrament-program-section__actions">
            <a href="/sacrament-programs" className="btn btn-primary">
              View past programs
            </a>
          </div>
        </div>

        <div className="sacrament-program-section__content">
          <SacramentProgramCard program={program} />
        </div>

        <div className="sacrament-program-section__footer">
          <p className="sacrament-program-section__footer-text">
            Need an earlier outline? <a href="/sacrament-programs">Browse the archive</a>
          </p>
        </div>
      </div>
    </section>
  )
}
