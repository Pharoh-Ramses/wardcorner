import React from 'react'
import type { SacramentProgram } from '@/payload-types'
import { formatDate } from '@/lib/utils/formatters'

interface SacramentProgramCardProps {
  program: SacramentProgram
}

export default function SacramentProgramCard({ program }: SacramentProgramCardProps) {
  // Helper function to extract speaker name
  const getSpeakerName = (speaker: number | any) => {
    if (typeof speaker === 'number') {
      // If it's just an ID, we can't fetch the name without additional API calls
      // For now, show the ID or a placeholder
      return `Speaker #${speaker}`
    }

    // If it's a populated object, use the fullName
    if (speaker && typeof speaker === 'object') {
      return speaker.fullName || speaker.name || 'Unknown Speaker'
    }

    return 'Unknown Speaker'
  }

  // Group musical numbers by type
  const getMusicalNumbersByType = (type: string) => {
    return program.musicalNumbers?.filter((mn) => mn.type === type) || []
  }

  return (
    <div className="sacrament-program-card">
      <div className="sacrament-program-card__header">
        <h3 className="sacrament-program-card__date">{formatDate(program.date)}</h3>
      </div>

      <div className="sacrament-program-card__content">
        {program.presiding && program.conducting && (
          <div className="sacrament-program-section">
            <div className="sacrament-program-row">
              <span className="sacrament-program-label">Presiding:</span>
              <span className="sacrament-program-value">{program.presiding}</span>
              <span className="sacrament-program-label">Conducting:</span>
              <span className="sacrament-program-value">{program.conducting}</span>
            </div>
          </div>
        )}

        {program.musicalNumbers && (
          <div className="sacrament-program-section">
            <h4 className="sacrament-program-section-title">Music</h4>
            <div className="sacrament-program-music-row">
              {getMusicalNumbersByType('opening-hymn').map((mn, index) => (
                <div key={`opening-${index}`} className="sacrament-program-music-item">
                  <div className="sacrament-program-music-type">Opening</div>
                  <div className="sacrament-program-music-song">{mn.song || 'TBD'}</div>
                </div>
              ))}
              {getMusicalNumbersByType('sacrament-hymn').map((mn, index) => (
                <div key={`sacrament-${index}`} className="sacrament-program-music-item">
                  <div className="sacrament-program-music-type">Sacrament</div>
                  <div className="sacrament-program-music-song">{mn.song || 'TBD'}</div>
                </div>
              ))}
              {getMusicalNumbersByType('closing-hymn').map((mn, index) => (
                <div key={`closing-${index}`} className="sacrament-program-music-item">
                  <div className="sacrament-program-music-type">Closing</div>
                  <div className="sacrament-program-music-song">{mn.song || 'TBD'}</div>
                </div>
              ))}
            </div>
            {getMusicalNumbersByType('special').map((mn, index) => (
              <div key={`special-${index}`} className="sacrament-program-row">
                <span className="sacrament-program-label">Special:</span>
                <span className="sacrament-program-value">
                  {mn.song || 'Musical Number'}
                  {mn.performer && ` - ${getSpeakerName(mn.performer)}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {program.speakers && program.speakers.length > 0 && (
          <div className="sacrament-program-section">
            <h4 className="sacrament-program-section-title">Speakers</h4>
            {program.speakers.map((speaker, index) => (
              <div key={index} className="sacrament-program-talk">
                <span className="sacrament-program-speaker">{getSpeakerName(speaker.speaker)}</span>
                {speaker.topic && <span className="sacrament-program-topic">{speaker.topic}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
