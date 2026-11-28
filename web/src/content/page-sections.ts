export type SectionCopy = { eyebrow?: string; title: string; intro?: string }

export const pageSections = {
  home: {
    services: { title: 'Some of the work we do…' },
    insights: { title: 'Latest from the team' },
  },
  work: {
    approach: { title: 'Before there’s anything to show, there’s a decision to make.', intro: 'Here’s how we go from an open question to something a healthcare team can review, use and adapt.' },
    moreWork: { title: 'Different briefs, different starting points.' },
  },
  services: {
    capabilities: { title: 'The skills behind the work.', eyebrow: 'Behind every discipline' },
    delivery: { title: 'Plan for approval from day one.', eyebrow: 'How we work', intro: 'We agree who signs off, how quality checks work and where your SOPs fit before production starts. You can see what’s in review, what’s due next and how the work is tracking against the budget.' },
  },
  therapyAreas: {
    directory: { title: '18 specialisms. 70+ therapy areas.', eyebrow: 'The full list', intro: 'Search by condition, treatment or abbreviation.' },
    experience: { title: 'Where we have the deepest experience.', eyebrow: 'Where we go deepest', intro: 'Start with what makes the brief difficult, then see what our team has worked on.' },
  },
  about: {
    team: { title: 'The senior team, up close.', eyebrow: 'The band', intro: 'We borrow from the Traveling Wilburys: bring good people together and give them room to do their best work. These are the people who lead the briefs.' },
  },
  careers: {
    workingLife: { title: 'Good at your job. Generous with what you know.', intro: 'That’s our version of a Wilbury. Here’s what it means when we work together.' },
    culture: { title: 'Away from the brief.', intro: 'A company birthday in Lisbon, a summer social in London and a day off for Star Wars Day. Here’s a look at life together outside the work.' },
  },
  contact: {
    questions: { title: 'Good to know before we talk.', eyebrow: 'Questions' },
  },
} satisfies Record<string, Record<string, SectionCopy>>

export const sectionLabels = {
  services: 'Services overview',
  insights: 'Insights feature',
  approach: 'Our approach',
  moreWork: 'More case studies',
  capabilities: 'Capabilities',
  delivery: 'Delivery and approvals',
  directory: 'Therapy directory',
  experience: 'Specialist experience',
  team: 'Leadership team',
  workingLife: 'Life at BOOM!',
  culture: 'Culture gallery',
  questions: 'Frequently asked questions',
}
