// Default content. Used when Sanity is not configured, and as the seed for the Sanity dataset
// (see studio/seed). Sources: boom-cc.com (public pages) and BOOM!'s published Finance
// Coordinator job advert (CV Screen, 2026). Items marked "confirm" in content-workshop.md
// should be checked with BOOM! before launch.

import type {
  BrandMoment,
  CaseStudy,
  PageCopy,
  PageKey,
  Perk,
  SiteSettings,
  SpecialistArea,
  TeamMember,
} from './types'

export const settings: SiteSettings = {
  name: 'BOOM! Healthcare Communications',
  description:
    'An independent, European-based healthcare communications agency. We bring the right people together around every brief, for pharma, biotech and medtech teams.',
  teamSize: '65',
  proofPoints: [
    'Independent and award-winning',
    'Veeva Multichannel and Vault Content Partner',
    '#23 in the UK’s Best Workplaces 2026 (small)',
    'London · Bournemouth · Copenhagen',
  ],
  stats: [
    { value: '300', label: 'brands' },
    { value: '50', label: 'brand launches' },
    { value: '70', label: 'therapy areas' },
    { value: '1,000', label: 'completed projects' },
  ],
  offices: [
    { city: 'London', detail: 'United Kingdom', lat: 51.5072, lng: -0.1276, timeZone: 'Europe/London' },
    { city: 'Bournemouth', detail: 'United Kingdom', address: '99 Bargates, Christchurch, BH23 1QQ', lat: 50.7192, lng: -1.8808, timeZone: 'Europe/London' },
    { city: 'Copenhagen', detail: 'Denmark', address: 'København K', lat: 55.6761, lng: 12.5683, timeZone: 'Europe/Copenhagen' },
  ],
  enquiriesEmail: 'cory@boom-cc.com',
  careersEmail: 'cory@boom-cc.com',
  linkedinUrl: 'https://www.linkedin.com/company/boom-healthcare-communications',
  companyNumber: '11717730',
  vatNumber: '314319136',
  // Companies House is the authority for the registered office (it differs on the current site's Terms and Privacy pages).
  registeredOffice: '99 Bargates, Christchurch, England, BH23 1QQ',
  danishEntity: { name: 'BOOM! Healthcare Communications ApS', cvr: '43712470' },
  sustainabilityUrl: 'https://www.boom-cc.com/s/BOOM-Sustainability-Report-2026-k2tm.pptx',
  legal: [
    { label: 'Terms of use', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Sustainability report', href: 'https://www.boom-cc.com/s/BOOM-Sustainability-Report-2026-k2tm.pptx' },
  ],
}

export const pages: Record<PageKey, PageCopy> = {
  home: {
    title: 'The right band for every brief.',
    image: {
      src: '/images/culture/five-years-lisbon.webp',
      alt: 'BOOM! colleagues together in Lisbon',
      caption: 'The BOOM! team in Lisbon',
    },
    lineups: [
      {
        id: 'launch',
        title: 'Launch in a crowded category',
        approach: 'We’d start by asking clinicians what the established options still leave unresolved. That gives medical, marketing and field teams a reason to tell the same launch story.',
        disciplines: ['Insight', 'Brand strategy', 'Multichannel launch'],
        people: ['cory', 'amie', 'kim'],
        caseSlug: 'launch-in-a-crowded-class',
      },
      {
        id: 'science',
        title: 'Make complex science clear',
        approach: 'We’d start with the decision someone has to make. Then we’d work back through the evidence to find what a clinician needs to know and what a patient needs to understand.',
        disciplines: ['Scientific strategy', 'Medical writing', 'Patient communications'],
        people: ['ali', 'david', 'kim'],
        caseSlug: 'support-that-fits-real-lives',
      },
      {
        id: 'markets',
        title: 'Make a global story work locally',
        approach: 'We’d bring local teams in early to see which claims, language and channels travel. They’d get a shared story with room to make it useful in their market.',
        disciplines: ['Global strategy', 'Market adaptation', 'Delivery'],
        people: ['viv', 'amie', 'laura'],
        caseSlug: 'a-new-lease-of-life',
      },
    ],
    lede: 'BOOM! is an independent healthcare communications agency for pharma, biotech and medtech. We pick the players for each brief, from researchers and medical writers to creatives and Veeva specialists, and the senior people you meet on day one stay with the work through to approval.',
    seoTitle: 'BOOM! Healthcare Communications | The right band for every brief',
    seoDescription:
      'Independent healthcare communications agency. 300+ brands, 50+ launches and 70+ therapy areas, for pharma, biotech and medtech teams.',
  },
  insights: {
    eyebrow: 'Insights',
    title: 'Good questions change the work.',
    lede: 'Working notes on science, strategy and technology for people who make healthcare communications.',
    seoDescription: 'Practical perspectives on scientific storytelling, launch strategy and technology from BOOM! Healthcare Communications.',
  },
  work: {
    eyebrow: 'Work',
    title: 'Inside the brief.',
    lede: "Explore the questions we ask, the people we listen to and the decisions that shape the work.",
    seoDescription: 'Selected healthcare communications work by BOOM!, from launches to patient support.',
  },
  services: {
    eyebrow: 'Services',
    title: 'From a better question to better work.',
    lede: 'We use research to understand what matters to clinicians, patients and advocates. Then we turn that understanding into positioning, claims and campaigns, with the same team carrying the work through to approval.',
    seoDescription:
      'Insights, strategy and communications for pharma, biotech and medtech brands, with Veeva-built content and a process designed for regulated work.',
  },
  therapyAreas: {
    eyebrow: 'Therapy areas',
    title: 'The science is personal.',
    lede: "We’ve worked across more than 70 therapy areas. Explore where our experience runs deepest, from treatment decisions in a busy clinic to the daily realities of living with a rare condition.",
    seoDescription:
      'Healthcare communications experience across 70+ therapy areas, with particular depth in oncology, haematology, immunology, neurology, rare disease and medical devices.',
  },
  about: {
    eyebrow: 'About BOOM!',
    title: 'Meet the people who do the work.',
    image: {
      src: '/images/culture/five-year-conference.webp',
      alt: 'BOOM! colleagues at the five-year company conference',
      caption: 'BOOM! at five years',
    },
    lede: 'Cory Inglis founded BOOM! after a decade at Novartis and years leading agencies. We’re independent, and we build each team around the brief. The senior specialists you meet at the start stay involved through delivery.',
    seoDescription: "BOOM!'s story, values and leadership team: pharma-side experience, scientific depth and creative leadership.",
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Are you a Wilbury?',
    image: {
      src: '/images/culture/lisbon-coach.webp',
      alt: 'BOOM! colleagues heading out together in Lisbon',
      caption: 'Out together in Lisbon',
    },
    lede: 'Bob Dylan and Tom Petty used to ask whether someone was a Wilbury. We borrowed the question. To us it means being very good at what you do and making the people around you better.',
    seoDescription: 'Careers at BOOM! Healthcare Communications: no timesheets, your birthday off, Star Wars Day and a team that wins TOGETHER.',
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about what's next.",
    lede: 'Tell us what you’re working on, who it needs to reach and where you’re stuck. A few lines are enough to get a conversation started.',
    seoDescription: 'Contact BOOM! Healthcare Communications in London, Bournemouth and Copenhagen.',
  },
}

export const team: TeamMember[] = [
  {
    slug: 'cory',
    name: 'Cory',
    fullName: 'Cory Inglis',
    role: 'Founder and CEO',
    discipline: 'Founder',
    bio: 'Cory spent the first ten years of his career at Novartis, working in sales, key account management, market access, market research and marketing for a global business unit. In 2005 he moved agency-side, and went on to lead market research, digital, medical communications and creative agencies on both sides of the Atlantic. He founded BOOM! in 2018 to bring an explosion of experience closer to what clients need.',
    photo: { src: '/images/team/cory.webp', alt: 'Cory Inglis, Founder and CEO of BOOM!', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/cory-inglis-0a40ab6/',
    email: 'cory@boom-cc.com',
    phone: '+44 7917 660874',
    isFounder: true,
    showOnContact: true,
  },
  {
    slug: 'viv',
    name: 'Viv',
    fullName: 'Viv Howells',
    role: 'Managing Director',
    discipline: 'Strategy · Delivery',
    bio: 'Viv pairs strong strategic drive with a deep knowledge of how projects really run. She brings the right cross-functional teams together at the right time, so strategy and delivery never drift apart.',
    photo: { src: '/images/team/viv.webp', alt: 'Viv Howells, Managing Director', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/vivien-howells-34515390/',
    email: 'viv@boom-cc.com',
    phone: '+45 3158 5363',
    showOnContact: true,
  },
  {
    slug: 'kim',
    name: 'Kim',
    fullName: 'Kim Hughes',
    role: 'Creative Director',
    discipline: 'Creative · Craft',
    bio: 'Kim has spent more than 25 years in healthcare communications. She started as an art director, became creative director and then joint managing director of a successful healthcare agency. At BOOM! she leads the creative output, and her job is simple to describe and hard to do: igniting great creative.',
    photo: { src: '/images/team/kim.webp', alt: 'Kim Hughes, Creative Director', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/kim-hughes-802a845/',
  },
  {
    slug: 'david',
    name: 'David',
    fullName: 'David Wright',
    role: 'Head of Scientific Communications',
    discipline: 'Science · Story',
    bio: 'David has worked across academia, pharma and healthcare communications agencies. Before joining BOOM! he ran his own agency, providing writing and client services support to pharma and to other agencies. He brings a real passion for clinical data and an eye for the detail that makes a scientific story stand up.',
    photo: { src: '/images/team/david.webp', alt: 'David Wright, Head of Scientific Communications', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/david-b-wright/',
  },
  {
    slug: 'ali',
    name: 'Ali',
    fullName: 'Ali Americanos',
    role: 'Head of Scientific Strategy',
    discipline: 'Evidence · Direction',
    bio: 'From launching CAR-T therapies to giving twenty-year-old brands a new lease of life, Ali has led strategy for pharma brands on the agency side. Nine years of medical writing mean he never loses sight of the compliance and regulatory detail behind a clear strategy.',
    photo: { src: '/images/team/ali.webp', alt: 'Ali Americanos, Head of Scientific Strategy', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/aliamericanos/',
  },
  {
    slug: 'laura',
    name: 'Laura',
    fullName: 'Laura Maguire',
    role: 'Head of Operations',
    discipline: 'Operations · Process',
    bio: 'Laura has spent more than 20 years in healthcare communications agencies, most of them in client services. She loves putting processes in place, and reviewing them, so that creative work runs more smoothly for the BOOM! team and for clients.',
    photo: { src: '/images/team/laura.webp', alt: 'Laura Maguire, Head of Operations', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/laura-maguire-32130729/',
  },
  {
    slug: 'amie',
    name: 'Amie',
    fullName: 'Amie Smith',
    role: 'Head of Client Services',
    discipline: 'Client services · Experience',
    bio: 'Amie is focused on making every client interaction better than the last. She leads and empowers the client services team, so that working with BOOM! feels smooth, engaging and consistently high quality.',
    photo: { src: '/images/team/amie.webp', alt: 'Amie Smith, Head of Client Services', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/amie-smith-6bb193a1/',
  },
]

export const brandMoments: BrandMoment[] = [
  {
    stage: 'Before launch',
    caseSlug: 'launch-in-a-crowded-class',
    title: 'Shape the story',
    body: 'The decisions made before launch set the course for years. We help you understand the market, test the idea with the people who matter and land the positioning and core claims that everything else will build on.',
    tags: ['Insights', 'Advisory boards', 'Positioning', 'Core claims'],
  },
  {
    stage: 'Launch',
    caseSlug: 'launch-in-a-crowded-class',
    title: 'Make the first impression count',
    body: "You only get one launch. We've worked on more than 50, including complex cell therapy launches, so we know where the time goes and where the approval risks sit.",
    proof: '50+ launches',
    tags: ['Launch campaigns', 'HCP education', 'Congress and meetings', 'Veeva content'],
  },
  {
    stage: 'Growth',
    caseSlug: 'a-new-lease-of-life',
    title: 'Find new reasons to talk',
    body: 'New indications, new audiences, new data. We help brands keep the story fresh without losing what made it work.',
    tags: ['Multi-indication therapies', 'Peer-to-peer', 'Case studies', 'Evidence generation'],
  },
  {
    stage: 'Under pressure',
    caseSlug: 'a-new-lease-of-life',
    title: "Defend what you've built",
    body: "A competitor launches. A biosimilar arrives. Exclusivity ends. We've helped brands through all three, and given some twenty-year-old brands a new lease of life along the way.",
    tags: ['Biosimilars', 'Brand substitution', 'Generics', 'Value propositions'],
  },
  {
    stage: 'Living with it',
    caseSlug: 'support-that-fits-real-lives',
    title: 'Support patients beyond the prescription',
    body: "The work doesn't stop at the prescription. We create support programmes and tools that help people understand their treatment and stay on it.",
    tags: ['Patient support programmes', 'Counselling tools', 'Adherence'],
  },
]

export const specialistAreas: SpecialistArea[] = [
  {
    name: 'Oncology and haematology',
    challenge: 'Fast-moving data, complex mechanisms and treatment decisions with very high stakes.',
    experience: 'CAR-T and cell therapy launches, leukaemias, lymphomas, myeloma, breast, lung and prostate cancer.',
  },
  {
    name: 'Immunology',
    challenge: 'Many treatment options, and patients who have often tried several already.',
    experience: "Crohn's and ulcerative colitis, lupus, psoriatic and rheumatoid arthritis, HLH.",
  },
  {
    name: 'Neurology',
    challenge: 'Long journeys, outcomes that are hard to measure and carers who are part of every decision.',
    experience: "Multiple sclerosis, Parkinson's, Alzheimer's, epilepsy, migraine, post-stroke spasticity.",
  },
  {
    name: 'Rare disease',
    challenge: 'Small populations, few specialists and every word under scrutiny.',
    experience: 'Gaucher disease, acromegaly, primary HLH, beta thalassaemia, haemophilia.',
  },
  {
    name: 'Medical devices',
    challenge: 'Audiences who buy on evidence and technique, not mechanism of action.',
    experience: 'Biosurgery, fibrin sealants, haemostatic matrices, surgery and wound care.',
  },
]

export const audiences = [
  { title: 'Specialist doctors', body: 'Busy, sceptical and fluent in the data. We respect their time and their intelligence.' },
  { title: 'Nurses and pharmacists', body: 'Often the people who make treatment work day to day.' },
  { title: 'Payers and market access', body: 'Our founder worked in market access at Novartis, so value stories are second nature.' },
  { title: 'Patients and carers', body: 'People first, diagnosis second.' },
  { title: 'Your own teams', body: 'Sales and medical colleagues who need to understand the story before they can tell it.' },
]

export const caseStudies: CaseStudy[] = [
  {
    slug: 'launch-in-a-crowded-class',
    title: 'Second-line oncology launch and Veeva multichannel strategy',
    therapyArea: 'Oncology',
    challenge: 'A new therapy entering a class with three established competitors and very similar headline data.',
    audience: 'Haematologists and specialist nurses in five European markets.',
    work: 'Advisory boards to find the unmet need competitors had missed, a positioning built around it and a multichannel launch campaign built in Veeva.',
    outcome: 'A shared story that marketing, medical and sales can adapt for approval in each launch market.',
    isExample: true,
  },
  {
    slug: 'a-new-lease-of-life',
    title: 'Immunology brand repositioning and HCP education in IBD',
    therapyArea: 'Immunology',
    challenge: 'A trusted brand losing share to newer options despite strong long-term evidence.',
    audience: 'Gastroenterologists and IBD nurses.',
    work: 'Research into why prescribers were switching, a refreshed value story and a peer-to-peer programme led by respected clinicians.',
    outcome: 'A clear reason to keep talking about the brand and a programme designed to expand into further markets.',
    isExample: true,
  },
  {
    slug: 'support-that-fits-real-lives',
    title: 'Rare disease patient support and treatment adherence',
    therapyArea: 'Rare disease',
    challenge: 'Patients on a complex treatment regimen were dropping off in the first months.',
    audience: 'Patients, carers and the small group of specialist centres that treat them.',
    work: 'Interviews with patients and carers, then a support programme and counselling tools built around the moments people found hardest.',
    outcome: 'Materials specialist nurses can use in clinic and a programme designed to grow with the patient community.',
    isExample: true,
  },
]

export const perks: Perk[] = [
  { title: 'No timesheets', body: 'Really. We trust people to do great work.' },
  { title: 'Your birthday off', body: 'An extra day off, every year. Obviously.' },
  { title: 'Star Wars Day', body: '4 May is a company holiday. May the fourth be with you.' },
  { title: '28 days plus bank holidays', body: 'And extra time off over Christmas at the CEO’s discretion.' },
  { title: 'Health cover', body: 'Private health, dental and life assurance, paid for by BOOM!.' },
  { title: 'Pension', body: '5% employer pension contribution.' },
]

/** How BOOM! says it succeeds (boom-cc.com, How we do it). */
/** The skills that sit behind all three disciplines (boom-cc.com, How we do it). */
export const capabilities = [
  { title: 'Science and medical writing', body: 'Scientists and medical writers who get the data right first time, and know what will survive review.' },
  { title: 'Digital and Veeva build', body: 'Sales aids, approved email and multichannel content, built and project managed through Veeva.' },
  { title: 'Client services and project management', body: 'One team that keeps the plan, the budget and the approvals moving, and keeps you in the loop.' },
]

/** Who BOOM! says it works best with (boom-cc.com, home page). */
export const processSteps = [
  { title: 'Get to the heart of it', body: 'Agree the challenge, the audience and what success looks like, before anyone opens a laptop.' },
  { title: 'Make a clear plan', body: 'A proper briefing, then owners, timings, account rhythm and budget tracking, set from day one.' },
  { title: 'Make it TOGETHER', body: 'The right specialists in the room early, with you involved, not just shown the result.' },
  { title: 'Check every detail', body: 'QC and sign-off built around your SOPs and approval process, including Veeva PromoMats.' },
  { title: 'Keep moving forward', body: 'Regular status reports, financial tracking, training where it helps, and lessons carried into the next project.' },
]

export const disciplines = [
  {
    id: 'insights',
    number: '01',
    name: 'Insights',
    heading: 'See it through their eyes.',
    body: 'Before we write a word, we want to know what your audience really thinks. What do they already believe? What gets in the way? What would make them change what they do? Research gets us past assumptions and close to real experience.',
    questions: ["Why isn't the data changing behaviour?", 'What do patients wish their doctor knew?', 'Which message will land with this specialist?'],
    services: ['Qualitative and quantitative research', 'Ethnography', 'Understanding and capturing advocacy', 'Advisory boards', 'Literature reviews'],
  },
  {
    id: 'strategy',
    number: '02',
    name: 'Strategy',
    heading: 'Find the thought that brings it all into focus.',
    body: 'Good strategy is mostly saying no. We help you decide who matters most, what they need to understand and why they should care, then build the story and core claims that will carry your brand for years, not just one campaign.',
    questions: ['Where can we win?', "What's our story against the competition?", 'Which claims will survive approval and still mean something?'],
    services: ['Strategic and multichannel planning', 'Positioning and value propositions', 'Story development', 'Core claims', 'Workshops and facilitation'],
  },
  {
    id: 'communications',
    number: '03',
    name: 'Communications',
    heading: 'Make the science matter.',
    body: 'This is where the idea meets the real world: a sales aid, a congress, a patient leaflet, an email to a busy consultant. We make complex science clear and memorable, and we build approval into the plan from day one, so good ideas don’t die in review.',
    questions: ['How do we make this memorable in 30 seconds?', 'What will a nurse actually use in clinic?', 'How do we get this through review on time?'],
    services: [
      'Creative concepts and multichannel campaigns',
      'Meetings and events, virtual and in person',
      'Peer-to-peer programmes',
      'Case studies and evidence generation',
      'Patient support programmes and counselling tools',
      'Internal engagement and training',
    ],
  },
]

/** Great Place To Work® UK certification page (updated October 2025) and 2026 Best Workplaces lists. */
export const workplace = {
  source: 'https://www.greatplacetowork.co.uk/certified-company/1575900',
  headline: { boom: '96%', typical: '54%' },
  stats: [
    { value: '100%', label: 'say people celebrate special events here' },
    { value: '100%', label: 'say new joiners are made to feel welcome' },
    { value: '100%', label: 'say people are treated fairly regardless of sexual orientation' },
    { value: '96%', label: 'say they have the resources and equipment to do their job' },
  ],
  lists: [
    { rank: '#18', name: 'Best Workplaces for Women™ 2026 (Small)' },
    { rank: '#23', name: 'Best Workplaces™ 2026 (Small)' },
    { rank: '#33', name: 'Best Workplaces for Wellbeing™ 2026 (Small)' },
    { rank: '#53', name: 'Best Workplaces for Development™ 2026 (Small)' },
    { rank: 'Listed', name: 'Best Workplaces in Advertising, Media & Marketing™ 2026' },
  ],
  moments: ['Star Wars Day outings', 'A five-year company conference in Lisbon', 'Summer socials in London', 'A BOO(m)! Halloween social'],
  badges: [
    { src: '/images/badges/best-workplaces-2026.webp', alt: 'Best Workplaces™ UK 2026, Great Place To Work®', rank: '#23', label: 'Best Workplaces™ (Small)' },
    { src: '/images/badges/women-2026.webp', alt: 'Best Workplaces™ for Women UK 2026, Great Place To Work®', rank: '#18', label: 'for Women' },
    { src: '/images/badges/wellbeing-2026.webp', alt: 'Best Workplaces™ for Wellbeing UK 2026, Great Place To Work®', rank: '#33', label: 'for Wellbeing' },
    { src: '/images/badges/development-2026.webp', alt: 'Best Workplaces™ for Development UK 2026, Great Place To Work®', rank: '#53', label: 'for Development' },
    { src: '/images/badges/advertising-media-marketing-2026.webp', alt: 'Best Workplaces™ in Advertising, Media & Marketing UK 2026, Great Place To Work®', rank: 'Listed', label: 'in Advertising, Media & Marketing' },
  ],
  photos: [
    { src: '/images/culture/five-year-conference.webp', caption: 'Walking through the history of BOOM! at our five-year company conference' },
    { src: '/images/culture/five-years-lisbon.webp', caption: 'Celebrating five years of BOOM! in Lisbon' },
    { src: '/images/culture/lisbon-coach.webp', caption: 'Off to explore Lisbon at our 2025 company conference' },
    { src: '/images/culture/summer-social-london.webp', caption: 'Our summer social in London' },
    { src: '/images/culture/star-wars-day.webp', caption: 'Out and about for Star Wars Day' },
    { src: '/images/culture/halloween-social-london.webp', caption: 'Our London BOO(m)! Halloween social' },
  ],
}

/** From BOOM!'s Sustainability Report 2026 (reporting period 2025). */
export const people2025 = [
  { value: '30', label: 'hours of training per person, on average' },
  { value: '6', label: 'internal promotions' },
  { value: '68%', label: 'of our people are women, and half of our executive team' },
  { value: '0', label: 'reports of discrimination or harassment' },
]

export const sustainability = {
  reportUrl: 'https://www.boom-cc.com/s/BOOM-Sustainability-Report-2026-k2tm.pptx',
  intro:
    'Building a sustainable, responsible business is central to how we work. We report against recognised standards, align our work with the UN Sustainable Development Goals, and hold ourselves accountable with real numbers, including the ones that show where we still have work to do.',
  pillars: [
    { title: 'Environmental action', body: 'Green considerations are built into day-to-day work, project planning and travel decisions. We are cloud-first on Microsoft infrastructure rather than running energy-hungry servers, and we sort and recycle our office waste at source.' },
    { title: 'People growth', body: 'Continuous training and development so everyone can grow their career and keep their expertise sharp: an average of 30 hours of training per person in 2025.' },
    { title: 'Culture and ethics', body: 'A transparent, accountable workplace where people at every level feel safe to speak up, with whistleblowing procedures and business ethics training for the whole team.' },
    { title: 'Client advisory', body: 'We help pharma and biotech partners build sustainable choices into launches, medical education events and patient materials.' },
  ],
  security: [
    'Annual risk assessments and real-time threat monitoring',
    'Multi-factor authentication, encryption and access controls',
    'Mandatory cybersecurity training for every member of staff',
    'Periodic audits and penetration testing',
    'An incident response plan and GDPR-compliant data governance',
  ],
  metrics2025: [
    { value: '0', label: 'information security incidents' },
    { value: '0', label: 'confirmed corruption incidents' },
    { value: '0', label: 'work-related ill health cases' },
    { value: '70%', label: 'of office waste recycled (22kg of 32kg)' },
  ],
  standards: [
    'Reporting aligned to the SASB Standards for Professional & Commercial Services',
    'A double-materiality assessment of what matters most to our impact and our business',
    'Work aligned to the UN Sustainable Development Goals, including SDG 12, Responsible Consumption and Production',
  ],
  next: 'In 2026 we introduced a supplier code of conduct, a supplier sustainability questionnaire, sustainable procurement training and business ethics training for the whole organisation.',
}


/** Glassdoor (London listing). Keep any quote short and attributed, and confirm BOOM! is happy to feature it. */
export const glassdoor = {
  url: 'https://www.glassdoor.co.uk/Reviews/BOOM-Healthcare-Communications-London-Reviews-EI_IE10466449.0,30_IL.31,37_IM1035.htm',
  rating: '4.8',
  reviews: 6,
  quote: 'Incredible teamwork, great culture, very easy to talk to anyone in the team.',
  attribution: 'Associate medical writer, Glassdoor review, August 2026',
}

/** The shape of the band, from BOOM!'s LinkedIn people page (65 associated members, November 2026). Aggregates only, no names. */
export const teamMix = {
  source: 'https://www.linkedin.com/company/boom-healthcare-communications/people/',
  disciplines: [
    { count: '20+', label: 'Client services and account management', note: 'From account executives to senior account directors' },
    { count: '15+', label: 'Medical and scientific writers', note: 'Associate to principal level' },
    { count: '15+', label: 'Creative, copy and design', note: 'Copywriters, designers, artworkers and art direction' },
    { count: '4', label: 'Strategists', note: 'Led by our Head of Scientific Strategy' },
    { count: '7', label: 'Leadership team', note: 'Senior people who stay close to the work' },
  ],
  backgrounds: ['Biology', 'Biomedical science', 'Chemistry', 'Pharmacology', 'Psychology', 'Graphic design'],
  where: 'Most of the band are based in the UK, around London, Bournemouth and Manchester, with colleagues in Copenhagen.',
}
