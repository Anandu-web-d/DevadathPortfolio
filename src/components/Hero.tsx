import React, { useState, useEffect, useRef, useCallback } from 'react'
import devadathCharacter from '../assets/devadath-character.png'
import devadathPixar from '../assets/devadath-pixar.png'

interface HeroProps {
  scrollProgress?: number
}

export function Hero({ scrollProgress = 0 }: HeroProps) {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [pixarLoaded, setPixarLoaded] = useState(false)
  const [introPhase, setIntroPhase] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 4
    }
    return 1
  })
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const [internalScrollProgress, setInternalScrollProgress] = useState(0)

  // Interactive Reveal States & Refs
  const wrapRef = useRef<HTMLDivElement>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isManualRevealed, setIsManualRevealed] = useState(false)
  const animFrameRef = useRef<number | null>(null)
  const isPointerInside = useRef(false)
  const isTouchActive = useRef(false)
  const targetPos = useRef({ x: -999, y: -999, radius: 0 })
  const currentPos = useRef({ x: -999, y: -999, radius: 0 })

  // Preload and verify character assets
  useEffect(() => {
    let loadedCount = 0
    const checkComplete = () => {
      loadedCount++
      if (loadedCount >= 2) {
        setPhotoLoaded(true)
        setPixarLoaded(true)
      }
    }

    const img1 = new Image()
    img1.src = devadathCharacter
    if (img1.complete) checkComplete()
    else img1.onload = checkComplete

    const img2 = new Image()
    img2.src = devadathPixar
    if (img2.complete) checkComplete()
    else img2.onload = checkComplete
  }, [])

  // Coordinated entrance choreography
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const t1 = window.setTimeout(() => setIntroPhase(2), 450)
    const t2 = window.setTimeout(() => setIntroPhase(3), 1000)
    const t3 = window.setTimeout(() => setIntroPhase(4), 1600)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [])

  // Track window scroll for camera-like zoom if parent didn't supply it
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const heroHeight = rect.height || window.innerHeight
      const currentScroll = Math.max(0, -rect.top)
      const progress = Math.min(Math.max(currentScroll / heroHeight, 0), 1)
      setInternalScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const effectiveScroll = scrollProgress > 0 ? scrollProgress : internalScrollProgress

  // Subtle interactive cursor parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const { innerWidth, innerHeight } = window
    const normX = (e.clientX / innerWidth) * 2 - 1
    const normY = (e.clientY / innerHeight) * 2 - 1
    setMouseOffset({ x: normX, y: normY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 })
  }, [])

  // Smooth 60/120fps requestAnimationFrame lerp loop for the cursor reveal mask
  const updateRevealRef = useRef<(() => void) | null>(null)
  const updateReveal = useCallback(() => {
    const el = wrapRef.current
    if (el) {
      const factor = 0.24
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * factor
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * factor
      currentPos.current.radius += (targetPos.current.radius - currentPos.current.radius) * factor

      el.style.setProperty('--mask-x', `${currentPos.current.x.toFixed(1)}px`)
      el.style.setProperty('--mask-y', `${currentPos.current.y.toFixed(1)}px`)
      el.style.setProperty('--mask-radius', `${currentPos.current.radius.toFixed(1)}px`)
    }

    if (isPointerInside.current || isTouchActive.current || currentPos.current.radius > 0.5) {
      animFrameRef.current = requestAnimationFrame(() => updateRevealRef.current?.())
    } else {
      animFrameRef.current = null
    }
  }, [])
  useEffect(() => {
    updateRevealRef.current = updateReveal
  }, [updateReveal])

  const getDesiredRadius = useCallback(() => {
    if (!wrapRef.current) return 105
    const rect = wrapRef.current.getBoundingClientRect()
    return Math.min(Math.max(rect.width * 0.14, 90), 120)
  }, [])

  // Desktop Pointer Events (relative to image container)
  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return // handled by touch listeners
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!wrapRef.current) return

    isPointerInside.current = true
    setIsRevealing(true)
    const rect = wrapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const radius = getDesiredRadius()

    targetPos.current = { x, y, radius }
    if (!animFrameRef.current) {
      currentPos.current.x = x
      currentPos.current.y = y
      animFrameRef.current = requestAnimationFrame(updateReveal)
    }
  }, [getDesiredRadius, updateReveal])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    if (!isPointerInside.current || !wrapRef.current) return

    const rect = wrapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    targetPos.current.x = x
    targetPos.current.y = y
    targetPos.current.radius = getDesiredRadius()

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateReveal)
    }
  }, [getDesiredRadius, updateReveal])

  const handlePointerLeave = useCallback(() => {
    isPointerInside.current = false
    targetPos.current.radius = 0
    setIsRevealing(false)
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateReveal)
    }
  }, [updateReveal])

  // Mobile Touch Events (touch and drag to reveal, release to return; scrolling remains usable)
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0 || !wrapRef.current) return
    isTouchActive.current = true
    setIsRevealing(true)
    const touch = e.touches[0]
    const rect = wrapRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const radius = Math.min(Math.max(rect.width * 0.14, 85), 115)

    targetPos.current = { x, y, radius }
    currentPos.current.x = x
    currentPos.current.y = y
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateReveal)
    }
  }, [updateReveal])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchActive.current || e.touches.length === 0 || !wrapRef.current) return
    const touch = e.touches[0]
    const rect = wrapRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    targetPos.current.x = x
    targetPos.current.y = y
    targetPos.current.radius = Math.min(Math.max(rect.width * 0.14, 85), 115)

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateReveal)
    }
  }, [updateReveal])

  const handleTouchEnd = useCallback(() => {
    isTouchActive.current = false
    targetPos.current.radius = 0
    setIsRevealing(false)
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateReveal)
    }
  }, [updateReveal])

  // Accessible / Reduced motion manual toggle
  const toggleManualReveal = useCallback(() => {
    setIsManualRevealed((prev) => !prev)
  }, [])

  // Dynamic zoom transforms based on scroll
  const circleScale = 1 + effectiveScroll * 0.5
  const circleBrightness = Math.max(0.4, 1 - effectiveScroll * 0.4)
  const typographyScale = 1 + effectiveScroll * 0.2
  const typographyOpacity = 1
  const portraitScale = 1 + effectiveScroll * 0.15
  const portraitY = effectiveScroll * 50
  const portraitOpacity = 1
  const hudOpacity = Math.max(0, 1 - effectiveScroll * 2.5)

  const isLoaded = photoLoaded && pixarLoaded

  return (
    <section
      className={`hero-cinematic phase-${introPhase} ${isLoaded ? 'is-loaded' : ''}`}
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 01. Studio Architecture & Deep Charcoal Background Layer */}
      <div className="hero-dark-canvas" aria-hidden="true">
        <div className="canvas-vignette" />
        <div className="canvas-subtle-grid" />
        <div className="canvas-film-grain" />
      </div>

      {/* 02. Ambient Warm Amber & Orange Cinematic Glows */}
      <div
        className="hero-ambient-lighting"
        aria-hidden="true"
        style={{
          transform: `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -14}px, 0)`,
        }}
      >
        <div className="light-core-amber" />
        <div className="light-rim-orange" />
      </div>

      {/* 03. Large Illuminated Circular Frame Behind the Subject */}
      <div
        className="hero-circular-stage"
        style={{
          transform: `translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -8}px, 0) scale(${circleScale})`,
          opacity: circleBrightness,
        }}
      >
        <div className="circular-frame-halo" />
        <div className="circular-frame-disc">
          <div className="circle-inner-gradient" />
          <div className="circle-rim-glow" />
          <div className="circle-depth-shadow" />
        </div>
      </div>

      {/* 04. Extremely Large Elegant Serif Typography reading: PORTFOLIO. */}
      {/* Background Typography Layer (passes behind portrait) */}
      <div
        className="hero-title-stage title-layer-behind"
        style={{
          transform: `translate3d(0, -50%, 0) translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px, 0) scale(${typographyScale})`,
          opacity: introPhase >= 3 ? typographyOpacity : 0,
        }}
        aria-hidden="true"
      >
        <h1 className="hero-serif-title">
          <span className="serif-lettering">PORTFOLIO</span>
          <span className="serif-dot">.</span>
        </h1>
      </div>

      {/* 05. Devadathan's Actual Portrait Asset & Interactive 3D Reveal */}
      <div
        className="hero-portrait-stage"
        style={{
          transform: `translate3d(calc(-50% + ${mouseOffset.x * -10}px), ${mouseOffset.y * -8 + portraitY}px, 0) scale(${portraitScale})`,
          opacity: introPhase >= 3 ? portraitOpacity : 0,
        }}
      >
        <div
          ref={wrapRef}
          className={`portrait-wrap ${isRevealing ? 'is-revealing' : ''} ${
            isManualRevealed ? 'is-manual-revealed' : ''
          }`}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Subtle Warm Silhouette Rim Backlight */}
          <div className="portrait-rim-light" aria-hidden="true" />

          {/* LAYER 1 — Genuine Devadathan Original Photograph (Default Base Layer) */}
          <img
            src={devadathCharacter}
            alt="Devadathan R — Video Editor & Visual Storyteller"
            className="portrait-image-authentic"
            onLoad={() => setPhotoLoaded(true)}
            loading="eager"
            draggable={false}
          />

          {/* LAYER 2 — Stylised 3D Pixar Character (Interactive Reveal Layer) */}
          <div
            className={`portrait-pixar-overlay ${isManualRevealed ? 'is-full-reveal' : ''}`}
            aria-hidden={!isManualRevealed}
          >
            <img
              src={devadathPixar}
              alt="Devadathan R — 3D Pixar Character Interpretation"
              className="portrait-image-authentic portrait-image-pixar"
              onLoad={() => setPixarLoaded(true)}
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Ripple ring effect */}
          <div
            className="portrait-ripple-ring"
            aria-hidden="true"
          />

          {/* Subtle Warm Glow Following Reveal Boundary */}
          <div
            className={`portrait-reveal-glow ${isRevealing && !isManualRevealed ? 'is-visible' : ''}`}
            aria-hidden="true"
          />

          {/* Interactive Cue & Accessible / Mobile Toggle Chip */}
          <div className="portrait-glass-cue">
            <button
              type="button"
              className={`portrait-glass-chip ${isManualRevealed ? 'is-active' : ''}`}
              onClick={toggleManualReveal}
              aria-label={
                isManualRevealed
                  ? 'Switch back to original photograph'
                  : 'Toggle 3D Pixar character interpretation'
              }
              aria-pressed={isManualRevealed}
            >
              <span className="chip-sparkle" aria-hidden="true">✦</span>
              <span className="chip-text">
                {isManualRevealed ? 'REAL PHOTO' : 'PIXAR 3D'}
              </span>
            </button>
            <span className="portrait-hint-text">
              Hover or drag to reveal
            </span>
          </div>
        </div>
      </div>

      {/* 06. Foreground Blended Typography Layer (shows full word, blending across character) */}
      <div
        className="hero-title-stage title-layer-blend"
        style={{
          transform: `translate3d(0, -50%, 0) translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px, 0) scale(${typographyScale})`,
          opacity: introPhase >= 3 ? typographyOpacity : 0,
        }}
        aria-hidden="true"
      >
        <div className="hero-serif-title">
          <span className="serif-lettering">PORTFOLIO</span>
          <span className="serif-dot">.</span>
        </div>
      </div>

      {/* Accessible Screen Reader Heading */}
      <h1 className="sr-only">PORTFOLIO. — Devadathan R, Video Editor & Visual Storyteller</h1>

      {/* 06. Supporting Interface Elements (Stacked Above Canvas) */}
      <div className="hero-hud-layer" style={{ opacity: introPhase >= 4 ? hudOpacity : 0 }}>
        {/* LEFT SUPPORTING INFORMATION */}
        <div className="hero-left-col">
          <div className="hero-author-identity">
            <span className="author-name">DEVADATHAN R</span>
            <span className="author-role">VIDEO EDITOR / VISUAL STORYTELLER</span>
          </div>

          <div className="hero-cta-actions">
            <a href="#work" className="action-btn-primary">
              <span>VIEW WORK</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#about" className="action-btn-ghost">
              <span>ABOUT ME</span>
            </a>
          </div>
        </div>

        {/* RIGHT SUPPORTING INFORMATION — Minimal Section Indicator */}
        

        {/* BOTTOM SUPPORTING DETAILS & SOCIALS */}
        <footer className="hero-bottom-bar">
          <div className="hero-geo-tag">
            <span className="geo-icon" aria-hidden="true">◉</span>
            <span className="geo-text">KOLLAM, INDIA.</span>
          </div>

          <a href="#work" className="hero-scroll-prompt" aria-label="Scroll to explore selected work">
            <span className="scroll-caption">SCROLL TO EXPLORE</span>
            <span className="scroll-chevron" aria-hidden="true">↓</span>
          </a>

          <div className="hero-social-links">
            <a
              href="https://www.instagram.com/deepintales/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              Instagram <span className="pill-arrow">↗</span>
            </a>
            <a
              href="https://youtube.com/@deepintales"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              YouTube <span className="pill-arrow">↗</span>
            </a>
            <a
              href="https://www.behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              Behance <span className="pill-arrow">↗</span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Hero
