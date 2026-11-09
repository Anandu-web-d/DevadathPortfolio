interface ServiceItem {
  id: string
  number: string
  title: string
  tagline: string
  deliverables: string[]
  isPrimary?: boolean
  caveat?: string
}

const services: ServiceItem[] = [
  {
    id: 'cinematic',
    number: '01',
    title: 'Cinematic Editing & Storytelling',
    tagline: 'Primary Specialism — Crafting immersive visual flow and emotional pacing.',
    deliverables: [
      'Story-driven timeline pacing & narrative continuity',
      'Precise music and beat synchronization',
      'Dramatic tension, micro-pauses & crescendo building',
      'B-roll weave and cinematic transitions',
    ],
    isPrimary: true,
  },
  {
    id: 'short-form',
    number: '02',
    title: 'Short-Form Content & Reels',
    tagline: 'High retention hooks and snappy visual momentum designed for social algorithms.',
    deliverables: [
      'First-3-second scroll-stopping hooks',
      'Fast-cut kinetic pacing & beat matching',
      'Dynamic captions, text punch-ins & sound effects',
      'Optimized 9:16 vertical delivery',
    ],
  },
  {
    id: 'long-form',
    number: '03',
    title: 'Long-Form & YouTube Videos',
    tagline: 'Sustained engagement and structured pacing for documentaries, podcasts and essays.',
    deliverables: [
      'Multi-cam assembly & dialogue smoothing',
      'Section chaptering & visual breathing room',
      'Soundscapes, audio sweetening & ambient layers',
      'Consistent retention curve optimization',
    ],
  },
  {
    id: 'promotional',
    number: '04',
    title: 'Promotional & Commercial Edits',
    tagline: 'Impactful video presentations that spotlight products, campaigns, and events.',
    deliverables: [
      'Brand showcase & product launch cutdowns',
      'Event & concert recap highlights',
      'Call-to-action visual integration',
      'Multi-platform export packages',
    ],
  },
  {
    id: 'motion-colour',
    number: '05',
    title: 'Colour Toning & Motion Accents',
    tagline: 'Clean aesthetic enhancement with honest, intentional scope.',
    deliverables: [
      'Atmospheric mood colour toning & skin balance',
      'Minimalist lower thirds, title cards & logos',
      'Seamless speed-ramping and light leak transitions',
    ],
    caveat:
      'Motion graphics and heavy colour grading offered within practical scope; focus remains on editing craftsmanship.',
  },
  {
    id: 'graphic-design',
    number: '06',
    title: 'Graphic Design & Posters',
    tagline: 'Complementary design skills for matchday posters, thumbnails, and key art.',
    deliverables: [
      'High-impact social matchday / fixture posters',
      'YouTube thumbnail concepts with high CTR',
      'Visual asset typography and asset isolation',
    ],
  },
]

function Services() {
  return (
    <section className="section-services" id="services">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-num">03 / 05</span>
            <span className="eyebrow-label">CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            SERVICES CRAFTED<br />
            FOR IMPACT.
          </h2>
          <p className="section-lead">
            Every project begins with understanding your story. Operating under DeepInTales, I adapt
            editing styles to match your creative vision.
          </p>
        </div>

        {/* Services List */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${service.isPrimary ? 'is-primary' : ''}`}
            >
              <div className="service-top">
                <span className="service-number">{service.number}</span>
                {service.isPrimary && (
                  <span className="service-badge">CORE SPECIALISM</span>
                )}
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-tagline">{service.tagline}</p>

              <ul className="service-deliverables">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="deliverable-item">
                    <span className="bullet">■</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {service.caveat && (
                <div className="service-caveat">
                  <span className="caveat-marker">*</span> {service.caveat}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Editorial Workflow Steps */}
        <div className="workflow-block">
          <h3 className="workflow-title">THE EDITING WORKFLOW</h3>
          <div className="workflow-steps">
            <div className="workflow-step">
              <span className="step-idx">STEP 01</span>
              <h4>Vision & Brief</h4>
              <p>Reviewing raw footage, discussing references, narrative tone, and deliverables.</p>
            </div>
            <div className="workflow-step">
              <span className="step-idx">STEP 02</span>
              <h4>Assembly & Cut</h4>
              <p>Crafting the rough cut, finding natural rhythm, and sculpting timing to the audio.</p>
            </div>
            <div className="workflow-step">
              <span className="step-idx">STEP 03</span>
              <h4>Polish & Audio</h4>
              <p>Sound design layer, subtle colour mood grading, and fine title placements.</p>
            </div>
            <div className="workflow-step">
              <span className="step-idx">STEP 04</span>
              <h4>Refine & Deliver</h4>
              <p>Revisions based on client notes and delivery in master high-res formats.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
