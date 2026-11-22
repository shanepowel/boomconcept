import 'server-only'
import { stegaClean } from 'next-sanity'
import { insights, type Insight } from '@/content/insights'
import * as fallback from '@/content/fallback'
import { therapyAreas as fallbackTherapyAreas } from '@/content/therapy-areas'
import type {
  BrandMoment,
  CaseStudy,
  CareersRole,
  Img,
  PageCopy,
  PageKey,
  Perk,
  SiteSettings,
  SpecialistArea,
  TeamMember,
  TherapyArea,
} from '@/content/types'
import { isSanityConfigured } from '@/sanity/env'
import { urlFor } from '@/sanity/image'
import { sanityFetch } from '@/sanity/live'
import {
  BRAND_MOMENTS_QUERY,
  CASE_STUDIES_QUERY,
  CAREERS_ROLES_QUERY,
  INSIGHTS_QUERY,
  PAGE_QUERY,
  PERKS_QUERY,
  SETTINGS_QUERY,
  SPECIALIST_AREAS_QUERY,
  TEAM_QUERY,
  THERAPY_AREAS_QUERY,
} from '@/sanity/queries'

/**
 * Every getter reads from Sanity once NEXT_PUBLIC_SANITY_PROJECT_ID is set, and falls back to
 * src/content/fallback.ts when Sanity is not configured or a document has not been created yet.
 */
async function fromSanity<T>(query: string, params: Record<string, unknown> = {}, opts: { stega?: boolean } = {}) {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query, params, stega: opts.stega })
    return data as T
  } catch (error) {
    console.error('[sanity] fetch failed, using fallback content', error)
    return null
  }
}

const hasItems = <T,>(list: T[] | null | undefined): list is T[] => Array.isArray(list) && list.length > 0

export async function getSettings(opts: { stega?: boolean } = {}): Promise<SiteSettings> {
  const data = await fromSanity<Partial<SiteSettings>>(SETTINGS_QUERY, {}, opts)
  if (!data) return fallback.settings
  // Merge so a half-filled settings document never blanks the site.
  return Object.fromEntries(
    Object.entries(fallback.settings).map(([key, value]) => {
      const incoming = data[key as keyof SiteSettings]
      const usable = Array.isArray(incoming) ? incoming.length > 0 : incoming !== null && incoming !== undefined && incoming !== ''
      return [key, usable ? incoming : value]
    }),
  ) as SiteSettings
}

type SanityImage = Parameters<typeof urlFor>[0] & { asset?: unknown; alt?: string; caption?: string; credit?: string }

function toImage(image?: SanityImage): Img | undefined {
  if (!image?.asset) return undefined
  return { src: urlFor(image).width(1440).url(), alt: image.alt || '', caption: image.caption, credit: image.credit }
}

export async function getPage(key: PageKey, opts: { stega?: boolean } = {}): Promise<PageCopy> {
  const data = await fromSanity<(Partial<Omit<PageCopy, 'image'>> & { image?: SanityImage }) | null>(PAGE_QUERY, { key }, opts)
  const base = fallback.pages[key]
  if (!data) return base
  return {
    eyebrow: data.eyebrow || base.eyebrow,
    title: data.title || base.title,
    lede: data.lede || base.lede,
    seoTitle: data.seoTitle || base.seoTitle,
    seoDescription: data.seoDescription || base.seoDescription,
    image: toImage(data.image) ?? base.image,
    lineups: data.lineups?.map((lineup) => ({
      ...lineup,
      disciplines: lineup.disciplines ?? [],
      people: stegaClean(lineup.people ?? []).filter(Boolean),
      caseSlug: lineup.caseSlug ? stegaClean(lineup.caseSlug) : undefined,
    })) ?? base.lineups,
  }
}

type SanityTeamMember = Omit<TeamMember, 'photo'> & {
  photo?: { asset?: unknown; alt?: string; dimensions?: { width: number; height: number } }
}

export async function getTeam(): Promise<TeamMember[]> {
  const data = await fromSanity<SanityTeamMember[]>(TEAM_QUERY)
  if (!hasItems(data)) return fallback.team
  return data.map((member) => ({
    ...member,
    slug: stegaClean(member.slug),
    phone: member.phone ? stegaClean(member.phone) : undefined,
    photo: member.photo?.asset
      ? {
          src: urlFor(member.photo as never).width(900).height(900).fit('crop').url(),
          alt: member.photo.alt || `${member.fullName}, ${member.role}`,
          width: 900,
          height: 900,
        }
      : { src: '/images/boom-splash.webp', alt: '', width: 900, height: 900 },
  }))
}

export async function getTherapyAreas(): Promise<TherapyArea[]> {
  const data = await fromSanity<TherapyArea[]>(THERAPY_AREAS_QUERY)
  return hasItems(data) ? data : fallbackTherapyAreas
}

export async function getBrandMoments(): Promise<BrandMoment[]> {
  const data = await fromSanity<BrandMoment[]>(BRAND_MOMENTS_QUERY)
  return hasItems(data) ? data : fallback.brandMoments
}

export async function getSpecialistAreas(): Promise<SpecialistArea[]> {
  const data = await fromSanity<SpecialistArea[]>(SPECIALIST_AREAS_QUERY)
  return hasItems(data) ? data : fallback.specialistAreas
}

export async function getCaseStudies(opts: { stega?: boolean } = {}): Promise<CaseStudy[]> {
  const data = await fromSanity<(Omit<CaseStudy, 'image'> & { image?: SanityImage })[]>(CASE_STUDIES_QUERY, {}, opts)
  return hasItems(data) ? data.map((study) => ({ ...study, slug: stegaClean(study.slug), image: toImage(study.image) })) : fallback.caseStudies
}

export async function getPerks(): Promise<Perk[]> {
  const data = await fromSanity<Perk[]>(PERKS_QUERY)
  return hasItems(data) ? data : fallback.perks
}

export const { audiences, values, beliefs, capabilities, bestFit, processSteps, disciplines, workplace, glassdoor, people2025, sustainability, teamMix } = fallback

export async function getInsights(opts: { stega?: boolean } = {}): Promise<Insight[]> {
  const data = await fromSanity<(Omit<Insight, 'image'> & { image?: SanityImage })[]>(INSIGHTS_QUERY, {}, opts)
  return hasItems(data) ? data.map((article) => ({
    ...article,
    slug: stegaClean(article.slug),
    topic: stegaClean(article.topic),
    sections: article.sections ?? [],
    image: toImage(article.image),
  })) : insights
}

export async function getCareersRoles(): Promise<CareersRole[]> {
  const data = await fromSanity<CareersRole[]>(CAREERS_ROLES_QUERY)
  return (data ?? []).flatMap((role) => {
    const applicationUrl = stegaClean(role.applicationUrl)
    const parsed = URL.parse(applicationUrl)
    return parsed?.protocol === 'https:' ? [{ ...role, applicationUrl: parsed.href }] : []
  })
}
