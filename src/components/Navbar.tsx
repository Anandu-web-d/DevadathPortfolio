import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['home', 'work', 'services', 'about', 'contact']
      const current = sections.find((id) => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          DEVADATHAN.
        </a>

        <div className="nav-links">
          <a
            href="#work"
            className={`nav-link ${activeSection === 'work' ? 'is-active' : ''}`}
          >
            WORK
          </a>
          <a
            href="#services"
            className={`nav-link ${activeSection === 'services' ? 'is-active' : ''}`}
          >
            SERVICES
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' ? 'is-active' : ''}`}
          >
            ABOUT
          </a>
          <a
            href="#contact"
            className={`nav-link nav-contact ${activeSection === 'contact' ? 'is-active' : ''}`}
          >
            CONTACT <span className="nav-arrow">↗</span>
          </a>
        </div>

        <button
          className={`nav-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav-menu">
          <a
            href="#home"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </a>
          <a
            href="#work"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            WORK
          </a>
          <a
            href="#services"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            SERVICES
          </a>
          <a
            href="#about"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            ABOUT
          </a>
          <a
            href="#contact"
            className="mobile-nav-link mobile-contact-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT ↗
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
