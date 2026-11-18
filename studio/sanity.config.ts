import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure, SINGLETON_TYPES } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'boom',
  title: 'BOOM! Healthcare Communications',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: '2026-02-01' })],
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
