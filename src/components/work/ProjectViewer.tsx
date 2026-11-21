import React, { useEffect } from 'react'
import type { Project } from '../../data/projects'
import VideoPlayer from './VideoPlayer'

interface ProjectViewerProps {
  project: Project
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
}) => {
  // Prevent background scrolling when open & handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onPrev()
      } else if (e.key === 'ArrowRight') {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="project-viewer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
      onClick={onClose}
    >
      <div
        className="project-viewer-panel"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking panel
      >
        {/* Top Header Bar */}
        <div className="viewer-top-bar">
          <div className="viewer-meta-left">
            <span className="viewer-project-num">{project.number}</span>
            <span className="viewer-category-tag">{project.categoryLabel}</span>
            <span className="viewer-year-tag">{project.year}</span>
          </div>

          <div className="viewer-actions-right">
            <button
              type="button"
              className="viewer-nav-step-btn"
              onClick={onPrev}
              aria-label="Previous project"
              title="Previous (Arrow Left)"
            >
              ← PREV
            </button>
            <button
              type="button"
              className="viewer-nav-step-btn"
              onClick={onNext}
              aria-label="Next project"
              title="Next (Arrow Right)"
            >
              NEXT →
            </button>
            <button
              type="button"
              className="viewer-close-btn"
              onClick={onClose}
              aria-label="Close project modal"
              title="Close (Escape)"
            >
              ✕ CLOSE
            </button>
          </div>
        </div>

        {/* Media Presentation Section */}
        <div className="viewer-media-stage">
          {project.category === 'video' ? (
            <VideoPlayer project={project} onClose={onClose} />
          ) : (
            <div className="viewer-image-stage">
              <img
                src={project.thumbnail}
                alt={project.accessibilityText}
                className="viewer-main-image"
              />
              <div className="viewer-image-caption">
                <span>{project.title}</span> — <span>{project.visualSummary}</span>
              </div>
            </div>
          )}
        </div>

        {/* Editorial Narrative & Specs Section */}
        <div className="viewer-details-grid">
          <div className="viewer-info-col">
            <h2 id="viewer-title" className="viewer-title">
              {project.title}
            </h2>
            <p className="viewer-description">{project.description}</p>

            <div className="viewer-links">
              <a
                href={project.externalProjectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="viewer-cta-btn"
              >
                OPEN ON INSTAGRAM ↗
              </a>
            </div>
          </div>

          <div className="viewer-specs-col">
            <div className="spec-row">
              <span className="spec-label">CLIENT / THEME</span>
              <span className="spec-value">{project.clientOrTheme}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ROLE</span>
              <span className="spec-value">{project.role}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">FORMAT</span>
              <span className="spec-value">
                {project.aspectRatio}
                {project.duration ? ` • ${project.duration}` : ''}
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">TAGS</span>
              <div className="viewer-tags-list">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="viewer-tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectViewer
