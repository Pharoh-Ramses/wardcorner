'use client'

import { useState, useMemo } from 'react'
import type { Announcement, Event, SacramentProgram } from '@/payload-types'
import Card from '@/components/content/Card'

type ContentType = 'announcement' | 'event' | 'sacrament-program'
type GroupBy = 'category' | 'upcoming' | 'calendar_month' | 'none'

interface BaseContentItem {
  id: string | number
  category?: string
  publishDate?: string
  startDateTime?: string
  date?: string
}

interface ContentListProps<T extends BaseContentItem> {
  items: T[]
  type: ContentType
  title?: string
  description?: string
  groupBy?: GroupBy
  showFilters?: boolean
  maxItemsPerGroup?: number
  itemsPerPage?: number
  emptyMessage?: string
  filterEmptyMessage?: string
}

type ContentItem = Announcement | Event | SacramentProgram

export default function ContentList<T extends BaseContentItem>({
  items,
  type,
  title = 'Content',
  description,
  groupBy = 'none',
  showFilters = false,
  maxItemsPerGroup = 5,
  itemsPerPage = 20,
  emptyMessage = `No ${type}s available`,
  filterEmptyMessage = `No ${type}s match the selected filters`,
}: ContentListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Group items based on the groupBy strategy
  const groupedItems = useMemo(() => {
    if (groupBy === 'none') {
      return { all: items }
    }

    const groups: Record<string, T[]> = {}

    items.forEach((item) => {
      let groupKey = 'other'

      if (groupBy === 'category') {
        groupKey = item.category || 'uncategorized'
      } else if (groupBy === 'upcoming' && type === 'event') {
        const eventItem = item as unknown as Event
        if ('startDateTime' in eventItem) {
          const eventDate = new Date(eventItem.startDateTime)
          const now = new Date()
          groupKey = eventDate > now ? 'upcoming' : 'past'
        }
      } else if (groupBy === 'calendar_month' && type === 'sacrament-program') {
        const programItem = item as unknown as SacramentProgram
        if ('date' in programItem) {
          const programDate = new Date(programItem.date)
          groupKey = programDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })
        }
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
    })

    return groups
  }, [items, groupBy, type])

  // Filter items based on selected categories
  const filteredGroups = useMemo(() => {
    if (selectedCategories.size === 0) {
      return groupedItems
    }

    const filtered: Record<string, T[]> = {}

    Object.entries(groupedItems).forEach(([groupKey, groupItems]) => {
      const filteredItems = groupItems.filter(
        (item) => !item.category || selectedCategories.has(item.category),
      )
      if (filteredItems.length > 0) {
        filtered[groupKey] = filteredItems
      }
    })

    return filtered
  }, [groupedItems, selectedCategories])

  // Get available categories for filtering
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    items.forEach((item) => {
      if (item.category) {
        categories.add(item.category)
      }
    })
    return Array.from(categories).sort()
  }, [items])

  // Pagination logic
  const shouldPaginate = items.length > 100
  const totalPages = shouldPaginate
    ? Math.ceil(Object.values(filteredGroups).flat().length / itemsPerPage)
    : 1

  const paginatedGroups = useMemo(() => {
    if (!shouldPaginate) {
      return filteredGroups
    }

    const allItems = Object.values(filteredGroups).flat()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedItems = allItems.slice(startIndex, endIndex)

    // Re-group paginated items
    const regrouped: Record<string, T[]> = {}
    paginatedItems.forEach((item) => {
      let groupKey = 'all'
      if (groupBy === 'category') {
        groupKey = item.category || 'uncategorized'
      } else if (groupBy === 'upcoming' && type === 'event') {
        const eventItem = item as unknown as Event
        if ('startDateTime' in eventItem) {
          const eventDate = new Date(eventItem.startDateTime)
          const now = new Date()
          groupKey = eventDate > now ? 'upcoming' : 'past'
        }
      } else if (groupBy === 'calendar_month' && type === 'sacrament-program') {
        const programItem = item as unknown as SacramentProgram
        if ('date' in programItem) {
          const programDate = new Date(programItem.date)
          groupKey = programDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })
        }
      }

      if (!regrouped[groupKey]) {
        regrouped[groupKey] = []
      }
      regrouped[groupKey].push(item)
    })

    return regrouped
  }, [filteredGroups, currentPage, itemsPerPage, shouldPaginate, groupBy, type])

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(category)) {
      newSelected.delete(category)
    } else {
      newSelected.add(category)
    }
    setSelectedCategories(newSelected)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
    setCurrentPage(1)
  }

  const hasActiveFilters = selectedCategories.size > 0
  const hasContent = Object.keys(paginatedGroups).length > 0
  const displayMessage = hasActiveFilters ? filterEmptyMessage : emptyMessage

  return (
    <div className="content-list">
      {(title || description) && (
        <div className="content-list__header">
          {title && <h2 className="content-list__title">{title}</h2>}
          {description && <p className="content-list__description">{description}</p>}
        </div>
      )}

      {showFilters && availableCategories.length > 0 && (
        <div className="content-list__filters">
          <button
            className="content-list__filters-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
          >
            Filter by category
            {selectedCategories.size > 0 && ` (${selectedCategories.size})`}
            <svg
              className={`content-list__filters-icon ${filtersOpen ? 'rotated' : ''}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {filtersOpen && (
            <div className="content-list__filters-content">
              <div className="content-list__filters-header">
                <h3 className="content-list__filters-title">Filter by category</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="content-list__filters-clear">
                    Clear {selectedCategories.size}{' '}
                    {selectedCategories.size === 1 ? 'filter' : 'filters'}
                  </button>
                )}
              </div>

              <div className="content-list__filters-options">
                {availableCategories.map((category) => {
                  const isActive = selectedCategories.has(category)
                  const count = items.filter((item) => item.category === category).length

                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`content-list__filter-option ${isActive ? 'active' : ''}`}
                      disabled={count === 0}
                    >
                      <span className="content-list__filter-label">
                        {getCategoryLabel(type, category)}
                      </span>
                      <span className="content-list__filter-count">({count})</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {!hasContent ? (
        <div className="content-list__empty">
          <p>{displayMessage}</p>
        </div>
      ) : (
        <div className="content-list__content">
          {Object.entries(paginatedGroups).map(([groupKey, groupItems]) => (
            <div key={groupKey} className="content-list__group">
              {groupBy !== 'none' && (
                <div className="content-list__group-header">
                  <h3 className="content-list__group-title">
                    {getGroupTitle(groupBy, groupKey, type)}
                  </h3>
                  {groupBy === 'category' && (
                    <p className="content-list__group-description">
                      {getCategoryDescription(type, groupKey)}
                    </p>
                  )}
                </div>
              )}

              <div className="content-list__items">
                {groupItems.slice(0, maxItemsPerGroup).map((item) => (
                  <Card key={item.id} type={type} data={item as unknown as ContentItem} />
                ))}
              </div>

              {groupItems.length > maxItemsPerGroup && (
                <p className="content-list__more">+{groupItems.length - maxItemsPerGroup} more</p>
              )}
            </div>
          ))}
        </div>
      )}

      {shouldPaginate && totalPages > 1 && (
        <div className="content-list__pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="content-list__pagination-btn"
          >
            Previous
          </button>

          <span className="content-list__pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="content-list__pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

// Helper functions
function getCategoryLabel(type: ContentType, category: string): string {
  if (type === 'announcement') {
    const labels: Record<string, string> = {
      'ward-business': 'Ward Business',
      activities: 'Activities',
      updates: 'Updates',
    }
    return labels[category] || category
  }
  return category
}

function getCategoryDescription(type: ContentType, category: string): string {
  if (type === 'announcement') {
    const descriptions: Record<string, string> = {
      'ward-business': 'Official leadership messages and callings.',
      activities: 'Recaps and details for ward gatherings.',
      updates: 'General news and community information.',
    }
    return descriptions[category] || ''
  }
  return ''
}

function getGroupTitle(groupBy: GroupBy, groupKey: string, type: ContentType): string {
  if (groupBy === 'upcoming') {
    return groupKey === 'upcoming' ? 'Upcoming Events' : 'Past Events'
  }
  if (groupBy === 'calendar_month') {
    return groupKey
  }
  if (groupBy === 'category') {
    return getCategoryLabel(type, groupKey)
  }
  return groupKey
}
