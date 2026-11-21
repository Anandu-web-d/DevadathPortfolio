
import devadathCharacter from '../assets/devadath-character.png'

function Hero() {
  return (
    <section className="hero" id="home">

      {/* Background circle */}
      <div className="hero-circle"></div>

      {/* Opening introduction */}
      <div className="hero-intro">
        <span>INDEPENDENT</span>
        <span>CREATIVE PORTFOLIO</span>
      </div>

      {/* Supporting captions */}
      <p className="hero-left-caption">
        EVERY FRAME HAS A STORY.
      </p>

      <p className="hero-right-caption">
        VIDEO EDITOR / VISUAL STORYTELLER
      </p>

      {/* Main typography */}
      <div className="hero-title-wrapper">
        <h1 className="hero-title">PORTFOLIO.</h1>
      </div>

      {/* Devadathan's portrait */}
      {/* Character in front of the typography */}
  
      {/* Character and typography interaction */}
      {/* Devadathan's portrait */}
    {/* Devadathan's portrait — foreground */}
<div className="hero-character">
  <img
    src={devadathCharacter}
    alt="Devadathan R"
    className="hero-character-image"
  />
</div>

{/* White typography — aligned to the full hero */}
<div
  className="hero-title-mask"
  aria-hidden="true"
  style={{
    '--portrait-mask': `url("${devadathCharacter}")`,
  } as React.CSSProperties}
>
  <h1 className="hero-title">PORTFOLIO.</h1>
</div>

    

      {/* Personal identity */}
      <div className="hero-name">
        <span className="name-line"></span>
        <h2>DEVADATHAN R</h2>
        <p>
          CRAFTING STORIES<br />
          THROUGH VISUALS.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>SCROLL TO EXPLORE</span>
        <span className="scroll-arrow">↓</span>
      </div>

      {/* Footer */}
      <div className="hero-footer">
        <span>01 / 05</span>

        <div className="footer-line">
          <span></span>
        </div>

        <span>KOLLAM, INDIA</span>
      </div>

    </section>
  )
}

export default Hero
