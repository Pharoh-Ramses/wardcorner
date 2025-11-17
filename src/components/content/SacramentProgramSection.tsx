import type { SacramentProgram } from '@/payload-types'
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
          <h2 className="sacrament-program-section__title">Sacrament Program</h2>
          <div className="sacrament-program-section__empty">No sacrament program available.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="sacrament-program-section">
      <div className="container">
        <h2 className="sacrament-program-section__title">Sacrament Program</h2>

        <div className="sacrament-program-section__content">
          <SacramentProgramCard program={program} />

          <div className="sacrament-program-section__footer">
            <a href="/sacrament-programs" className="btn">
              Past Programs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
