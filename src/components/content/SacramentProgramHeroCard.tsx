import React from 'react'
import type { SacramentProgram } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'

interface SacramentProgramHeroCardProps {
  program: SacramentProgram
}

type SpeakerReference = number | { fullName?: string | null; name?: string | null }

export default function SacramentProgramHeroCard({ program }: SacramentProgramHeroCardProps) {
  const getSpeakerName = (speaker: SpeakerReference | null | undefined) => {
    if (typeof speaker === 'number') {
      return `Speaker #${speaker}`
    }

    if (speaker && typeof speaker === 'object') {
      return speaker.fullName || speaker.name || 'Unknown Speaker'
    }

    return 'Unknown Speaker'
  }

  const weekday = new Date(program.date).toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <article className="sacrament-program-hero-card">
      <header className="sacrament-program-hero-card__header">
        <div className="sacrament-program-hero-card__date-group">
          <h3 className="sacrament-program-hero-card__date">{formatDate(program.date)}</h3>
          <span className="sacrament-program-hero-card__weekday">{weekday}</span>
        </div>
      </header>

      <div className="sacrament-program-hero-card__content">
        <div className="sacrament-program-hero-card__leadership">
          <div className="sacrament-program-hero-card__leader">
            <span className="sacrament-program-hero-card__label">Presiding</span>
            <span className="sacrament-program-hero-card__value">{program.presiding || 'TBA'}</span>
          </div>
          <div className="sacrament-program-hero-card__leader">
            <span className="sacrament-program-hero-card__label">Conducting</span>
            <span className="sacrament-program-hero-card__value">
              {program.conducting || 'TBA'}
            </span>
          </div>
        </div>

        {program.speakers && program.speakers.length > 0 && (
          <div className="sacrament-program-hero-card__section">
            <h4 className="sacrament-program-hero-card__section-title">Speakers</h4>
            <ul className="sacrament-program-hero-card__list">
              {program.speakers.map((s, i) => (
                <li key={i} className="sacrament-program-hero-card__list-item">
                  {getSpeakerName(s.speaker)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {program.musicalNumbers && program.musicalNumbers.length > 0 && (
          <div className="sacrament-program-hero-card__section">
            <h4 className="sacrament-program-hero-card__section-title">Music</h4>
            <ul className="sacrament-program-hero-card__list">
              {program.musicalNumbers
                .filter((m) => m.type === 'opening-hymn' || m.type === 'sacrament-hymn')
                .map((m, i) => (
                  <li key={i} className="sacrament-program-hero-card__list-item">
                    <span className="sacrament-program-hero-card__music-type">
                      {m.type === 'opening-hymn' ? 'Opening' : 'Sacrament'}:
                    </span>{' '}
                    {m.song}
                  </li>
                ))}
              {program.musicalNumbers.length > 2 && (
                <li className="sacrament-program-hero-card__list-item italic text-muted">
                  + {program.musicalNumbers.length - 2} more selections
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
