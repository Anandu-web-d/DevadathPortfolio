import React, { useState, useRef, useEffect, useCallback } from 'react'
import type { Project } from '../../data/projects'
import ProjectCard from './ProjectCard'

interface ProjectDeckProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export const ProjectDeck: React.FC<ProjectDeckProps> = ({ projects, onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const total = projects.length
  // Safely clamp active index within bounds without needing an effect
  const safeIndex = total > 0 ? currentIndex % total : 0

  const handleNext = useCallback(() => {
    if (total === 0) return
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    if (total === 0) return
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Keyboard navigation for deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // Touch handlers for swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const swipeThreshold = 50
    if (diff > swipeThreshold) {
      handleNext()
    } else if (diff < -swipeThreshold) {
      handlePrev()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  if (total === 0) {
    return (
      <div className="empty-deck-notice">
        <p>No projects found in this category.</p>
      </div>
    )
  }

  // Get active item and trailing stack items (up to 3 behind)
  const activeProject = projects[safeIndex]

  // Render stacked cards
  const stackItems = []
  const maxStack = Math.min(3, total - 1)
  for (let offset = 1; offset <= maxStack; offset++) {
    const projectIndex = (safeIndex + offset) % total
    stackItems.push({
      project: projects[projectIndex],
      offset,
    })
  }

  return (
    <div
      className="project-deck-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive 3D Project Deck"
    >
      {/* Deck Controls Header */}
      <div className="deck-control-bar">
        <div className="deck-counter-indicator">
          <span className="deck-counter-label">DECK SEQUENCE</span>
          <span className="deck-counter-values">
            <strong>{activeProject.number}</strong> / {projects[projects.length - 1].number}
          </span>
        </div>

        <div className="deck-nav-buttons">
          <button
            type="button"
            className="deck-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous project card"
            title="Previous (Arrow Left)"
          >
            ← PREV
          </button>
          <button
            type="button"
            className="deck-nav-btn next-btn"
            onClick={handleNext}
            aria-label="Next project card"
            title="Next (Arrow Right)"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* 3D Stack Stage */}
      <div className="deck-3d-stage">
        {/* Background stack cards (rendered first for z-index order) */}
        {stackItems.reverse().map(({ project, offset }) => (
          <div
            key={project.id}
            className="deck-stack-wrapper"
            style={{
              zIndex: 10 - offset,
              transform: `translate3d(${offset * 18}px, ${offset * 12}px, -${offset * 40}px) rotate(${
                offset * 2.2
              }deg)`,
              opacity: Math.max(0.3, 1 - offset * 0.28),
              pointerEvents: 'none',
            }}
          >
            <ProjectCard
              project={project}
              index={offset}
              isStacked={true}
              stackOffset={offset}
              onSelect={() => onSelectProject(project)}
            />
          </div>
        ))}

        {/* Foreground active card */}
        <div className="deck-primary-wrapper" style={{ zIndex: 20 }}>
          <ProjectCard
            project={activeProject}
            index={safeIndex}
            isActive={true}
            onSelect={onSelectProject}
          />
        </div>
      </div>

      {/* Swipe & Interaction Notice for Mobile / Desktop */}
      <div className="deck-footer-hint">
        <span className="hint-desktop">Use arrow keys or click next to cycle • Click card to expand</span>
        <span className="hint-mobile">Swipe left/right to browse • Tap card to expand</span>
      </div>
    </div>
  )
}

export default ProjectDeck
