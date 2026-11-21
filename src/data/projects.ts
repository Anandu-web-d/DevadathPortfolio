export interface Project {
  id: string
  number: string
  title: string
  category: 'video' | 'poster' | 'photography'
  categoryLabel: string
  description: string
  visualSummary: string
  thumbnail: string
  mediaSource: string
  externalProjectLink: string
  mediaType: 'video' | 'image'
  accessibilityText: string
  year: string
  role: string
  tags: string[]
  clientOrTheme: string
  duration?: string
  aspectRatio: string
}

export const projects: Project[] = [
  {
    id: 'fast-cut-montage',
    number: '01',
    title: 'Fast Cut Montage',
    category: 'video',
    categoryLabel: 'Video / Short-Form',
    description:
      'High-energy, rhythmic cuts synchronized with punchy sound design and micro-stems. Built to capture instant attention with aggressive momentum, dynamic zooms, and frame-accurate beat alignment.',
    visualSummary: 'Rhythmic cuts & punchy audio sync with hyper-kinetic motion.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%2300E5FF" stop-opacity="0.8"/><stop offset="100%" stop-color="%230A0D14"/></linearGradient><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%230E1420"/><stop offset="100%" stop-color="%2307090E"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg1)"/><circle cx="300" cy="300" r="160" fill="none" stroke="url(%23g1)" stroke-width="2" opacity="0.6"/><polygon points="260,230 380,300 260,370" fill="%2300E5FF"/><line x1="80" y1="300" x2="520" y2="300" stroke="%2300E5FF" stroke-width="1" opacity="0.3"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="44" letter-spacing="-1">FAST CUT</text><text x="60" y="628" fill="%2300E5FF" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">MONTAGE / REEL</text><line x1="60" y1="660" x2="540" y2="660" stroke="%23243048" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">01 // SHORT-FORM CINEMA</text></svg>',
    mediaSource: '/videos/fast-cut-montage.mp4',
    externalProjectLink: 'https://www.instagram.com/reel/DZM4sRAv0Nq/',
    mediaType: 'video',
    accessibilityText: 'Preview poster for Fast Cut Montage video edit by Devadathan R',
    year: '2024',
    role: 'Lead Video Editor & Sound Designer',
    tags: ['Short-Form', 'Fast Cut', 'Sound Design', 'Speed Ramping'],
    clientOrTheme: 'Independent Short-Form Visual',
    duration: '0:32',
    aspectRatio: '9:16',
  },
  {
    id: 'travel-cinematography',
    number: '02',
    title: 'Travel Cinematography',
    category: 'video',
    categoryLabel: 'Video / Travel Cine',
    description:
      'Atmospheric travel reel capturing raw geography, tranquil natural motion, ambient soundscapes, and patient cinematic pacing. Color graded with earthy organic tones to preserve documentary realism.',
    visualSummary: 'Atmospheric pacing & organic color-grading through natural landscapes.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23091A18"/><stop offset="100%" stop-color="%23050C0B"/></linearGradient><linearGradient id="amberG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23FF8A00"/><stop offset="100%" stop-color="%2300E5FF" stop-opacity="0.3"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg2)"/><circle cx="440" cy="180" r="80" fill="%23FF8A00" opacity="0.6"/><path d="M40 480 Q 200 300 380 420 T 580 320 L 600 750 L 0 750 Z" fill="%230E2623" opacity="0.8"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="42" letter-spacing="-1">TRAVEL CINE</text><text x="60" y="628" fill="%23FF8A00" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">ATMOSPHERE / MOOD</text><line x1="60" y1="660" x2="540" y2="660" stroke="%231E443E" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">02 // CINEMATOGRAPHY</text></svg>',
    mediaSource: '/videos/travel-cinematography.mp4',
    externalProjectLink: 'https://www.instagram.com/reel/DUDjTxekvzZ/',
    mediaType: 'video',
    accessibilityText: 'Preview poster for Travel Cinematography reel by Devadathan R',
    year: '2024',
    role: 'Cinematographer & Colorist',
    tags: ['Cinematography', 'Travel', 'Pacing', 'Landscape', 'Soundscape'],
    clientOrTheme: 'Travel Diary Sequence',
    duration: '0:45',
    aspectRatio: '9:16',
  },
  {
    id: 'cinematic-film-tribute',
    number: '03',
    title: 'Cinematic Film Tribute',
    category: 'video',
    categoryLabel: 'Video / Tribute',
    description:
      'A deeply emotive tribute sequence honoring classical film framing, expressive character glances, and sustained dramatic tension. Sculpted with deliberate stillness and crescendo audio.',
    visualSummary: 'Emotive character framing & slow-burn narrative tension.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%231E1210"/><stop offset="100%" stop-color="%230B0706"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg3)"/><rect x="70" y="110" width="460" height="280" stroke="%23FF8A00" stroke-width="1.5" fill="none" opacity="0.5"/><line x1="70" y1="250" x2="530" y2="250" stroke="%2300E5FF" stroke-width="1" opacity="0.3"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="42" letter-spacing="-1">FILM TRIBUTE</text><text x="60" y="628" fill="%23FF8A00" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">EMOTIVE / DRAMA</text><line x1="60" y1="660" x2="540" y2="660" stroke="%233E2420" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">03 // FILM EDIT</text></svg>',
    mediaSource: '/videos/cinematic-film-tribute.mp4',
    externalProjectLink: 'https://www.instagram.com/reel/C26_534P3Dp/',
    mediaType: 'video',
    accessibilityText: 'Preview poster for Cinematic Film Tribute by Devadathan R',
    year: '2024',
    role: 'Editorial Montage & Archival Curation',
    tags: ['Film Tribute', 'Storytelling', 'Emotion', 'Cinema', 'Pacing'],
    clientOrTheme: 'Cinema Retrospective',
    duration: '0:50',
    aspectRatio: '9:16',
  },
  {
    id: 'effects-based-cine-edit',
    number: '04',
    title: 'Effects-Based Cine Edit',
    category: 'video',
    categoryLabel: 'Video / VFX Editing',
    description:
      'A dynamic showcase combining seamless match cuts, speed ramps, rotational whip pans, and intricate spatial audio transitions to create continuous motion flow.',
    visualSummary: 'Speed ramps & seamless whip pans with continuous motion flow.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%230E1929"/><stop offset="100%" stop-color="%23060C14"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg4)"/><path d="M120 160 L 480 320 L 120 480 Z" fill="none" stroke="%2300E5FF" stroke-width="3" opacity="0.7"/><circle cx="300" cy="320" r="90" fill="%2300E5FF" opacity="0.15"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="40" letter-spacing="-1">CINE VFX EDIT</text><text x="60" y="628" fill="%2300E5FF" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">TRANSITION / RHYTHM</text><line x1="60" y1="660" x2="540" y2="660" stroke="%231E3554" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">04 // VFX EDITING</text></svg>',
    mediaSource: '/videos/effects-based-cine-edit.mp4',
    externalProjectLink: 'https://www.instagram.com/reel/C6Vv3LCP8O7/',
    mediaType: 'video',
    accessibilityText: 'Preview poster for Effects-Based Cine Edit by Devadathan R',
    year: '2024',
    role: 'VFX Editor & Motion Designer',
    tags: ['VFX Editing', 'Transitions', 'Speed Ramps', 'Match Cuts'],
    clientOrTheme: 'Visual Rhythm Exploration',
    duration: '0:38',
    aspectRatio: '9:16',
  },
  {
    id: 'christopher-nolan-tribute',
    number: '05',
    title: 'Christopher Nolan Tribute',
    category: 'video',
    categoryLabel: 'Video / Cinema Tribute',
    description:
      'Homage to Christopher Nolan’s hallmark narrative cross-cutting, acoustic tension, ticking watch motifs, and layered orchestral crescendo. Edited to create palpable suspense across multiple temporal planes.',
    visualSummary: 'Non-linear tension & orchestral rhythm honoring Nolan cinematic scale.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg5" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%2312161A"/><stop offset="100%" stop-color="%2307090C"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg5)"/><circle cx="300" cy="280" r="150" stroke="%2300E5FF" stroke-width="2" stroke-dasharray="8 8" fill="none" opacity="0.6"/><line x1="300" y1="280" x2="300" y2="170" stroke="%23FF8A00" stroke-width="3"/><line x1="300" y1="280" x2="380" y2="280" stroke="%23FF8A00" stroke-width="3"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="38" letter-spacing="-1">NOLAN TRIBUTE</text><text x="60" y="628" fill="%2300E5FF" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">TIME / SUSPENSE</text><line x1="60" y1="660" x2="540" y2="660" stroke="%23273440" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">05 // FILM TRIBUTE</text></svg>',
    mediaSource: '/videos/nolan-tribute.mp4',
    externalProjectLink: 'https://www.instagram.com/reel/Cr-BCvyoj8Q/',
    mediaType: 'video',
    accessibilityText: 'Preview poster for Christopher Nolan Tribute edit by Devadathan R',
    year: '2023',
    role: 'Editorial Director & Sound Arranger',
    tags: ['Nolan', 'Cinema', 'Non-linear', 'Orchestral', 'Sound Sync'],
    clientOrTheme: 'Director Tribute Series',
    duration: '0:58',
    aspectRatio: '9:16',
  },
  {
    id: 'concert-edit',
    number: '06',
    title: 'Concert Edit',
    category: 'video',
    categoryLabel: 'Video / Live Performance',
    description:
      'High-voltage live music performance edit capturing crowd adrenaline, reactive strobe illumination, visceral sub-bass hits, and rhythmic audio sync that puts the viewer in the front row.',
    visualSummary: 'Reactive lighting & rhythmic beat sync capturing live crowd energy.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg6" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%231E0D1B"/><stop offset="100%" stop-color="%230B0409"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg6)"/><polygon points="300,90 110,420 490,420" fill="%2300E5FF" opacity="0.3"/><polygon points="300,90 210,420 390,420" fill="%23FF8A00" opacity="0.5"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="42" letter-spacing="-1">CONCERT EDIT</text><text x="60" y="628" fill="%2300E5FF" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">LIVE / ADRENALINE</text><line x1="60" y1="660" x2="540" y2="660" stroke="%233E1D38" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">06 // EVENT EDITING</text></svg>',
    mediaSource: '/videos/concert-edit.mp4',
    externalProjectLink: 'https://www.instagram.com/reel/DfSTY66vYt-/',
    mediaType: 'video',
    accessibilityText: 'Preview poster for Live Concert Edit by Devadathan R',
    year: '2024',
    role: 'Concert Editor & Audio Mixer',
    tags: ['Live Event', 'Concert', 'Rhythm', 'Strobe Sync', 'Music'],
    clientOrTheme: 'Live Music Performance',
    duration: '0:42',
    aspectRatio: '9:16',
  },
  {
    id: 'matchday-poster',
    number: '07',
    title: 'Matchday Poster',
    category: 'poster',
    categoryLabel: 'Poster / Sports Design',
    description:
      'Bold typographic sports matchday poster combining razor-sharp player isolation, dynamic perspective diagonals, high-contrast textures, and strict Swiss grid structure.',
    visualSummary: 'Bold typography & player isolation in a high-impact fixture layout.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg7" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%231E180E"/><stop offset="100%" stop-color="%23090703"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg7)"/><rect x="50" y="50" width="500" height="420" fill="%232D2416" stroke="%23FF8A00" stroke-width="1.5" opacity="0.8"/><text x="80" y="220" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="70" letter-spacing="-2">MATCH</text><text x="80" y="300" fill="%23FF8A00" font-family="sans-serif" font-weight="900" font-style="italic" font-size="70" letter-spacing="-2">DAY.</text><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="40" letter-spacing="-1">MATCHDAY POSTER</text><text x="60" y="628" fill="%23FF8A00" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">SPORTS / POSTER ART</text><line x1="60" y1="660" x2="540" y2="660" stroke="%234A381E" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">07 // GRAPHIC POSTER</text></svg>',
    mediaSource: '',
    externalProjectLink: 'https://www.instagram.com/p/Da9-40fj1id/',
    mediaType: 'image',
    accessibilityText: 'High-contrast Matchday Poster artwork designed by Devadathan R',
    year: '2024',
    role: 'Graphic Designer & Typographer',
    tags: ['Poster Art', 'Sports Design', 'Typography', 'Swiss Grid', 'Layout'],
    clientOrTheme: 'Athletic Fixture Promotion',
    aspectRatio: '4:5',
  },
  {
    id: 'golden-turtle',
    number: '08',
    title: 'Golden Turtle',
    category: 'photography',
    categoryLabel: 'Photography / Visual Art',
    description:
      'Evocative visual art and minimalist composition exploring delicate golden-hour lighting, organic aquatic textures, and contemplative balance. Prepared for gallery and editorial display.',
    visualSummary: 'Lighting, organic texture & contemplative minimalist visual art.',
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%"><defs><linearGradient id="bg8" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23171814"/><stop offset="100%" stop-color="%23080907"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg8)"/><circle cx="300" cy="270" r="140" fill="%2300E5FF" opacity="0.1"/><ellipse cx="300" cy="270" rx="100" ry="70" fill="%23FF8A00" opacity="0.75"/><text x="60" y="580" fill="%23F8FAFC" font-family="sans-serif" font-weight="900" font-style="italic" font-size="42" letter-spacing="-1">GOLDEN TURTLE</text><text x="60" y="628" fill="%2300E5FF" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="4">CONCEPT / ART</text><line x1="60" y1="660" x2="540" y2="660" stroke="%232E3228" stroke-width="1.5"/><text x="60" y="695" fill="%2394A3B8" font-family="sans-serif" font-size="13" letter-spacing="2">08 // VISUAL ART</text></svg>',
    mediaSource: '',
    externalProjectLink: 'https://www.instagram.com/p/Da_fcXsEtEa/',
    mediaType: 'image',
    accessibilityText: 'Golden Turtle concept art and contemplative photography by Devadathan R',
    year: '2024',
    role: 'Visual Artist & Photographer',
    tags: ['Concept Design', 'Visual Art', 'Composition', 'Texture', 'Lighting'],
    clientOrTheme: 'Nature & Concept Series',
    aspectRatio: '4:5',
  },
]
