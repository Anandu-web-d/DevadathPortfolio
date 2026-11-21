import React from 'react'

export type FilterCategory = 'all' | 'video' | 'poster' | 'photography'

interface CategoryFilterProps {
  activeCategory: FilterCategory
  counts: Record<FilterCategory, number>
  onSelect: (category: FilterCategory) => void
}

const CATEGORY_ITEMS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'ALL WORK' },
  { id: 'video', label: 'VIDEOS' },
  { id: 'poster', label: 'POSTERS' },
  { id: 'photography', label: 'PHOTOGRAPHY' },
]

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  counts,
  onSelect,
}) => {
  return (
    <div className="category-filter-bar" role="tablist" aria-label="Filter projects by category">
      {CATEGORY_ITEMS.map((item) => {
        const count = counts[item.id] ?? 0
        const isActive = activeCategory === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-pill ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="category-label">{item.label}</span>
            <span className="category-badge">({count})</span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
