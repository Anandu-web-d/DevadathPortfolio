interface ServiceItem {
  id: string
  number: string
  title: string
  tagline: string
  deliverables: string[]
  isPrimary?: boolean
}

const services: ServiceItem[] = [
  {
    id: 'cinematic',
    number: '01',
    title: 'Cinematic Video Editing',
    tagline: 'Primary specialism — Crafting immersive visual flow, narrative tension, and emotional pacing.',
    deliverables: [
      'Story-driven timeline assembly & pacing',
      'Precise sound design & beat synchronization',
      'Dramatic micro-pauses & crescendo building',
      'Atmospheric B-roll weaving & seamless transitions',
    ],
    isPrimary: true,
  },
  {
    id: 'short-form',
    number: '02',
    title: 'Instagram Reels & Short-Form Editing',
    tagline: 'High-retention hooks and snappy visual momentum designed for modern digital audiences.',
    deliverables: [
      'First-3-second scroll-stopping hooks',
      'Kinetic cuts & frame-accurate audio sync',
      'Dynamic typography, captions & sound effects',
      'Optimized 9:16 vertical delivery for Reels & Shorts',
    ],
  },
  {
    id: 'long-form',
    number: '03',
    title: 'YouTube Long-Form Editing',
    tagline: 'Sustained engagement and structured pacing for documentaries, video essays, and narratives.',
    deliverables: [
      'Multi-cam editing & dialogue smoothing',
      'Chaptering & visual breathing room',
      'Soundscape layering & ambient sweetening',
      'Retention curve optimization across the entire cut',
    ],
  },
  {
    id: 'promotional',
    number: '04',
    title: 'Promotional Videos',
    tagline: 'High-impact commercial and event presentations that spotlight brands, launches, and experiences.',
    deliverables: [
      'Brand showcase & product launch cutdowns',
      'Concert & live event recap films',
      'Call-to-action visual integration',
      'Multi-format export packages for web and broadcast',
    ],
  },
  {
    id: 'motion-graphics',
    number: '05',
    title: 'Motion Graphics',
    tagline: 'Dynamic typographic treatments, title cards, and animated brand accents.',
    deliverables: [
      'Custom title sequences & lower thirds',
      'Kinetic text animations & intro bumpers',
      'Logo animations & visual HUD overlays',
      'Dynamic transitions & split-screen choreography',
    ],
  },
  {
    id: 'colour-grading',
    number: '06',
    title: 'Colour Grading',
    tagline: 'Mood-enhancing palette toning, skin tone balance, and cinematic look development.',
    deliverables: [
      'Atmospheric look development (warm amber, teal/orange, monochrome)',
      'Natural skin tone preservation & balance',
      'Shot-to-shot scene continuity matching',
      'Rec.709 mastering for social and online streaming',
    ],
  },
  {
    id: 'graphic-design',
    number: '07',
    title: 'Graphic Design',
    tagline: 'Visual art, matchday sports posters, key art, and editorial promotional layouts.',
    deliverables: [
      'Sports matchday & fixture posters',
      'Key art and film tribute posters',
      'YouTube thumbnail designs with high CTR',
      'Visual asset isolation, typography & Swiss grid layout',
    ],
  },
]

export function Services() {
  return (
    <section className="section-services" id="services">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-num">03 / 05</span>
            <span className="eyebrow-divider" aria-hidden="true">—</span>
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
            </div>
          ))}
        </div>

        {/* Editorial Workflow Steps */}
        <div className="workflow-block">
          <h3 className="workflow-title">THE EDITING WORKFLOW</h3>
          <div className="workflow-steps">
            <div className="workflow-step">
              <span className="step-idx">STEP 01</span>
              <h4>Vision &amp; Brief</h4>
              <p>Reviewing raw footage, references, narrative tone, and project deliverables.</p>
            </div>
            <div className="workflow-step">
              <span className="step-idx">STEP 02</span>
              <h4>Assembly &amp; Cut</h4>
              <p>Crafting the rough cut, finding natural rhythm, and sculpting timing to the audio.</p>
            </div>
            <div className="workflow-step">
              <span className="step-idx">STEP 03</span>
              <h4>Polish &amp; Sound</h4>
              <p>Multi-layered sound design, colour grading, title cards, and kinetic accents.</p>
            </div>
            <div className="workflow-step">
              <span className="step-idx">STEP 04</span>
              <h4>Master &amp; Deliver</h4>
              <p>Revisions based on feedback and export in master high-res deliverables.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
