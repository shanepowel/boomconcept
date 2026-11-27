import { defineQuery } from 'next-sanity'

const imageFields = /* groq */ `{ asset, hotspot, crop, caption, credit, "alt": coalesce(alt, ""), "dimensions": asset->metadata.dimensions }`

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  name, description, teamSize, proofPoints, stats[]{value, label}, offices[]{city, detail, address, "lat": location.lat, "lng": location.lng, timeZone},
  enquiriesEmail, careersEmail, linkedinUrl, companyNumber, vatNumber, registeredOffice, danishEntity, sustainabilityUrl, legal[]{label, href}
}`)

export const PAGE_QUERY = defineQuery(`*[_id == "page-" + $key][0]{
  eyebrow, title, lede, seoTitle, seoDescription, sections, servicesCopy, editorialLists, image${imageFields},
  lineups[]{ "id": _key, title, approach, disciplines, "people": people[]->slug.current,
    "caseSlug": coalesce(caseStudy->slug.current, caseStudy->_id) }
}`)

export const TEAM_QUERY = defineQuery(`*[_type == "teamMember"] | order(orderRank asc, name asc){
  "slug": slug.current, name, fullName, role, discipline, bio, linkedinUrl, email, phone,
  isFounder, showOnContact, photo${imageFields}
}`)

export const THERAPY_AREAS_QUERY = defineQuery(`*[_type == "therapyArea"] | order(name asc){
  name, conditions, "keywords": coalesce(keywords, [])
}`)

export const BRAND_MOMENTS_QUERY = defineQuery(`*[_type == "brandMoment"] | order(orderRank asc){
  stage, title, body, proof, "caseSlug": caseStudy->slug.current, "tags": coalesce(tags, [])
}`)

export const SPECIALIST_AREAS_QUERY = defineQuery(`*[_type == "specialistArea"] | order(orderRank asc){
  name, challenge, experience
}`)

export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy"] | order(orderRank asc){
  "slug": coalesce(slug.current, _id), title, therapyArea, challenge, audience, work, outcome, image${imageFields}, "isExample": coalesce(isExample, true)
}`)

export const PERKS_QUERY = defineQuery(`*[_type == "perk"] | order(orderRank asc){ title, body }`)

export const INSIGHTS_QUERY = defineQuery(`*[_type == "insight" && defined(slug.current)] | order(coalesce(featured, false) desc, _createdAt desc){
  "slug": slug.current, title, summary, topic, byline, featured, image${imageFields},
  sections[]{heading, text}, example{original, revision, note}
}`)

export const CAREERS_ROLES_QUERY = defineQuery(`*[_type == "careersRole" && open == true && defined(applicationUrl)] | order(_createdAt desc){
  "id": _id, title, location, workingPattern, summary, applicationUrl
}`)
