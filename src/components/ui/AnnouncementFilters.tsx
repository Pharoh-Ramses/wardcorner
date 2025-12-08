'use client'

import { useState, useEffect } from 'react'
import type { Announcement } from '@/payload-types'

type CategoryKey = NonNullable<Announcement['category']>

interface AnnouncementFiltersProps {
  announcements: Announcement[]
  onFilteredAnnouncements: (filteredAnnouncements: Announcement[]) => void
}

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  'ward-business': 'Ward Business',
  activities: 'Activities',
  updates: 'Updates',
}

export default function AnnouncementFilters({
  announcements,
  onFilteredAnnouncements,
}: AnnouncementFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<CategoryKey>>(new Set())

  useEffect(() => {
    if (selectedCategories.size === 0) {
      onFilteredAnnouncements(announcements)
    } else {
      const filtered = announcements.filter((announcement) => {
        const category = announcement.category as CategoryKey
        return selectedCategories.has(category)
      })
      onFilteredAnnouncements(filtered)
    }
  }, [selectedCategories, announcements, onFilteredAnnouncements])

  const toggleCategory = (category: CategoryKey) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(category)) {
      newSelected.delete(category)
    } else {
      newSelected.add(category)
    }
    setSelectedCategories(newSelected)
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
  }

  const categories = Object.keys(CATEGORY_LABELS) as CategoryKey[]
  const activeCount = selectedCategories.size

  return (
    <div className="announcement-filters">
      <div className="announcement-filters__header">
        <h3 className="announcement-filters__title">Filter by category</h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="announcement-filters__clear">
            Clear {activeCount} {activeCount === 1 ? 'filter' : 'filters'}
          </button>
        )}
      </div>
      <div className="announcement-filters__options">
        {categories.map((category) => {
          const isActive = selectedCategories.has(category)
          const count = announcements.filter(
            (announcement) => announcement.category === category,
          ).length

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`announcement-filters__option ${isActive ? 'announcement-filters__option--active' : ''}`}
              disabled={count === 0}
            >
              <span className="announcement-filters__option-label">
                {CATEGORY_LABELS[category]}
              </span>
              <span className="announcement-filters__option-count">({count})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
