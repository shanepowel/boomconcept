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
    'An independent healthcare communications agency of 65 specialists. We bring the right people together around every brief, for pharma, biotech and medtech teams.',
  teamSize: '65',
  proofPoints: [
    'Independent and award-winning',
    'Veeva Multichannel and Vault Content Partner',
    'Recognised as a great place to work in 2026',
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
    { city: 'Bournemouth', detail: 'United Kingdom', lat: 50.7192, lng: -1.8808, timeZone: 'Europe/London' },
    { city: 'Copenhagen', detail: 'Denmark', lat: 55.6761, lng: 12.5683, timeZone: 'Europe/Copenhagen' },
  ],
  enquiriesEmail: 'cory@boom-cc.com',
  careersEmail: 'cory@boom-cc.com',
  linkedinUrl: 'https://www.linkedin.com/company/boom-healthcare-communications',
  companyNumber: '11717730',
  vatNumber: '314319136',
  legal: [
    { label: 'Terms', href: 'https://www.boom-cc.com/terms-1' },
    { label: 'Privacy', href: 'https://www.boom-cc.com/privacy-policy-1' },
    { label: 'Cookies', href: 'https://www.boom-cc.com/cookies' },
  ],
}

export const pages: Record<PageKey, PageCopy> = {
  home: {
    title: 'Healthcare communications, played by the right band.',
    lede: "We're an independent team of 65 specialists in insight, strategy, science and creative. For every brief, we bring together the right people to help pharma, biotech and medtech teams build brands, educate audiences and drive advocacy.",
    seoTitle: 'BOOM! Healthcare Communications | The right band for every brief',
    seoDescription:
      'Independent healthcare communications agency. 65 specialists, 300+ brands, 50+ launches and 70+ therapy areas, for pharma, biotech and medtech teams.',
  },
  whatWeDo: {
    eyebrow: 'What we do',
    title: 'An explosion of experience.',
    lede: 'Most agencies are good at one part of the journey. We cover the whole of it, so the insight that shapes your strategy is still there in the final approved asset, and nothing gets lost in a handover.',
    seoDescription:
      'Insights, strategy and communications for pharma, biotech and medtech brands, from the first question to the final approved asset.',
  },
  work: {
    eyebrow: 'Work',
    title: 'Real challenges. Work that moved things on.',
    lede: "A few of the briefs we're proud of: the problem, the people it had to reach, what we made and what changed.",
    seoDescription: 'Selected healthcare communications work by BOOM!, from launches to patient support.',
  },
  expertise: {
    eyebrow: 'Expertise',
    title: "We've been here before.",
    lede: "Most briefs we see are a version of a challenge we've already worked through. A launch on a tight timeline. A crowded class. A twenty-year-old brand that needs a reason to be talked about again. Across 300+ brands, 50+ launches and more than 70 therapy areas, we've built up the kind of experience you only get by doing the work.",
    seoDescription:
      'Healthcare communications expertise across 70+ therapy areas, from pre-launch and launch to biosimilars, rare disease and patient support.',
  },
  howWeWork: {
    eyebrow: 'How we work',
    title: 'Big ideas. No surprises.',
    lede: 'In a regulated industry, a great idea is only great if it gets approved, on time and on budget. So we pair creative ambition with a process clients can rely on.',
    seoDescription: 'How BOOM! works: a clear five-step process, approval built in from day one, and a team ready for procurement.',
  },
  about: {
    eyebrow: 'About BOOM!',
    title: 'Experience. Skill. Effort. Courage.',
    lede: 'Four values, held together by one word: TOGETHER. Founded in 2018, independent ever since, and aiming to be the agency clients would hate to lose.',
    seoDescription: "BOOM!'s values and what it's like to work with an independent, founder-led healthcare communications agency.",
  },
  team: {
    eyebrow: 'The band',
    title: 'Great alone. Better TOGETHER.',
    lede: 'The Traveling Wilburys were five musicians who could each fill a stadium, and who made something better together. That is how we build teams: senior specialists, each brilliant in their own field, brought together around your brief.',
    seoDescription: "Meet BOOM!'s leadership team: pharma-side experience, scientific depth and creative leadership.",
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Are you a Wilbury?',
    lede: 'Bob Dylan and Tom Petty used to play a game. They would name someone famous and ask: "Are they a Wilbury?" Did they have that extra something? We still ask the same question about everyone who joins BOOM!.',
    seoDescription: 'Careers at BOOM! Healthcare Communications: no timesheets, your birthday off, Star Wars Day and a team that wins TOGETHER.',
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about what's next.",
    lede: 'Bring us the challenge, the half-formed idea or the tricky question. Choose a route below and we will put the right person on it.',
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
    phone: '+44 (0)7917 660874',
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
    bio: 'Kim has spent more than 25 years in healthcare communications. She started as an art director, became creative director and then joint managing director of a successful healthcare agency. At BOOM! she leads the creative work and makes sure the ideas are as strong as the science behind them.',
    photo: { src: '/images/team/kim.webp', alt: 'Kim Hughes, Creative Director', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/kim-hughes-802a845/',
  },
  {
    slug: 'david',
    name: 'David',
    fullName: 'David Wright',
    role: 'Head of Scientific Communications',
    discipline: 'Science · Story',
    bio: 'David has worked across academia, pharma and agencies, and before joining BOOM! he ran his own healthcare communications agency. He loves clinical data and has an eye for the detail that makes a scientific story stand up.',
    photo: { src: '/images/team/david.webp', alt: 'David Wright, Head of Scientific Communications', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/david-b-wright/',
  },
  {
    slug: 'ali',
    name: 'Ali',
    fullName: 'Ali Americanos',
    role: 'Head of Scientific Strategy',
    discipline: 'Evidence · Direction',
    bio: 'From launching CAR-T therapies to giving twenty-year-old brands a new lease of life, Ali connects deep therapy area knowledge to clear direction. He brings years of medical writing to every strategy.',
    photo: { src: '/images/team/ali.webp', alt: 'Ali Americanos, Head of Scientific Strategy', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/aliamericanos/',
  },
  {
    slug: 'laura',
    name: 'Laura',
    fullName: 'Laura Maguire',
    role: 'Head of Operations',
    discipline: 'Operations · Process',
    bio: 'Laura has spent more than 20 years in healthcare agencies and knows client service from both sides. She makes sure the way we work makes the work better, and more enjoyable for everyone.',
    photo: { src: '/images/team/laura.webp', alt: 'Laura Maguire, Head of Operations', width: 750, height: 750 },
  },
  {
    slug: 'amie',
    name: 'Amie',
    fullName: 'Amie Smith',
    role: 'Head of Client Services',
    discipline: 'Client services · Experience',
    bio: 'Amie puts real thought into every client relationship. Her job is to make working with BOOM! feel easy, from the first brief to the final sign-off.',
    photo: { src: '/images/team/amie.webp', alt: 'Amie Smith, Head of Client Services', width: 750, height: 750 },
    linkedinUrl: 'https://www.linkedin.com/in/amie-smith-6bb193a1/',
  },
]

export const brandMoments: BrandMoment[] = [
  {
    stage: 'Before launch',
    title: 'Shape the story',
    body: 'The decisions made before launch set the course for years. We help you understand the market, test the idea with the people who matter and land the positioning and core claims that everything else will build on.',
    tags: ['Insights', 'Advisory boards', 'Positioning', 'Core claims'],
  },
  {
    stage: 'Launch',
    title: 'Make the first impression count',
    body: "You only get one launch. We've worked on more than 50, including complex cell therapy launches, so we know where the time goes and where the approval risks sit.",
    proof: '50+ launches',
    tags: ['Launch campaigns', 'HCP education', 'Congress and meetings', 'Veeva content'],
  },
  {
    stage: 'Growth',
    title: 'Find new reasons to talk',
    body: 'New indications, new audiences, new data. We help brands keep the story fresh without losing what made it work.',
    tags: ['Multi-indication therapies', 'Peer-to-peer', 'Case studies', 'Evidence generation'],
  },
  {
    stage: 'Under pressure',
    title: "Defend what you've built",
    body: "A competitor launches. A biosimilar arrives. Exclusivity ends. We've helped brands through all three, and given some twenty-year-old brands a new lease of life along the way.",
    tags: ['Biosimilars', 'Brand substitution', 'Generics', 'Value propositions'],
  },
  {
    stage: 'Living with it',
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
    title: 'A second-line launch in a crowded class',
    therapyArea: 'Oncology',
    challenge: 'A new therapy entering a class with three established competitors and very similar headline data.',
    audience: 'Haematologists and specialist nurses in five European markets.',
    work: 'Advisory boards to find the unmet need competitors had missed, a positioning built around it and a multichannel launch campaign built in Veeva.',
    outcome: 'One story shared by marketing, medical and sales, approved first time in every launch market.',
    isExample: true,
  },
  {
    title: 'A new lease of life for an established brand',
    therapyArea: 'Immunology',
    challenge: 'A trusted brand losing share to newer options despite strong long-term evidence.',
    audience: 'Gastroenterologists and IBD nurses.',
    work: 'Research into why prescribers were switching, a refreshed value story and a peer-to-peer programme led by respected clinicians.',
    outcome: 'A clear reason to keep talking about the brand, and a programme the client rolled out to further markets.',
    isExample: true,
  },
  {
    title: 'Support that fits real lives',
    therapyArea: 'Rare disease',
    challenge: 'Patients on a complex treatment regimen were dropping off in the first months.',
    audience: 'Patients, carers and the small group of specialist centres that treat them.',
    work: 'Interviews with patients and carers, then a support programme and counselling tools built around the moments people found hardest.',
    outcome: 'Materials that specialist nurses chose to use in clinic, and a programme designed to grow with the patient community.',
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

export const values = [
  { title: 'Experience', body: "300+ brands and more than 50 launches. We've learned what works, and what doesn't." },
  { title: 'Skill', body: 'Strategy, research, science, creative, digital and project management, under one roof.' },
  { title: 'Effort', body: 'The right mix of inspiration and perspiration. We know when to think and when to act.' },
  { title: 'Courage', body: 'The confidence to speak up, and the good sense to sit down and listen.' },
]

export const processSteps = [
  { title: 'Get to the heart of it', body: 'Agree the challenge, the audience and what success looks like, before anyone opens a laptop.' },
  { title: 'Make a clear plan', body: 'Owners, timings, account rhythm and budget tracking, set from day one.' },
  { title: 'Make it TOGETHER', body: 'The right specialists in the room early, with you involved, not just shown the result.' },
  { title: 'Check every detail', body: 'QC and sign-off built around your SOPs and approval process, including Veeva PromoMats.' },
  { title: 'Keep moving forward', body: 'Regular status reports, open conversations and lessons carried into the next project.' },
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
