// Shapes the site renders. Sanity documents are mapped into these in src/lib/data.ts,
// and src/content/fallback.ts provides the same shapes when Sanity is not configured.

export type Img = { src: string; alt: string; width?: number; height?: number }

export type PageCopy = {
  eyebrow?: string
  title: string
  lede?: string
  seoTitle?: string
  seoDescription?: string
}

export type PageKey = 'home' | 'work' | 'services' | 'therapyAreas' | 'about' | 'careers' | 'contact'

export type Stat = { value: string; label: string }
export type Office = {
  city: string
  detail?: string
  address?: string
  lat?: number
  lng?: number
  timeZone?: string
}

export type SiteSettings = {
  name: string
  description: string
  teamSize: string
  proofPoints: string[]
  stats: Stat[]
  offices: Office[]
  enquiriesEmail: string
  careersEmail: string
  linkedinUrl: string
  companyNumber: string
  vatNumber: string
  registeredOffice: string
  danishEntity: { name: string; cvr: string }
  sustainabilityUrl: string
  legal: { label: string; href: string }[]
}

export type TeamMember = {
  slug: string
  name: string
  fullName: string
  role: string
  discipline: string
  bio: string
  photo: Img
  linkedinUrl?: string
  email?: string
  isFounder?: boolean
  showOnContact?: boolean
}

export type TherapyArea = { name: string; conditions: string; keywords: string[] }
export type BrandMoment = { stage: string; title: string; body: string; proof?: string; tags: string[] }
export type SpecialistArea = { name: string; challenge: string; experience: string }
export type CaseStudy = {
  title: string
  therapyArea: string
  challenge: string
  audience: string
  work: string
  outcome: string
  isExample: boolean
}
export type Perk = { title: string; body: string }
