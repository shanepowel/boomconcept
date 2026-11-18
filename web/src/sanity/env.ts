export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01'
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'
export const readToken = process.env.SANITY_API_READ_TOKEN || ''

/** True once a Sanity project is connected. Until then the site renders src/content/fallback.ts. */
export const isSanityConfigured = projectId.length > 0
