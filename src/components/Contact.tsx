import { useState } from 'react'

function Contact() {
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'cinematic',
    budget: 'flexible',
    message: '',
  })

  const emailAddress = 'deepintales@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Project Enquiry from ${formData.name || 'Client'} - DeepInTales`
    )
    const body = encodeURIComponent(
      `Hi Devadathan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nBudget Range: ${formData.budget}\n\nProject Details:\n${formData.message}\n`
    )
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
    setFormSubmitted(true)
  }

  return (
    <section className="section-contact" id="contact">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-num">05 / 05</span>
            <span className="eyebrow-label">GET IN TOUCH</span>
          </div>
          <h2 className="section-title">
            LET'S CRAFT YOUR<br />
            NEXT STORY.
          </h2>
          <p className="section-lead">
            Whether you need a high-retention social edit, a cinematic documentary sequence, or a
            custom design, feel free to reach out. Open for local and international collaborations.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Direct Channels */}
          <div className="contact-channels">
            <div className="channel-card email-channel">
              <span className="channel-label">DIRECT EMAIL</span>
              <div className="email-row">
                <a href={`mailto:${emailAddress}`} className="email-address">
                  {emailAddress}
                </a>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? 'COPIED ✓' : 'COPY EMAIL'}
                </button>
              </div>
              <p className="channel-note">Direct response within 24–48 business hours.</p>
            </div>

            <div className="channel-card">
              <span className="channel-label">SOCIAL CHANNELS</span>
              <ul className="social-links-list">
                <li>
                  <a
                    href="https://www.instagram.com/deepintales/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <div>
                      <span className="social-name">Instagram</span>
                      <span className="social-handle">@deepintales</span>
                    </div>
                    <span className="social-arrow">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@deepintales"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <div>
                      <span className="social-name">YouTube</span>
                      <span className="social-handle">@deepintales</span>
                    </div>
                    <span className="social-arrow">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="channel-card location-channel">
              <span className="channel-label">LOCATION &amp; BASE</span>
              <p className="location-name">Kollam, Kerala, India</p>
              <p className="timezone-note">Working with clients across IST, UTC, EST, and GMT timezones.</p>
            </div>
          </div>

          {/* Enquiry Form — class names aligned with App.css */}
          <div className="contact-form-panel">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-heading">PROJECT INQUIRY</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="client-name">YOUR NAME *</label>
                <input
                  id="client-name"
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. John Doe / Studio Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="client-email">YOUR EMAIL *</label>
                <input
                  id="client-email"
                  type="email"
                  className="form-input"
                  required
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-row-dual">
                <div className="form-group">
                  <label className="form-label" htmlFor="service-type">SERVICE NEEDED</label>
                  <select
                    id="service-type"
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="cinematic">Cinematic Editing</option>
                    <option value="short-form">Short-Form / Reels</option>
                    <option value="long-form">Long-Form / YouTube</option>
                    <option value="commercial">Promotional / Commercial</option>
                    <option value="graphics">Graphic Design &amp; Poster</option>
                    <option value="other">Other Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="budget-range">BUDGET RANGE</label>
                  <select
                    id="budget-range"
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="flexible">Flexible / Discuss</option>
                    <option value="starter">Short-Form / Per Reel</option>
                    <option value="project">Full Project Package</option>
                    <option value="monthly">Monthly Retainer</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="project-message">PROJECT BRIEF &amp; DETAILS *</label>
                <textarea
                  id="project-message"
                  className="form-textarea"
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, raw footage length, and creative vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <p className="form-mailto-note">
                ✉&nbsp;This form opens your default email client pre-filled with your details. No data is sent to any server.
              </p>

              <button type="submit" className="form-submit-btn">
                <span>SEND INQUIRY VIA EMAIL</span>
                <span className="submit-btn-arrow" aria-hidden="true">↗</span>
              </button>

              {formSubmitted && (
                <div className="form-success-banner">
                  Your email client was opened with the inquiry details. Thank you, {formData.name || 'friend'}!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
