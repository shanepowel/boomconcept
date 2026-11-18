export const mainNav = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/therapy-areas', label: 'Therapy areas' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
] as const

export const footerNav = [
  {
    title: 'What we do',
    links: [
      { href: '/services', label: 'Services' },
      { href: '/services#how-we-work', label: 'How we work' },
      { href: '/therapy-areas', label: 'Therapy areas' },
      { href: '/work', label: 'Work' },
    ],
  },
  {
    title: 'Who we are',
    links: [
      { href: '/about', label: 'About BOOM!' },
      { href: '/about#band', label: 'The band' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/contact?topic=credentials', label: 'Request credentials' },
      { href: '/services#procurement', label: 'Procurement' },
    ],
  },
] as const
