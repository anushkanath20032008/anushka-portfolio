import type { Content } from '../types';

// Bundled snapshot of the portfolio content. Used as the Supabase seed source
// and as the fallback when Supabase is unreachable or not configured.
export const SNAPSHOT: Content = {
  profile: {
    name: 'Anushka Nath',
    headline: 'Curious about everything. Building a few things.',
    positioning:
      'Blue-skies thinker. I learn a little about everything (Bharatanatyam, audit dashboards, adult gymnastics, apps nobody asked for) and trust the dots to connect. You only ever see them looking backwards.',
    summary:
      'Owned a ₹3 Cr audit & advisory portfolio across 65+ engagements, then started building: live apps, an AI app for dance studios, and a leadership role in the AI & Analytics Club. Drawn to structuring fast-scaling B2B businesses and leading 0-to-1 initiatives in tech.',
    email: 'nath.anushka26@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anushkanath/',
    instagram: 'https://www.instagram.com/uhhhnushka_0.o/',
    github: 'https://github.com/anushkanath20032008',
    location: 'Gurgaon / Bengaluru / Kochi, India',
  },

  folders: [
    { slug: 'work-experience', label: 'Work Experience', iconKey: 'work', sort: 1, source: 'master-cv' },
    { slug: 'builds', label: 'Builds', iconKey: 'builds', sort: 2, source: 'added' },
    { slug: 'education', label: 'Education', iconKey: 'education', sort: 3, source: 'master-cv' },
    { slug: 'internships', label: 'Internships', iconKey: 'internships', sort: 4, source: 'master-cv' },
    { slug: 'academic-projects', label: 'Academic Projects', iconKey: 'academic', sort: 5, source: 'master-cv' },
    { slug: 'achievements', label: 'Achievements', iconKey: 'achievements', sort: 7, source: 'master-cv' },
    { slug: 'certifications', label: 'Certifications', iconKey: 'certifications', sort: 8, source: 'master-cv' },
    { slug: 'extra-curricular', label: 'Extra-curricular', iconKey: 'extra', sort: 9, source: 'master-cv' },
    { slug: 'interests-skills', label: 'Interests & Skills', iconKey: 'skills', sort: 10, source: 'master-cv' },
  ],

  entries: [
    // ---- Work Experience
    {
      id: 'crowe',
      folder: 'work-experience',
      slug: 'crowe-advisory',
      title: 'Project Coordinator → Customer Lifecycle Manager',
      org: 'Crowe Advisory Services (India) LLP',
      role: 'Project Coordinator',
      period: "Jul'24 – Jun'26",
      location: 'Kochi, Kerala',
      kind: 'work',
      sort: 1,
      body: {
        images: [{ src: 'img/crowe-award.jpg', alt: 'Anushka receiving a thank-you plaque from the Crowe team', caption: 'Thank-you plaque from the Crowe team', pos: '30% 60%' }],
        summary:
          'Cybersecurity and assurance practice (VAPT, architecture and code review, digital forensics, SOC 1/2, ISAE 3000/3402). The practice scaled 3x in engagement volume while I moved from coordinating projects to managing the customer lifecycle.',
        gap: 'Ad-hoc quality practices, no real-time view of revenue, utilisation or profitability, and a profitability leak in Vulnerability Assessment.',
        system:
          'Modelled executive dashboards from scratch, designed a quality management system to meet an international standard mandate, and rebuilt delivery workflows and capacity planning.',
        result: '₹3 Cr portfolio, 65+ engagements, 30% faster turnaround, 1.5x resource utilisation, ~26% lead conversion.',
        metrics: ['₹3 Cr portfolio', '65+ engagements', '30% faster turnaround', '1.5x utilisation', '~26% lead conversion'],
        groups: [
          {
            title: 'Commercial & Growth',
            bullets: [
              'Evolved from project coordinator into customer lifecycle manager as the practice scaled 3x in engagement volume.',
              'Owned execution of a ₹3 Cr audit & advisory portfolio across 65+ engagements spanning EMEA, APAC & the Americas.',
              'Lifted lead conversion rate to ~26% by strengthening solutioning, stakeholder discussions, and commercial proposals.',
              'Diagnosed profitability leaks in our Vulnerability Assessment service through data-informed root cause analysis.',
              'Enabled real-time revenue, utilisation, and profitability tracking by modelling executive dashboards from scratch.',
              'Mitigated the identified delivery-cost blind spot by evaluating project-effort-variance data across the service offering.',
            ],
          },
          {
            title: 'Operations & Scale',
            bullets: [
              'Sole SPOC across 5 stakeholder groups: partners, auditors, external consultants, contracting organisation, and clients.',
              'Designed quality management system to meet an international standard mandate, replacing ad-hoc quality practices.',
              'Cut project turnaround time by 30% by streamlining delivery workflows and execution governance.',
              'Elevated resource utilisation 1.5x through data-driven allocation and capacity planning across 15+ auditors.',
              'Unlocked upsell revenue by identifying account expansion opportunities and complementary service fits.',
            ],
          },
          {
            title: 'Stakeholder & Partner Management',
            bullets: [
              'Gained testimonials and client insight to support business growth by launching our first feedback program.',
              'Enhanced sales effectiveness by retraining partner sales teams on our solution playbooks and service bundling.',
              'Preserved a strategic global contractor relationship by managing executive stakeholders during a critical escalation.',
              'Boosted adoption of an audit offering by 15% by shifting positioning from compliance requirements to business value.',
              'Strengthened contractor governance through delivery oversight, feedback mechanisms, and review processes.',
              "Facilitated a presales colleague's transition into the audit team by bridging their knowledge gap on the service delivery process.",
            ],
          },
        ],
      },
    },
    {
      id: 'stepping-stone',
      folder: 'work-experience',
      slug: 'the-stepping-stone',
      title: 'The Stepping Stone (field notes)',
      org: 'Essay',
      period: 'Autumn 2024',
      kind: 'writing',
      sort: 2,
      body: {
        summary:
          'Observations on high-velocity execution and accountability: what cross-functional operations looks like behind the scenes.',
        bullets: [
          "You will never have as much authority as you have responsibility. The only currency that works is rapport.",
          "Authority vs. responsibility: you earn attention by showing up early enough, often enough, and being useful enough that people choose to listen.",
          "Problem solver and operational leverage: you absorb what has no owner, and if you can defend your reasoning you can move leadership.",
          "Stepping stone, not destination: being in every room is access, and what you do with it is up to you.",
        ],
        tags: ['operations', 'strategy', 'field notes'],
      },
    },

    // ---- Builds
    {
      id: 'choreostudio',
      folder: 'builds',
      slug: 'choreostudio',
      title: 'ChoreoStudio',
      role: 'Founder & Builder',
      period: '2026',
      kind: 'build',
      status: 'live',
      sort: 1,
      body: {
        summary:
          'An AI-assisted operations app for independent dance studios in India: students, guardians, batches, attendance, individual fee plans, a payments ledger, and WhatsApp reminders, with a simple link for families.',
        gap: 'Independent dance studios run on WhatsApp groups and notebooks, so fees, attendance and reminders slip.',
        system:
          'A scrapbook-style studio app: batches describe where a student dances, fee plans describe what each student owes, and families see classes, attendance and balance from one link.',
        result: 'Live at choreostudio.live with a free first month for studios.',
        links: [{ label: 'Open ChoreoStudio', url: 'https://choreostudio.live' }],
        images: [
          { src: 'img/choreo-hero.png', alt: 'ChoreoStudio landing page: Less chasing, more dancing', caption: 'The landing page', pos: 'top' },
          { src: 'img/choreo-tall.png', alt: 'ChoreoStudio fee estimate calculator', caption: 'Fee calculator for studio owners', pos: '50% 24%' },
        ],
        tags: ['AI app', 'dance studios', 'live'],
      },
    },
    {
      id: 'homebody',
      folder: 'builds',
      slug: 'homebody',
      title: 'HomeBody',
      role: 'Designer & Builder',
      kind: 'build',
      status: 'live',
      sort: 2,
      body: {
        summary:
          'An au-pair inspired matching platform: verified students get affordable accommodation, and urban families get flexible domestic support.',
        gap: 'Acute shortage of affordable, safe student housing in metros, alongside families struggling to find trustworthy household help.',
        system:
          'A two-sided matching ecosystem where students exchange structured help for a stay with vetted host families, with mutual verification and schedule compatibility.',
        result: 'Live MVP with onboarding, compatibility filtering and profile verification.',
        links: [{ label: 'Open HomeBody', url: 'https://homebodyindia.lovable.app' }],
        tags: ['marketplace', 'AI-assisted', 'Lovable', 'Supabase'],
      },
    },
    {
      id: 'scribbleverse',
      folder: 'builds',
      slug: 'scribbleverse',
      title: 'Scribbleverse',
      role: 'Game Designer & Builder',
      kind: 'build',
      status: 'live',
      sort: 3,
      body: {
        summary:
          "A multiplayer 'exquisite corpse' drawing game: players sketch sequential canvas segments blind, then reveal the whole creature together.",
        gap: 'Party games are either fiercely competitive or intimidating to non-artists.',
        system: 'Room-based play for 3 to 8 players with folded-edge guides, timed turns and a joint reveal.',
        result: 'Live and playable with room codes and exportable canvases.',
        links: [{ label: 'Play Scribbleverse', url: 'https://scribblverse.lovable.app' }],
        tags: ['game design', 'real-time', 'canvas'],
      },
    },
    {
      id: 'style-dna',
      folder: 'builds',
      slug: 'style-dna',
      title: 'Style DNA',
      role: 'AI Designer & Builder',
      kind: 'build',
      status: 'live',
      sort: 4,
      body: {
        summary:
          'An AI jewellery discovery engine that reads saved inspiration photos and returns a curated wishlist with a reason for each match.',
        gap: "Shoppers can't put their taste into a search box, and style quizzes give generic results.",
        system:
          'Upload 10-20 inspiration images; the model extracts colour harmony, metal finishes, geometry and design eras, then explains why each item fits.',
        result: 'Live prototype with an upload queue, style profile and explainable recommendations.',
        links: [{ label: 'Open Style DNA', url: 'https://vestelle.lovable.app' }],
        tags: ['AI-assisted', 'e-commerce', 'vision'],
      },
    },

    // ---- Education
    {
      id: 'mu',
      folder: 'education',
      slug: 'masters-union',
      title: 'PGP in Technology & Business Management',
      org: "Masters' Union",
      period: '2026 – Present',
      location: 'Gurgaon',
      kind: 'education',
      sort: 1,
      body: { summary: 'Postgraduate programme in technology and business management.' },
    },
    {
      id: 'sju',
      folder: 'education',
      slug: 'st-josephs',
      title: 'B.A. Economics & Industrial Relations',
      org: "St. Joseph's University",
      period: '2021 – 2024',
      location: 'Bengaluru',
      kind: 'education',
      sort: 2,
      body: {
        summary: 'CGPA 8.89. Editor of Aatmasaat Vol. 4 (School of Humanities & Social Sciences newsletter). College Gold Medalist in German.',
        metrics: ['CGPA 8.89'],
      },
    },
    {
      id: 'primus',
      folder: 'education',
      slug: 'primus',
      title: 'IGCSE and AS/A Levels',
      org: 'Primus Public School',
      period: '2019 – 2021',
      location: 'Bengaluru',
      kind: 'education',
      sort: 3,
      body: {
        summary: 'IGCSE Class 10 (PCMB) 90.63%ile. Classes 11 and 12 (PCM) 89.50%ile. Four-year Diwali dance competition winner.',
        metrics: ['90.63%ile (Class 10)', '89.50%ile (Class 11-12)'],
      },
    },

    // ---- Internships
    {
      id: 'medigrow',
      folder: 'internships',
      slug: 'medigrow',
      title: 'Business Development Intern',
      org: 'MediGrow',
      period: "Feb'24 – Mar'24",
      location: 'Dubai (remote)',
      kind: 'internship',
      sort: 1,
      body: {
        summary: 'Expanded the prospect pipeline for a healthcare marketing startup through targeted market research and outreach.',
        bullets: [
          'Lead generation and market research via targeted data scraping and prospect identification.',
          'Prepared and delivered proposals; handled coordination and scheduling.',
          'LinkedIn outreach and networking to strengthen industry connections.',
          'Supported discussions on business expansion strategies for the start-up.',
        ],
      },
    },
    {
      id: 'kloudmate',
      folder: 'internships',
      slug: 'kloudmate',
      title: 'Sales & Marketing Intern',
      org: 'KloudMate',
      period: "Jan'23 – Dec'23",
      location: 'Bengaluru',
      kind: 'internship',
      sort: 2,
      body: {
        summary: 'Built B2B prospect pipelines through targeted segmentation and outbound outreach.',
        bullets: [
          'Identified prospects using tools like Intricately.',
          'Cold outreach to decision-makers using Lusha and Apollo for B2B contact intelligence.',
          'Kept records of client interactions and pipeline activity in HubSpot.',
          'Market research and competitor analysis to support strategy.',
        ],
      },
    },

    // ---- Academic projects
    {
      id: 'book-the-gap',
      folder: 'academic-projects',
      slug: 'book-the-gap',
      title: 'Book The Gap',
      org: 'Global Perspectives academic team project',
      role: 'Team Member',
      period: '2019',
      location: 'Bengaluru',
      kind: 'project',
      sort: 1,
      body: {
        summary:
          'Field research and educator interviews led the team to set up a multilingual library for Grades 1-5 at an underfunded government school.',
        gap: 'Lack of prioritisation and funding for public education left a government school without reading resources.',
        system:
          'Used-book drives across school and apartment communities, resold to raise funds, then bought English, Kannada and Hindi books after talking to the headteacher; co-created a website and produced a documentary.',
        result: 'A working library for Grades 1-5 and a documentary raising awareness of educational inequity.',
        links: [
          { label: 'Initiative website', url: 'https://bookthegap.weebly.com/' },
          { label: 'Documentary', url: 'https://www.youtube.com/watch?v=yPln43BsJro' },
        ],
      },
    },

    {
      id: 'dropshipping',
      folder: 'academic-projects',
      slug: 'dropshipping',
      title: 'Dropshipping venture',
      org: 'College assignment',
      role: 'Founder',
      kind: 'project',
      sort: 2,
      body: {
        summary: 'A dropshipping store started as a college assignment that turned into real revenue.',
        result: 'Generated ₹1 lakh+ in revenue.',
        metrics: ['₹1 lakh+ revenue'],
        tags: ['e-commerce', 'dropshipping', 'college'],
      },
    },

    // ---- Achievements
    {
      id: 'german-gold',
      folder: 'achievements',
      slug: 'german-gold-medal',
      title: 'Gold Medal in German',
      org: "St. Joseph's University",
      period: "Jun'24",
      kind: 'achievement',
      sort: 1,
      body: { summary: 'College gold medalist in German.' },
    },
    {
      id: 'diwali-dance',
      folder: 'achievements',
      slug: 'diwali-dance',
      title: 'Inter-house Diwali dance winners',
      org: 'Primus Public School',
      period: "Jun'18 – Jun'21",
      kind: 'achievement',
      sort: 2,
      body: { summary: 'Winners four consecutive years.' },
    },

    // ---- Certifications
    ...[
      ['KICKOFF Project Management', 'Project Management Institute (PMI)', '2025'],
      ['AI Tools Workshop', 'Be10X', '2026'],
      ['Corporate Finance', 'Verzeo', '2022'],
      ['Digital Marketing & Advertising', "St. Joseph's University", '2022'],
      ['Introduction to Artificial Intelligence', 'Infosys Springboard', '2022'],
      ['Big Data, Artificial Intelligence, and Ethics', 'Coursera - UC Davis', '2022'],
      ['Artificial Intelligence and Machine Learning Fundamentals', 'Infosys Springboard', '2022'],
      ['Hands-on Artificial Intelligence with TensorFlow', 'Infosys Springboard', '2022'],
    ].map(([title, org, period], i) => ({
      id: `cert-${i + 1}`,
      folder: 'certifications',
      slug: `cert-${i + 1}`,
      title,
      org,
      period,
      kind: 'certification',
      sort: i + 1,
      body: {},
    })),

    // ---- Extra-curricular
    {
      id: 'sinchan',
      folder: 'extra-curricular',
      slug: 'sinchan-kurumutu',
      title: 'Sinchan NGO: Project Kurumutu',
      role: 'Volunteer',
      period: '2020 – 2022',
      location: 'Bengaluru',
      kind: 'volunteering',
      sort: 1,
      body: {
        summary: 'Urban-rural peer-learning initiative for English and digital literacy.',
        gap: 'Learners had gaps in conversational English and digital literacy, and rote methods led to drop-off.',
        system:
          'Designed peer-learning sessions with visual story pedagogy tied to learners’ lived experience, standardised session structures across cohorts, and onboarded volunteers.',
        result:
          'Programme scaled across cohorts; I led the rebranding of Project Lahanti as Kurumutu. Acknowledged in a published reflection by the project founder.',
      },
    },
    {
      id: 'newsletter',
      folder: 'extra-curricular',
      slug: 'newsletter-editor',
      title: 'Editor, Aatmasaat Vol. 4',
      org: "St. Joseph's School of Humanities & Social Sciences",
      period: '2023',
      kind: 'leadership',
      sort: 2,
      body: { summary: 'Oversaw the editorial team for the quarterly newsletter: content selection, design and layout, editing and proofreading.' },
    },
    {
      id: 'volunteering',
      folder: 'extra-curricular',
      slug: 'community-volunteering',
      title: 'Community volunteering',
      kind: 'volunteering',
      sort: 3,
      body: {
        bullets: [
          'Karunashraya (2020): prepared food for individuals in palliative care.',
          'Samarthanam Trust for the Disabled (2020-21): recorded an audiobook for the visually impaired.',
          'Robinhood Army (2021): held classes for underprivileged children; food and clothing drives.',
        ],
      },
    },

    // ---- Interests & skills
    {
      id: 'interests',
      folder: 'interests-skills',
      slug: 'interests',
      title: 'Interests',
      kind: 'interests',
      sort: 1,
      body: {
        bullets: [
          'Bharatanatyam: trained in classical dance for 6+ years.',
          'Gymnastics: took it up as an adult, deliberately choosing to be a beginner again.',
          'Art: sketching, acrylic painting. Craft: origami, 3D paper crafts, air-dry clay.',
          'Reading.',
        ],
      },
    },
  ],

  metrics: [
    { label: 'Portfolio owned', value: '₹3 Cr', sublabel: 'across EMEA, APAC & the Americas' },
    { label: 'Engagements', value: '65+', sublabel: 'audit & advisory' },
    { label: 'Faster turnaround', value: '30%', sublabel: 'through workflow redesign' },
    { label: 'Resource utilisation', value: '1.5x', sublabel: '15+ auditors' },
    { label: 'Lead conversion', value: '~26%', sublabel: 'stronger solutioning' },
    { label: 'Apps built', value: '4', sublabel: '3 live, 1 in development' },
  ],

  now: [
    {
      id: 'now-choreo',
      label: 'ChoreoStudio',
      short: 'Choreo',
      kind: 'building',
      statusText: 'Live: fee tracking for dance studios',
      progress: 55,
      detail:
        'An operations app for independent dance studios in India: students, batches, attendance, fee plans, a payments ledger and WhatsApp reminders. Live at choreostudio.live.',
    },
    {
      id: 'now-club',
      label: 'AI & Analytics Club',
      short: 'Club VP',
      kind: 'role',
      statusText: 'New: Vice President',
      detail: 'Recently became Vice President of the AI & Analytics Club.',
    },
    {
      id: 'now-mu',
      label: "Masters' Union",
      short: "Masters' Union",
      kind: 'note',
      statusText: 'PGP in Technology & Business Management',
      detail: 'Currently pursuing the PGP in Technology & Business Management at Masters\' Union, Gurgaon.',
    },
  ],

  skills: [
    ...[
      'Customer Lifecycle Management',
      'Strategic Planning',
      'Program Management',
      'Business Operations',
      'Stakeholder Management',
      'Cross-functional Collaboration',
      'Process Improvement',
      'Business Analysis',
      'Capacity Planning',
    ].map((name) => ({ group: 'business' as const, name })),
    ...[
      'Advanced Excel',
      'Dashboarding & KPI Tracking',
      'CRM (HubSpot, Zoho)',
      'Microsoft Planner',
      'Wrike',
      'Basic Power Automate',
      'Jira',
      'Apollo',
      'Lusha',
      'Canva',
      'PowerPoint',
    ].map((name) => ({ group: 'technical' as const, name })),
  ],
};
