import React, { useRef, useState, useCallback } from 'react'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  index?: number
  isActive?: boolean
  isStacked?: boolean
  stackOffset?: number
  onSelect: (project: Project) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive = false,
  isStacked = false,
  stackOffset = 0,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left // 0 to width
    const y = e.clientY - rect.top // 0 to height
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max tilt angles in degrees
    const maxTilt = 8
    const rotateY = ((x - centerX) / centerX) * maxTilt
    const rotateX = -((y - centerY) / centerY) * maxTilt
    const glareX = ((x / rect.width) * 100).toFixed(1)
    const glareY = ((y / rect.height) * 100).toFixed(1)

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) translateZ(16px) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      '--card-glare-x': `${glareX}%`,
      '--card-glare-y': `${glareY}%`,
    } as React.CSSProperties)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      '--card-glare-x': '50%',
      '--card-glare-y': '50%',
    } as React.CSSProperties)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(project)
    }
  }

  // Calculate stack positioning if rendered in stacked deck mode
  const stackStyle: React.CSSProperties = isStacked
    ? {
        transform: `translateY(${stackOffset * 14}px) scale(${1 - stackOffset * 0.04}) rotate(${
          stackOffset % 2 === 0 ? stackOffset * 1.5 : -stackOffset * 1.5
        }deg)`,
        zIndex: 20 - stackOffset,
        opacity: Math.max(0.35, 1 - stackOffset * 0.22),
      }
    : {}

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}, ${project.categoryLabel}`}
      className={`project-flash-card ${isActive ? 'is-active' : ''} ${
        isHovered ? 'is-hovered' : ''
      } ${isStacked ? 'is-stacked' : ''}`}
      style={{ ...stackStyle, ...tiltStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      data-category={project.category}
    >
      {/* Top Editorial Index & Meta Bar */}
      <div className="card-top-bar">
        <span className="card-num">{project.number}</span>
        <span className="card-category-pill">{project.categoryLabel}</span>
        <span className="card-year">{project.year}</span>
      </div>

      {/* Visual Canvas / Thumbnail Area */}
      <div className="card-visual-wrapper">
        {project.category === 'video' && project.mediaSource && isHovered ? (
          <video
            src={project.mediaSource}
            className="card-thumbnail-image card-video-preview"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={project.accessibilityText}
            className="card-thumbnail-image"
            loading="lazy"
          />
        )}

        <div className="card-overlay-indicator">
          <span className="card-action-cue">
            {project.category === 'video' ? '▶ PLAY EDIT' : 'EXPAND ART ↗'}
          </span>
        </div>

        {/* Media type badge */}
        <div className="card-type-tag">
          {project.category === 'video' && <span className="type-badge-icon">▶</span>}
          <span>{project.aspectRatio}</span>
          {project.duration && <span> • {project.duration}</span>}
        </div>
      </div>

      {/* Editorial Content / Description */}
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-visual-summary">{project.visualSummary}</p>

        {/* Tags */}
        <div className="card-tags">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="card-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Base Bar */}
      <div className="card-footer">
        <span className="card-indicator-text">CLICK TO EXPAND DETAILS</span>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </div>
  )
}

export default ProjectCard
