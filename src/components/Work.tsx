import { useState, useMemo, useRef, useEffect } from 'react'
import { projects, type Project } from '../data/projects'
import { CategoryFilter, type FilterCategory } from './work/CategoryFilter'
import { ProjectCard } from './work/ProjectCard'
import { ProjectDeck } from './work/ProjectDeck'
import { ProjectViewer } from './work/ProjectViewer'

export function Work() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isInView, setIsInView] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Filter projects based on activeCategory
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Category counts
  const categoryCounts = useMemo<Record<FilterCategory, number>>(() => {
    return {
      all: projects.length,
      video: projects.filter((p) => p.category === 'video').length,
      poster: projects.filter((p) => p.category === 'poster').length,
      photography: projects.filter((p) => p.category === 'photography').length,
    }
  }, [])

  // Navigation handlers inside ProjectViewer
  const currentProjectIndex = useMemo(() => {
    if (!selectedProject) return -1
    return filteredProjects.findIndex((p) => p.id === selectedProject.id)
  }, [selectedProject, filteredProjects])

  const handlePrevProject = () => {
    if (currentProjectIndex <= 0) {
      setSelectedProject(filteredProjects[filteredProjects.length - 1])
    } else {
      setSelectedProject(filteredProjects[currentProjectIndex - 1])
    }
  }

  const handleNextProject = () => {
    if (currentProjectIndex === -1 || currentProjectIndex >= filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[0])
    } else {
      setSelectedProject(filteredProjects[currentProjectIndex + 1])
    }
  }

  return (
    <section className={`section-work ${isInView ? 'is-in-view' : ''}`} id="work" ref={sectionRef}>
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-num">02 / 05</span>
            <span className="eyebrow-divider" aria-hidden="true">
              —
            </span>
            <span className="eyebrow-label">SELECTED WORK</span>
          </div>

          <h2 className="section-title">
            CURATED EDITS &amp;<br />
            VISUAL STORIES.
          </h2>

          <p className="section-lead">
            An interactive 3D flash-card showcase demonstrating cinematic video editing, rhythmic
            pacing, and high-impact visual direction. Browse through the deck or explore each piece
            in depth.
          </p>
        </div>

        {/* Toolbar: Category Filters & Presentation Switcher */}
        <div className="work-toolbar">
          <CategoryFilter
            activeCategory={activeCategory}
            counts={categoryCounts}
            onSelect={setActiveCategory}
          />

          <div className="view-mode-toggle" role="group" aria-label="Work presentation mode">
            <button
              type="button"
              className={`mode-btn ${viewMode === 'deck' ? 'is-active' : ''}`}
              onClick={() => setViewMode('deck')}
              title="Stacked 3D Flashcard Deck"
            >
              <span className="mode-icon">🗂</span>
              <span>3D FLASHCARD DECK</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Editorial Card Grid"
            >
              <span className="mode-icon">⊞</span>
              <span>EDITORIAL GRID</span>
            </button>
          </div>
        </div>

        {/* Presentation View 1: 3D Flashcard Deck */}
        {viewMode === 'deck' && (
          <div className="work-deck-view">
            <ProjectDeck
              projects={filteredProjects}
              onSelectProject={(project) => setSelectedProject(project)}
            />
          </div>
        )}

        {/* Presentation View 2: Editorial Grid of 3D Tilt Cards */}
        {viewMode === 'grid' && (
          <div className="work-grid-view">
            <div className="cards-asymmetric-grid">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Project Modal / Viewer */}
      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          hasPrev={filteredProjects.length > 1}
          hasNext={filteredProjects.length > 1}
        />
      )}
    </section>
  )
}

export default Work
