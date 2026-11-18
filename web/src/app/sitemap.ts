import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boom-cc.com'
const routes = ['', '/work', '/what-we-do', '/expertise', '/how-we-work', '/about', '/team', '/careers', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${base}${route}`, changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7 }))
}
