import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ilv0hlq1',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted at https://boom-healthcare.sanity.studio
  studioHost: 'boom-healthcare',
  typegen: {
    path: '../web/src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
  },
})
