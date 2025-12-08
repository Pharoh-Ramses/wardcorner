import React from 'react'

interface SectionProps {
  variant?: 'default' | 'highlighted'
  className?: string
  children: React.ReactNode
}

export default function Section({ variant = 'default', className, children }: SectionProps) {
  const isHighlighted = variant === 'highlighted'

  const sectionClasses = ['section', isHighlighted && 'section--highlighted', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={sectionClasses}>
      <div className="container">{children}</div>
    </section>
  )
}
