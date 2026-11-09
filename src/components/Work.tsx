import { useState } from 'react'

interface Project {
  id: number
  title: string
  category: 'video' | 'cinematic' | 'design'
  categoryLabel: string
  url: string
  description: string
  tags: string[]
  accent: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Fast Cut Montage',
    category: 'video',
    categoryLabel: 'Video / Short-form',
    url: 'https://www.instagram.com/reel/DZM4sRAv0Nq/',
    description:
      'High-energy, rhythmic cuts synchronized with punchy audio transitions, showcasing rapid pace manipulation and visual impact.',
    tags: ['Short-Form', 'Fast Cut', 'Sound Design'],
    accent: '#2b3a4a',
  },
  {
    id: 2,
    title: 'Travel Cinematography',
    category: 'cinematic',
    categoryLabel: 'Travel / Cinematic',
    url: 'https://www.instagram.com/reel/DUDjTxekvzZ/',
    description:
      'Atmospheric exploration reel capturing mood, subtle motion, ambient soundscapes, and cinematic landscape pacing.',
    tags: ['Cinematic', 'Travel', 'Pacing'],
    accent: '#394b3e',
  },
  {
    id: 3,
    title: 'Cinematic Film Tribute',
    category: 'cinematic',
    categoryLabel: 'Cinematic Tribute',
    url: 'https://www.instagram.com/reel/C26_534P3Dp/',
    description:
      'Curated cinematic sequence honoring emotive film storytelling, character framing, and dramatic tension.',
    tags: ['Film Tribute', 'Storytelling', 'Emotion'],
    accent: '#4a382b',
  },
  {
    id: 4,
    title: 'Effects-Based Cine Edit',
    category: 'video',
    categoryLabel: 'Effects / Editing',
    url: 'https://www.instagram.com/reel/C6Vv3LCP8O7/',
    description:
      'Dynamic transition-heavy visual edit combining speed ramps, seamless whip pans, and stylized audio mixing.',
    tags: ['VFX Editing', 'Transitions', 'Speed Ramps'],
    accent: '#34384a',
  },
  {
    id: 5,
    title: 'Christopher Nolan Tribute',
    category: 'cinematic',
    categoryLabel: 'Film Tribute',
    url: 'https://www.instagram.com/reel/Cr-BCvyoj8Q/',
    description:
      "Homage to Christopher Nolan's signature non-linear tension, orchestral momentum, and grand scale editing.",
    tags: ['Nolan', 'Cinema', 'Sound Sync'],
    accent: '#262f38',
  },
  {
    id: 6,
    title: 'Concert Edit',
    category: 'video',
    categoryLabel: 'Event / Concert',
    url: 'https://www.instagram.com/reel/DfSTY66vYt-/',
    description:
      'Electric live concert performance edit capturing crowd adrenaline, reactive stage lighting, and rhythmic beat sync.',
    tags: ['Live Event', 'Concert', 'Rhythm'],
    accent: '#472a3e',
  },
  {
    id: 7,
    title: 'Matchday Poster',
    category: 'design',
    categoryLabel: 'Graphic Design',
    url: 'https://www.instagram.com/p/Da9-40fj1id/',
    description:
      'Bold sports fixture poster design with high-impact typography, player isolation, and balanced contrast.',
    tags: ['Poster Art', 'Sports Design', 'Typography'],
    accent: '#3f382a',
  },
  {
    id: 8,
    title: 'Golden Turtle',
    category: 'design',
    categoryLabel: 'Graphic Design',
    url: 'https://www.instagram.com/p/Da_fcXsEtEa/',
    description:
      'Creative concept art exploring lighting, texture, and evocative minimalist visual composition.',
    tags: ['Concept Design', 'Visual Art', 'Composition'],
    accent: '#403d33',
  },
]

function Work() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'cinematic' | 'design'>('all')

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <section className="section-work" id="work">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-num">02 / 05</span>
            <span className="eyebrow-label">SELECTED WORK</span>
          </div>
          <h2 className="section-title">
            CURATED EDITS &<br />
            VISUAL STORIES.
          </h2>
          <p className="section-lead">
            A demonstration of visual storytelling, fast pacing, cinematic flow, and graphic design
            crafted for prospective clients worldwide.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="work-filters" role="tablist" aria-label="Filter projects by category">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
            role="tab"
            aria-selected={activeFilter === 'all'}
          >
            ALL PROJECTS <span className="filter-count">({projects.length})</span>
          </button>
          <button
            className={`filter-btn ${activeFilter === 'video' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('video')}
            role="tab"
            aria-selected={activeFilter === 'video'}
          >
            VIDEO & SHORT-FORM{' '}
            <span className="filter-count">
              ({projects.filter((p) => p.category === 'video').length})
            </span>
          </button>
          <button
            className={`filter-btn ${activeFilter === 'cinematic' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('cinematic')}
            role="tab"
            aria-selected={activeFilter === 'cinematic'}
          >
            CINEMATIC & TRIBUTES{' '}
            <span className="filter-count">
              ({projects.filter((p) => p.category === 'cinematic').length})
            </span>
          </button>
          <button
            className={`filter-btn ${activeFilter === 'design' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('design')}
            role="tab"
            aria-selected={activeFilter === 'design'}
          >
            GRAPHIC DESIGN{' '}
            <span className="filter-count">
              ({projects.filter((p) => p.category === 'design').length})
            </span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="work-grid">
          {filteredProjects.map((project, index) => (
            <article key={project.id} className="project-card">
              <div className="project-card-header">
                <span className="project-index">0{index + 1}</span>
                <span className="project-category-badge">{project.categoryLabel}</span>
              </div>

              <div className="project-card-visual" style={{ '--project-accent': project.accent } as React.CSSProperties}>
                <div className="visual-graphic">
                  <span className="visual-circle"></span>
                  <span className="visual-symbol">{project.category === 'design' ? '✦' : '▶'}</span>
                </div>
                <div className="visual-corner-tag">DeepInTales</div>
              </div>

              <div className="project-card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`View ${project.title} on Instagram`}
                  >
                    <span>{project.category === 'design' ? 'VIEW POSTER' : 'WATCH EDIT'}</span>
                    <span className="link-arrow">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Legal & Attribution notice per blueprint instructions */}
        <div className="work-notice">
          <span className="notice-icon">ℹ</span>
          <p>
            Client demonstration projects. Footage and music in cinematic tributes remain the property of
            original copyright holders. Edits shared directly via verified Instagram posts.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Work
