export const mainNav = [
  { href: '/work', label: 'Work' },
  { href: '/what-we-do', label: 'What we do' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
] as const

export const footerNav = [
  {
    title: 'What we do',
    links: [
      { href: '/what-we-do', label: 'Capabilities' },
      { href: '/expertise', label: 'Expertise' },
      { href: '/work', label: 'Work' },
    ],
  },
  {
    title: 'About',
    links: [
      { href: '/about', label: 'Our values' },
      { href: '/how-we-work', label: 'How we work' },
      { href: '/team', label: 'The band' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { href: '/contact', label: 'Start a conversation' },
      { href: '/contact?topic=credentials', label: 'Request credentials' },
      { href: '/how-we-work#procurement', label: 'Procurement' },
    ],
  },
] as const
