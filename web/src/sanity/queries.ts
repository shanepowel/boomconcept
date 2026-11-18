import { defineQuery } from 'next-sanity'

const imageFields = /* groq */ `{ asset, hotspot, crop, "alt": coalesce(alt, ""), "dimensions": asset->metadata.dimensions }`

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  name, description, teamSize, proofPoints, stats[]{value, label}, offices[]{city, detail, address, "lat": location.lat, "lng": location.lng, timeZone},
  enquiriesEmail, careersEmail, linkedinUrl, companyNumber, vatNumber, legal[]{label, href}
}`)

export const PAGE_QUERY = defineQuery(`*[_id == "page-" + $key][0]{
  eyebrow, title, lede, seoTitle, seoDescription
}`)

export const TEAM_QUERY = defineQuery(`*[_type == "teamMember"] | order(orderRank asc, name asc){
  "slug": slug.current, name, fullName, role, discipline, bio, linkedinUrl, email, phone,
  isFounder, showOnContact, photo${imageFields}
}`)

export const THERAPY_AREAS_QUERY = defineQuery(`*[_type == "therapyArea"] | order(name asc){
  name, conditions, "keywords": coalesce(keywords, [])
}`)

export const BRAND_MOMENTS_QUERY = defineQuery(`*[_type == "brandMoment"] | order(orderRank asc){
  stage, title, body, proof, "tags": coalesce(tags, [])
}`)

export const SPECIALIST_AREAS_QUERY = defineQuery(`*[_type == "specialistArea"] | order(orderRank asc){
  name, challenge, experience
}`)

export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy"] | order(orderRank asc){
  title, therapyArea, challenge, audience, work, outcome, "isExample": coalesce(isExample, false)
}`)

export const PERKS_QUERY = defineQuery(`*[_type == "perk"] | order(orderRank asc){ title, body }`)
