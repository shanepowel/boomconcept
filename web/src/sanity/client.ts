import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl } from './env'

export const client = createClient({
  // A placeholder keeps the client constructible before a project exists; no requests are made
  // while isSanityConfigured is false.
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl },
})
