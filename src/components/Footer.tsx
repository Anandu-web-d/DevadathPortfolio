function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="section-container footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <h3 className="footer-logo">DEVADATHAN R.</h3>
            <p className="footer-brand-sub">DEEPINTALES • VISUAL STORYTELLER</p>
            <p className="footer-quote">EVERY FRAME HAS A STORY.</p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-heading">NAVIGATION</span>
            <ul className="footer-links">
              <li>
                <a href="#home">01 / HOME</a>
              </li>
              <li>
                <a href="#work">02 / WORK</a>
              </li>
              <li>
                <a href="#services">03 / SERVICES</a>
              </li>
              <li>
                <a href="#about">04 / ABOUT</a>
              </li>
              <li>
                <a href="#contact">05 / CONTACT</a>
              </li>
            </ul>
          </div>

          <div className="footer-connect-col">
            <span className="footer-heading">CONNECT</span>
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.instagram.com/deepintales/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@deepintales"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YOUTUBE ↗
                </a>
              </li>
              <li>
                <a href="mailto:deepintales@gmail.com">EMAIL DIRECT ↗</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Devadathan R. All Rights Reserved. Operating under DeepInTales.
          </div>

          <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <span className="top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
