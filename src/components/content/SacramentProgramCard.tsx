import React from 'react'
import type { SacramentProgram } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'

interface SacramentProgramCardProps {
  program: SacramentProgram
}

type SpeakerReference = number | { fullName?: string | null; name?: string | null }

export default function SacramentProgramCard({ program }: SacramentProgramCardProps) {
  const getSpeakerName = (speaker: SpeakerReference | null | undefined) => {
    if (typeof speaker === 'number') {
      return `Speaker #${speaker}`
    }

    if (speaker && typeof speaker === 'object') {
      return speaker.fullName || speaker.name || 'Unknown Speaker'
    }

    return 'Unknown Speaker'
  }

  const meetingDate = new Date(program.date)
  const weekday = meetingDate.toLocaleDateString('en-US', { weekday: 'long' })
  const friendlyDate = formatDate(program.date)

  const leadershipSummary = [
    { label: 'Presiding', value: program.presiding },
    { label: 'Conducting', value: program.conducting },
  ]

  const musicalNumbers = program.musicalNumbers || []
  const musicalTypeLabels: Record<string, string> = {
    'opening-hymn': 'Opening Hymn',
    'sacrament-hymn': 'Sacrament Hymn',
    'intermediate-hymn': 'Intermediate Hymn',
    'closing-hymn': 'Closing Hymn',
    special: 'Special Musical Number',
  }

  const orderedMusicalTypes: Array<keyof typeof musicalTypeLabels> = [
    'opening-hymn',
    'sacrament-hymn',
    'intermediate-hymn',
    'closing-hymn',
    'special',
  ]

  const musicalGroups = orderedMusicalTypes
    .map((type) => ({
      type,
      label: musicalTypeLabels[type],
      items: musicalNumbers.filter((mn) => mn.type === type),
    }))
    .filter((group) => group.items.length > 0)

  const speakers = program.speakers || []
  const hasSpeakers = speakers.length > 0

  return (
    <article className="sacrament-program-card" aria-label="Sacrament program details">
      <header className="sacrament-program-card__header">
        <span className="sacrament-program-card__eyebrow">This week&rsquo;s worship service</span>
        <h3 className="sacrament-program-card__date">{friendlyDate}</h3>
        <p className="sacrament-program-card__weekday">{weekday}</p>
      </header>

      <div className="sacrament-program-card__meta-grid" role="list">
        {leadershipSummary.map((item) => (
          <div key={item.label} className="sacrament-program-card__meta-item" role="listitem">
            <p className="sacrament-program-card__meta-label">{item.label}</p>
            <p className="sacrament-program-card__meta-value">{item.value || 'To be announced'}</p>
          </div>
        ))}
      </div>

      {musicalGroups.length > 0 && (
        <section className="sacrament-program-card__group" aria-label="Music selections">
          <div className="sacrament-program-card__group-header">
            <h4 className="sacrament-program-section-title">Music</h4>
            <p className="sacrament-program-group-description">
              Hymns & musical numbers for the service
            </p>
          </div>
          <div className="sacrament-program-card__music-grid">
            {musicalGroups.map((group) =>
              group.items.map((mn, index) => (
                <div key={`${group.type}-${index}`} className="sacrament-program-card__music-card">
                  <p className="sacrament-program-music-type">{group.label}</p>
                  <p className="sacrament-program-music-song">{mn.song || 'To be announced'}</p>
                  {group.type === 'special' && mn.performer && (
                    <p className="sacrament-program-music-performer">
                      {getSpeakerName(mn.performer)}
                    </p>
                  )}
                </div>
              )),
            )}
          </div>
        </section>
      )}

      {hasSpeakers && (
        <section className="sacrament-program-card__group" aria-label="Speakers">
          <div className="sacrament-program-card__group-header">
            <h4 className="sacrament-program-section-title">Speaker lineup</h4>
            <p className="sacrament-program-group-description">Topics & focus for the meeting</p>
          </div>
          <ol className="sacrament-program-card__speakers">
            {speakers.map((speaker, index) => (
              <li key={`speaker-${index}`} className="sacrament-program-card__speaker">
                <span className="sacrament-program-card__speaker-dot" aria-hidden="true" />
                <div>
                  <p className="sacrament-program-speaker">{getSpeakerName(speaker.speaker)}</p>
                  {speaker.topic && <p className="sacrament-program-topic">{speaker.topic}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  )
}
