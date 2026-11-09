import React from 'react'
import devadathCharacter from '../assets/devadath-character.png'

function Hero() {
  return (
    <section className="hero" id="home">
      {/* Decorative circle behind portrait */}
      <div className="hero-circle" aria-hidden="true"></div>

      {/* Opening introduction */}
      <div className="hero-intro">
        <span>INDEPENDENT</span>
        <span>CREATIVE PORTFOLIO</span>
      </div>

      {/* Supporting captions */}
      <p className="hero-left-caption">EVERY FRAME HAS A STORY.</p>
      <p className="hero-right-caption">VIDEO EDITOR / VISUAL STORYTELLER</p>

      {/* Main black typography (behind portrait) */}
      <div className="hero-title-wrapper" aria-hidden="true">
        <h1 className="hero-title">PORTFOLIO.</h1>
      </div>

      {/* Devadathan's portrait — foreground */}
      <div className="hero-character">
        <img
          src={devadathCharacter}
          alt="Devadathan R - Video Editor & Visual Storyteller"
          className="hero-character-image"
        />
      </div>

      {/* White typography clipped to exact portrait silhouette */}
      <div
        className="hero-portrait-title-overlay"
        aria-hidden="true"
        style={
          {
            '--portrait-mask': `url("${devadathCharacter}")`,
          } as React.CSSProperties
        }
      >
        <div className="hero-title-canvas">
          <div className="hero-title-wrapper">
            <h1 className="hero-title hero-title-white">PORTFOLIO.</h1>
          </div>
        </div>
      </div>

      {/* Personal identity block */}
      <div className="hero-name">
        <span className="name-line" aria-hidden="true"></span>
        <h2>DEVADATHAN R</h2>
        <p>
          CRAFTING STORIES<br />
          THROUGH VISUALS.
        </p>
      </div>

      {/* Scroll indicator */}
      <a href="#work" className="scroll-indicator" aria-label="Scroll to explore selected work">
        <span>SCROLL TO EXPLORE</span>
        <span className="scroll-arrow">↓</span>
      </a>

      {/* Footer status line */}
      <div className="hero-footer">
        <span>01 / 05</span>
        <div className="footer-line" aria-hidden="true">
          <span></span>
        </div>
        <span>KOLLAM, INDIA</span>
      </div>
    </section>
  )
}

export default Hero
