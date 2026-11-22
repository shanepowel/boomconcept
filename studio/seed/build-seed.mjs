// Builds seed/seed.ndjson from the website's fallback content, so the Studio starts with
// exactly what the site shows today. Run: npm run seed (needs `npx sanity login` first).
// Requires Node 22.6+ (TypeScript type stripping).
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const here = dirname(fileURLToPath(import.meta.url))
const content = await import(join(here, '../../web/src/content/fallback.ts'))
const { pageSections } = await import(join(here, '../../web/src/content/page-sections.ts'))
const { insights } = await import(join(here, '../../web/src/content/insights.ts'))
const { therapyAreas } = await import(join(here, '../../web/src/content/therapy-areas.ts'))

const key = () => randomUUID().slice(0, 12)
const rank = (i) => `0|${String.fromCharCode(105 + i)}00000:`
const docs = []

const s = content.settings
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: s.name,
  description: s.description,
  teamSize: s.teamSize,
  proofPoints: s.proofPoints,
  stats: s.stats.map((x) => ({ _key: key(), _type: 'stat', ...x })),
  offices: s.offices.map(({ lat, lng, ...x }) => ({ _key: key(), _type: 'office', ...x, location: lat != null ? { _type: 'geopoint', lat, lng } : undefined })),
  enquiriesEmail: s.enquiriesEmail,
  careersEmail: s.careersEmail,
  linkedinUrl: s.linkedinUrl,
  companyNumber: s.companyNumber,
  vatNumber: s.vatNumber,
  registeredOffice: s.registeredOffice,
  danishEntity: s.danishEntity,
  sustainabilityUrl: s.sustainabilityUrl,
  legal: s.legal.map((x) => ({ _key: key(), _type: 'legalLink', ...x })),
})

const reference = (id) => ({ _type: 'reference', _ref: id })

for (const [pageKey, { image, lineups, ...copy }] of Object.entries(content.pages)) {
  docs.push({
    _id: `page-${pageKey}`,
    _type: 'pageCopy',
    ...copy,
    sections: pageSections[pageKey],
    image: image && {
      _type: 'editorialImage',
      alt: image.alt,
      caption: image.caption,
      _sanityAsset: `image@file://../../web/public${image.src}`,
    },
    lineups: lineups?.map(({ id, people, caseSlug, ...lineup }) => ({
      _key: id,
      _type: 'briefLineup',
      ...lineup,
      people: people.map((slug) => ({ _key: slug, ...reference(`team-${slug}`) })),
      caseStudy: caseSlug && reference(`case-${caseSlug}`),
    })),
  })
}

content.team.forEach((m, i) => {
  const file = m.photo.src.split('/').pop()
  docs.push({
    _id: `team-${m.slug}`,
    _type: 'teamMember',
    orderRank: rank(i),
    fullName: m.fullName,
    name: m.name,
    slug: { _type: 'slug', current: m.slug },
    role: m.role,
    discipline: m.discipline,
    bio: m.bio,
    photo: { _type: 'image', alt: m.photo.alt, _sanityAsset: `image@file://./images/${file}` },
    linkedinUrl: m.linkedinUrl,
    email: m.email,
    phone: m.phone,
    isFounder: Boolean(m.isFounder),
    showOnContact: Boolean(m.showOnContact),
  })
})

content.caseStudies.forEach(({ slug, image, ...study }, i) => docs.push({
  _id: `case-${slug}`,
  _type: 'caseStudy',
  orderRank: rank(i),
  ...study,
  slug: { _type: 'slug', current: slug },
  image: image && {
    _type: 'editorialImage',
    alt: image.alt,
    caption: image.caption,
    credit: image.credit,
    _sanityAsset: `image@file://../../web/public${image.src}`,
  },
}))
insights.forEach(({ slug, image, sections, ...article }) => docs.push({
  _id: `insight-${slug}`,
  _type: 'insight',
  ...article,
  slug: { _type: 'slug', current: slug },
  image: image && {
    _type: 'editorialImage',
    alt: image.alt,
    caption: image.caption,
    credit: image.credit,
    _sanityAsset: `image@file://../../web/public${image.src}`,
  },
  sections: sections.map((section, i) => ({ _key: `section-${i + 1}`, _type: 'insightSection', ...section })),
}))
content.brandMoments.forEach((m, i) => docs.push({ _type: 'brandMoment', orderRank: rank(i), ...m }))
content.specialistAreas.forEach((a, i) => docs.push({ _type: 'specialistArea', orderRank: rank(i), ...a }))
content.perks.forEach((p, i) => docs.push({ _type: 'perk', orderRank: rank(i), ...p }))
therapyAreas.forEach((t) => docs.push({ _type: 'therapyArea', ...t }))

const clean = (doc) => Object.fromEntries(Object.entries(doc).filter(([, v]) => v !== undefined))
writeFileSync(join(here, 'seed.ndjson'), docs.map((d) => JSON.stringify(clean(d))).join('\n') + '\n')
console.log(`Wrote ${docs.length} documents to seed/seed.ndjson`)
