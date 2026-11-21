import { useState, useEffect, useRef } from 'react'

function About() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [counts, setCounts] = useState({ years: 0, projects: 0, commitment: 0 })
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.25 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    const duration = 1400 // ms
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)

      setCounts({
        years: Math.floor(ease * 6),
        projects: Math.floor(ease * 150),
        commitment: Math.floor(ease * 100),
      })

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCounts({ years: 6, projects: 150, commitment: 100 })
      }
    }

    requestAnimationFrame(step)
  }, [hasAnimated])

  return (
    <section className="section-about" id="about">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-num">04 / 05</span>
            <span className="eyebrow-label">ABOUT DEVADATHAN</span>
          </div>
          <h2 className="section-title">
            DEEPINTALES —<br />
            BEHIND THE CUTS.
          </h2>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Main Story & Philosophy */}
          <div className="about-narrative">
            <h3 className="narrative-heading">
              A visual storyteller who treats editing as an evolving canvas, not a repetitive formula.
            </h3>
            <p>
              Operating under the creative banner of <strong>DeepInTales</strong>, I am Devadathan R—a
              freelance video editor, graphic designer, and aspiring cinematographer based in{' '}
              <strong>Kollam, Kerala, India</strong>.
            </p>
            <p>
              My journey behind the timeline began around <strong>2020</strong>. Over approximately six
              years of cutting footage, I have developed an instinct for visual rhythm, pacing, and
              emotional arc. Rather than committing strictly to one rigid style, I enjoy experimenting
              with what each piece of footage demands—whether that means an adrenaline-fueled fast-cut
              montage, a patient cinematic travel essay, or a minimalist tribute.
            </p>
            <p>
              Cinematic video editing and storytelling remain my strongest discipline, supported by
              hands-on work in graphic design and photography. When not cutting timelines, I explore
              framing and light through photography, continually studying visual aesthetics for
              cinematography.
            </p>

            <div className="about-quote">
              <span className="quote-mark">“</span>
              <p>
                Every frame has a story. Editing is the art of giving that story its pulse and heartbeat.
              </p>
            </div>
          </div>

          {/* Quick Facts & Toolkit Sidebar */}
          <aside className="about-sidebar">
            <div className="sidebar-card">
              <h4 className="sidebar-title">CLIENT FACTS & DETAILS</h4>
              <dl className="facts-list">
                <div className="fact-item">
                  <dt>NAME / BRAND</dt>
                  <dd>Devadathan R / DeepInTales</dd>
                </div>
                <div className="fact-item">
                  <dt>LOCATION</dt>
                  <dd>Kollam, Kerala, India</dd>
                </div>
                <div className="fact-item">
                  <dt>EXPERIENCE</dt>
                  <dd>~6 Years (Started ~2020)</dd>
                </div>
                <div className="fact-item">
                  <dt>PRIMARY FOCUS</dt>
                  <dd>Cinematic Video Editing & Storytelling</dd>
                </div>
                <div className="fact-item">
                  <dt>ADDITIONAL DISCIPLINES</dt>
                  <dd>Graphic Design, Photography, Cinematography</dd>
                </div>
                <div className="fact-item">
                  <dt>STYLE RANGE</dt>
                  <dd>Fast-Paced, Cinematic, Minimalist, Energetic, Clean</dd>
                </div>
              </dl>
            </div>

            <div className="sidebar-card toolkit-card">
              <h4 className="sidebar-title">CREATIVE TOOLKIT</h4>
              <div className="toolkit-pills">
                <span className="tool-pill">Adobe Premiere Pro</span>
                <span className="tool-pill">Adobe After Effects</span>
                <span className="tool-pill">DaVinci Resolve</span>
                <span className="tool-pill">Adobe Photoshop</span>
                <span className="tool-pill">Adobe Illustrator</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Milestone Numbers */}
        <div className="about-stats" ref={statsRef}>
          <div className="stat-box">
            <span className="stat-number">{hasAnimated ? `${counts.years}+` : '6+'}</span>
            <span className="stat-label">YEARS EDITING EXPERIENCE</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{hasAnimated ? `${counts.projects}+` : '150+'}</span>
            <span className="stat-label">PROJECTS & EDITS CRAFTED</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{hasAnimated ? `${counts.commitment}%` : '100%'}</span>
            <span className="stat-label">COMMITTED TO STORYTELLING</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">GLOBAL</span>
            <span className="stat-label">LOCAL & INTERNATIONAL CLIENTS</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
