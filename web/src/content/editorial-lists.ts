const beliefs = [
  {
    title: 'Achieving together',
    short: 'Working with us should be the easy part.',
    body: 'We give our clients 100% support to do the best job they can: building brands, educating audiences, driving advocacy, and growing their own careers through the success of the work.',
  },
  {
    title: 'People at the heart',
    short: 'The journey should be enjoyable.',
    body: 'Teamwork, alignment with our clients and real experience come first. Good work is hard enough without making the process miserable, so we make it enjoyable.',
  },
  {
    title: 'Pride in everything we do',
    short: 'Craft and creativity, all the way through.',
    body: 'We strive for excellence in the craft, the creative and the science, and we tell its story with the same care, from the big idea to the last reference.',
  },
  {
    title: 'Process underpins performance',
    short: 'Consistency builds trust.',
    body: 'Tried-and-trusted ways of working mean everyone knows what is next and what is needed, so the team can spend its energy on the work, not the admin.',
  },
  {
    title: 'Results, the right way',
    short: 'The juice has to be worth the squeeze.',
    body: 'We challenge beliefs and change behaviour to win market share, always in the right way, and always checking that the effort is worth the result.',
  },
]

const values = [
  { title: 'Experience', body: "300+ brands, more than 50 launches and over 1,000 projects. We've learned what works, and what doesn't." },
  { title: 'Skill', body: 'Client services, project management, strategy, research, science, creative and digital, all under one roof.' },
  { title: 'Effort', body: 'The perfect mix of inspiration and perspiration. We know when to think and when to act.' },
  { title: 'Courage', body: 'The confidence to stand up and speak, and the good sense to sit down and listen.' },
]

const bestFit = [
  'Small and mid-sized brand teams that need senior specialists to work alongside them',
  'Challenging projects, where a broad mix of experience gets to the heart of the issue quickly',
  'Global, regional and local teams, including emerging markets',
]

export const milestones = [
  { year: 'Before', text: 'Cory spends his first ten years at Novartis, in sales, market access, research and marketing.' },
  { year: '2005', text: 'He moves agency-side, leading research, digital, medical communications and creative agencies.' },
  { year: '2018', text: 'BOOM! Healthcare Communications is founded in December.' },
  { year: '2022', text: 'BOOM! opens in Copenhagen with a Danish company, BOOM! Healthcare Communications ApS.' },
  { year: '2025', text: 'Certified a Great Place To Work®, and the whole team heads to Lisbon for the company conference.' },
  { year: '2026', text: 'Five UK Best Workplaces™ lists, including #18 for Women and #23 overall for small companies.' },
]

export const differentiators = [
  { title: 'Independent', body: "Your work matters more to us. It's personal." },
  { title: 'Healthcare experts', body: 'Everyone here is a healthcare communications specialist, so quality is built in.' },
  { title: 'The right band', body: 'We build the team around your needs, and bring in specific expertise whenever it helps.' },
  { title: 'Genuine partnership', body: 'Long-term relationships that grow, built on the everyday, not just the pitch.' },
  { title: 'Process with purpose', body: 'Process underpins our performance, because consistency builds trust.' },
]

export const approachSteps = [
  {
    title: 'Agree on the decision that matters.',
    body: 'Start with who needs to do something differently. If the brief is to build awareness, ask what the audience needs to understand or decide after they’ve seen the work.',
    output: 'A brief with a named audience and a clear objective',
  },
  {
    title: 'Look for what’s getting in the way.',
    body: 'Read the evidence and listen to the people closest to the problem. Bring the researcher, strategist and scientific lead together early, while the brief can still change.',
    output: 'A positioning and evidence base the team can test',
  },
  {
    title: 'Make the work and plan how it travels.',
    body: 'Develop the core story, then decide what belongs in each channel. Agree the claims, owners and review steps before production so local teams know what they can adapt.',
    output: 'A channel plan, review-ready materials and a handover',
  },
]

export const workingLife = [
  { title: 'Work across disciplines', body: 'A brief might bring a researcher, a medical writer and a creative together. You get to see how other people think and where your part changes the result.' },
  { title: 'Make time together count', body: 'We work remotely and face to face. Teams use the office, working sessions and client meetings for the conversations that are better in the room.' },
  { title: 'Be good company', body: 'Ask the question everyone is thinking, share what you know and give people credit for good work. That’s what being a Wilbury looks like on an ordinary day.' },
]

export const applicationQuestions = [
  { title: 'Where are you based?', body: 'Our teams work across London, Bournemouth and Copenhagen. A vacancy will explain where the role is based and how often you’ll need to be there.' },
  { title: 'What should I include in an introduction?', body: 'Tell us what you do, what kind of work you want to do next and why BOOM! caught your eye. A link to work you can share is welcome.' },
  { title: 'Can I ask about working arrangements or interview adjustments?', body: 'Yes. Raise it with the careers contact so you can discuss what the role needs and what would help you take part.' },
]

export const editorialDefaults = {
  about: { milestones, differentiators, beliefs, values, bestFit: bestFit.map((body) => ({ body })) },
  work: { approachSteps },
  careers: { workingLife, applicationQuestions },
}

export type EditorialLists = Partial<{
  [Page in keyof typeof editorialDefaults]: Partial<(typeof editorialDefaults)[Page]>
}>

export function getEditorialLists<Page extends keyof typeof editorialDefaults>(
  page: Page,
  editorial: EditorialLists | undefined,
): (typeof editorialDefaults)[Page] {
  return { ...editorialDefaults[page], ...editorial?.[page] }
}
