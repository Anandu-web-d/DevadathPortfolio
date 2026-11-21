import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      const scrollY = window.scrollY
      // Track length gives smooth camera-like zoom travel
      const zoomDistance = window.innerHeight * 0.85
      const progress = Math.min(Math.max(scrollY / zoomDistance, 0), 1)
      setScrollProgress(progress)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Scroll-driven pinned hero track */}
        <div className="hero-scroll-track">
          <div className="hero-sticky-frame">
            <Hero scrollProgress={scrollProgress} />
          </div>
        </div>
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
