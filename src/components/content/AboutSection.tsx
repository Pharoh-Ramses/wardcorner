import React from 'react'
import Image from 'next/image'

export default function AboutSection() {
  const aboutTitle = process.env.NEXT_PUBLIC_ABOUT_TITLE || 'About Our Ward'
  const aboutDescription = process.env.NEXT_PUBLIC_ABOUT_DESCRIPTION || ''
  const aboutImageUrl = process.env.NEXT_PUBLIC_ABOUT_IMAGE_URL || ''
  const aboutImageAlt = process.env.NEXT_PUBLIC_ABOUT_IMAGE_ALT || 'Ward building'
  const wardAddress = process.env.NEXT_PUBLIC_WARD_ADDRESS || ''
  const sacramentTime = process.env.NEXT_PUBLIC_SACRAMENT_TIME || ''
  const sundaySchoolTime = process.env.NEXT_PUBLIC_SUNDAY_SCHOOL_TIME || ''

  // Don't render if no content is provided
  if (!aboutDescription && !aboutImageUrl && !wardAddress && !sacramentTime) {
    return null
  }

  return (
    <>
      <h2 className="about-section-title">{aboutTitle}</h2>
      <div className="about-grid">
        {/* Image */}
        {aboutImageUrl && (
          <div className="about-image-container">
            <Image
              src={aboutImageUrl}
              alt={aboutImageAlt}
              width={600}
              height={400}
              className="about-image"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="about-content">
          {/* Description */}
          {aboutDescription && <p className="about-description">{aboutDescription}</p>}

          {/* Meeting Times */}
          {(sacramentTime || sundaySchoolTime) && (
            <div className="about-times">
              <h3 className="about-subsection-title">Meeting Times</h3>
              {sacramentTime && (
                <p className="about-time-item">
                  <strong>Sacrament Meeting:</strong> {sacramentTime}
                </p>
              )}
              {sundaySchoolTime && (
                <p className="about-time-item">
                  <strong>Sunday School:</strong> {sundaySchoolTime}
                </p>
              )}
            </div>
          )}

          {/* Address */}
          {wardAddress && (
            <div className="about-address">
              <h3 className="about-subsection-title">Location</h3>
              <p className="about-address-text">{wardAddress}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
