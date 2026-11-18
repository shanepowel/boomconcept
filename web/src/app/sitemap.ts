import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boom-cc.com'
const routes = ['', '/work', '/services', '/therapy-areas', '/about', '/careers', '/contact', '/terms', '/privacy', '/cookies']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${base}${route}`, changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7 }))
}
