import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { getSettings } from '@/lib/data'
import { isSanityConfigured } from '@/sanity/env'
import { SanityLive } from '@/sanity/live'
import './globals.css'

const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boom-cc.com'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings({ stega: false })
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings.name, template: `%s | ${settings.name}` },
    description: settings.description,
    openGraph: { type: 'website', siteName: settings.name, images: ['/og.jpg'], locale: 'en_GB' },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings({ stega: false })
  const isDraft = (await draftMode()).isEnabled
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.name,
    url: siteUrl,
    logo: `${siteUrl}/images/boom-logo.png`,
    identifier: settings.companyNumber,
    sameAs: [settings.linkedinUrl],
    address: settings.offices.map((o) => ({ '@type': 'PostalAddress', addressLocality: o.city })),
  }

  return (
    <html lang="en-GB" className={`${dmSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="fixed top-3 left-3 z-50 -translate-y-[200%] bg-ink px-4 py-3 text-white focus:translate-y-0">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {isSanityConfigured ? <SanityLive /> : null}
        {isSanityConfigured && isDraft ? <VisualEditing /> : null}
      </body>
    </html>
  )
}
