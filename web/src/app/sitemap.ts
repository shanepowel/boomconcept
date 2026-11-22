import type { MetadataRoute } from 'next'
import { getCaseStudies, getInsights } from '@/lib/data'

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boom-cc.com'
const routes = ['', '/work', '/insights', '/services', '/therapy-areas', '/about', '/careers', '/sustainability', '/contact', '/terms', '/privacy', '/cookies']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, insights] = await Promise.all([getCaseStudies({ stega: false }), getInsights({ stega: false })])
  const publishedWork = studies.filter((study) => !study.isExample).map((study) => `/work/${encodeURIComponent(study.slug)}`)
  return [...routes, ...publishedWork, ...insights.map(({ slug }) => `/insights/${encodeURIComponent(slug)}`)].map((route) => ({ url: `${base}${route}`, changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7 }))
}
