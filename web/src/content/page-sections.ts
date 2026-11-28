import type { PageCopy } from './types'

export type SectionCopy = { eyebrow?: string; title: string; intro?: string }

// Default headings and copy for every editable section. Each entry becomes a field in Sanity
// under Page copy → Page sections, so section IDs must be unique across all pages.
export const pageSections = {
  home: {
    values: { title: 'Partnering with you, we succeed through experience, skill, effort and courage.' },
    lineup: { title: 'The right team for your brief.', intro: 'We build each team around the work, bringing in specialists whenever they’re needed. Choose a brief to see where we’d start and who you’d work with.' },
    founder: { title: 'Ten years at Novartis. Then BOOM!', intro: 'Cory Inglis spent the first decade of his career at Novartis, across sales, key accounts, market access, research and marketing. He went on to lead research, digital, medical communications and creative agencies on both sides of the Atlantic, then founded BOOM! in 2018 to bring an explosion of experience to the people who need it.' },
    services: { title: 'Some of the work we do…' },
    lean: { title: 'Small team, big brief? That’s our favourite kind.', intro: 'We love the passion and energy of small to mid-size teams, and of teams that are leanly resourced with a genuine need for partnership. We go looking for challenging projects, because that’s where our experience gets us to the heart of the issue quickly. We challenge beliefs and change behaviour, and we always make sure the juice is worth the squeeze!' },
    people: { title: 'We aim to be the agency our clients would absolutely hate to lose, and our people would hate to leave!', intro: '96% of our people say BOOM! is a great place to work, and we’re ranked #23 in the UK’s Best Workplaces 2026 (Small).' },
    insights: { title: 'Latest from the team' },
    homeCta: { title: 'Got a challenging brief? Let’s light the fuse.', intro: 'Tell us who you need to reach and what has to change. We’ll bring the right people to the first conversation.' },
  },
  work: {
    approach: { title: 'Before there’s anything to show, there’s a decision to make.', intro: 'Here’s how we go from an open question to something a healthcare team can review, use and adapt.' },
    moreWork: { title: 'Different briefs, different starting points.' },
    workCta: { title: 'What’s the decision in front of you?', intro: 'Tell us where the brief is stuck, who it needs to reach and what has to happen next.' },
  },
  services: {
    veeva: { title: 'Built for how pharma actually works.', intro: 'We’re Veeva Multichannel and Vault Content Partners. We plan for your channels, review process and local approvals from the first brief.' },
    moments: { title: 'Find the moment that feels familiar.', intro: 'Pick the stage your brand is at to see where we can help.' },
    capabilities: { title: 'The skills behind the work.' },
    delivery: { title: 'Plan for approval from day one.', intro: 'We agree who signs off, how quality checks work and where your SOPs fit before production starts. You can see what’s in review, what’s due next and how the work is tracking against the budget.' },
    procurement: { title: 'Ready for your supplier checks.' },
    servicesCta: { title: 'Bring us the complicated brief.', intro: 'We’ll ask the right questions and put the right people on it.' },
  },
  therapyAreas: {
    directory: { title: '18 specialisms. 70+ therapy areas.', intro: 'Search by condition, treatment or abbreviation.' },
    experience: { title: 'Where we have the deepest experience.', intro: 'Start with what makes the brief difficult, then see what our team has worked on.' },
    across: { title: 'When the challenge crosses categories.', intro: 'Some briefs need experience of a particular market change or treatment pathway. We bring that perspective into the team alongside therapy-area knowledge.' },
    therapyCta: { title: 'Got a brief in one of these areas?', intro: 'Tell us the challenge. We’ll put the right people around it.' },
  },
  about: {
    team: { title: 'The senior team, up close.', intro: 'We borrow from the Traveling Wilburys: bring good people together and give them room to do their best work. These are the people who lead the briefs.' },
    story: { title: 'Ten years inside pharma. Then he switched sides.' },
    timeline: { title: 'The story so far' },
    beliefs: { title: 'We believe in achieving TOGETHER.', intro: 'Creativity and chemistry win pitches. It’s the everyday that produces great results and long partnerships, so that’s where our beliefs live.' },
    howWeSucceed: { title: 'Experience. Skill. Effort. Courage.', intro: 'Four things we bring to every brief, and the reason clients stay.' },
    whyChoose: { title: 'The agency you’d absolutely hate to lose.', intro: 'It’s not one single thing that makes working with us a success. It’s several, and they depend on each other. Our aim is simple: to be the agency our clients would hate to lose, and the place our people would hate to leave.' },
    bestFitHeading: { title: 'Who we work best with' },
    aboutCta: { title: 'Let’s achieve something TOGETHER.', intro: 'Tell us what you’re working on and we’ll bring the right people to the first conversation.' },
  },
  careers: {
    roles: { title: 'Join the band.', intro: 'Nothing open right now. Good Wilburys don’t wait for an advert, though. Tell us what you do and what you’d like to do next.' },
    workingLife: { title: 'Good at your job. Generous with what you know.', intro: 'That’s our version of a Wilbury. Here’s what it means when we work together.' },
    culture: { title: 'Away from the brief.', intro: 'A company birthday in Lisbon, a summer social in London and a day off for Star Wars Day. Here’s a look at life together outside the work.' },
    benefits: { title: 'The rider.', intro: 'Every band has one. Here’s ours.' },
    applying: { title: 'Before you apply.' },
    careersCta: { title: 'Think you’re a Wilbury?', intro: 'Tell us what you do, what you’d like to do next and why BOOM! caught your eye. A link to work you can share is welcome.' },
  },
  contact: {
    questions: { title: 'Good to know before we talk.' },
    offices: { title: 'Three bases. One team.' },
  },
} satisfies Record<string, Record<string, SectionCopy>>

