import { defineConfig } from 'sanity'
import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure, SINGLETON_TYPES } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'ilv0hlq1'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// The live site, for the Presentation tool. Set SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000 for local work.
const siteOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'https://boom.bmkrs.com'
const pages = [
  { id: 'page-home', route: '/' },
  { id: 'page-work', route: '/work' },
  { id: 'page-insights', route: '/insights' },
  { id: 'page-services', route: '/services' },
  { id: 'page-therapyAreas', route: '/therapy-areas' },
  { id: 'page-about', route: '/about' },
  { id: 'page-careers', route: '/careers' },
  { id: 'page-contact', route: '/contact' },
]

export default defineConfig({
  name: 'boom',
  title: 'BOOM! Healthcare Communications',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { origin: siteOrigin, previewMode: { enable: '/api/draft-mode/enable' } },
      resolve: {
        mainDocuments: defineDocuments([
          ...pages.map(({ id, route }) => ({ route, filter: `_id == "${id}"` })),
          { route: '/insights/:slug', filter: '_type == "insight" && slug.current == $slug' },
          { route: '/work/:slug', filter: '_type == "caseStudy" && (slug.current == $slug || (!defined(slug.current) && _id == $slug))' },
        ]),
        locations: {
          pageCopy: defineLocations({
            select: { title: 'title', id: '_id' },
            resolve: (doc) => ({
              locations: pages.filter(({ id }) => id === doc?.id?.replace(/^drafts\./, '')).map(({ route }) => ({ title: doc?.title || 'Page', href: route })),
            }),
          }),
          careersRole: defineLocations({
            select: { title: 'title' },
            resolve: (doc) => ({
              locations: [{ title: doc?.title || 'Careers roles', href: '/careers#join' }],
            }),
          }),
          insight: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug ? [
                { title: doc.title || 'Insight', href: `/insights/${encodeURIComponent(doc.slug)}` },
                { title: 'Insights index', href: '/insights' },
              ] : [],
            }),
          }),
          caseStudy: defineLocations({
            select: { title: 'title', slug: 'slug.current', id: '_id' },
            resolve: (doc) => ({
              locations: doc ? [
                { title: doc.title || 'Case study', href: `/work/${encodeURIComponent(doc.slug || (doc.id || '').replace(/^drafts\./, ''))}` },
                { title: 'Work index', href: '/work' },
              ] : [],
            }),
          }),
        },
      },
    }),
    visionTool({ defaultApiVersion: '2026-02-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Singletons are opened from the structure, never created from the "new document" menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)) : prev,
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType) ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
  },
})