export const sectionLabels = {
  values: 'Values introduction',
  lineup: 'Team line-up',
  founder: 'Founder story',
  services: 'Services overview',
  lean: 'Lean teams',
  people: 'People and workplace',
  insights: 'Insights feature',
  homeCta: 'Closing call to action',
  approach: 'Our approach',
  moreWork: 'More case studies',
  workCta: 'Closing call to action',
  veeva: 'Veeva partnership',
  moments: 'When to call us',
  capabilities: 'Capabilities',
  delivery: 'Delivery and approvals',
  procurement: 'Procurement',
  servicesCta: 'Closing call to action',
  directory: 'Therapy directory',
  experience: 'Specialist experience',
  across: 'Across therapy areas',
  therapyCta: 'Closing call to action',
  team: 'Leadership team',
  story: 'Founder story',
  timeline: 'Timeline heading',
  beliefs: 'What we believe',
  howWeSucceed: 'How we succeed',
  whyChoose: 'Why choose BOOM!',
  bestFitHeading: 'Who we work best with',
  aboutCta: 'Closing call to action',
  roles: 'Open roles',
  workingLife: 'Life at BOOM!',
  culture: 'Culture gallery',
  benefits: 'Benefits',
  applying: 'Before you apply',
  careersCta: 'Closing call to action',
  questions: 'Frequently asked questions',
  offices: 'Offices',
} satisfies Record<string, string>

type Sections = typeof pageSections

/** A section's copy: whatever editors set in Sanity, falling back field by field to the defaults above. */
export function sectionCopy<K extends keyof Sections>(page: PageCopy, key: K, id: keyof Sections[K] & string): SectionCopy {
  const defaults = pageSections[key][id] as SectionCopy
  const edited = page.sections?.[id]
  return {
    eyebrow: edited?.eyebrow ?? defaults.eyebrow,
    title: edited?.title?.trim() ? edited.title : defaults.title,
    intro: edited?.intro?.trim() ? edited.intro : defaults.intro,
  }
}
