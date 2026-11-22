import { pageSections } from '@/content/page-sections'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { WorkplaceBadges } from '@/components/site/badges'
import { InsightFeature } from '@/components/site/insight-feature'
import { BriefLineup } from '@/components/site/brief-lineup'
import { CtaBand, Eyebrow, EditableSectionHead, Stats, TextLink } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { disciplines, getCaseStudies, getInsights, getPage, getSettings, getTeam, workplace } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home', { stega: false })
  return { title: { absolute: page.seoTitle || page.title }, description: page.seoDescription }
}

export default async function HomePage() {
  const [page, settings, team, cases, insights] = await Promise.all([getPage('home'), getSettings(), getTeam(), getCaseStudies(), getInsights()])
  const latest = insights.find((article) => article.featured) ?? insights[0]
  const featured = cases.find((study) => !study.isExample) ?? cases[0]

  return (
    <>
      <section className="bg-warm">
        <div className="wrap masthead-grid masthead-grid--home">
          <div>
            <Eyebrow>{page.eyebrow || 'Independent healthcare communications'}</Eyebrow>
            <h1 className="editorial-display max-w-[15ch] lg:text-[clamp(3rem,6.4vw,6.2rem)]">{page.title}</h1>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed">{page.lede}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild variant="magenta" size="xl">
                <Link href="/contact">Bring us a brief <ArrowUpRight aria-hidden /></Link>
              </Button>
              {Boolean(page.lineups?.length) && <a href="#lineup" className="inline-flex items-center gap-2 font-bold text-ink link-underline">Meet the line-up <ArrowDown className="size-4" aria-hidden /></a>}
            </div>
          </div>
          {page.image && (
            <figure className="relative min-w-0">
              <div className="relative aspect-[4/3] masthead-photo overflow-hidden bg-night-2">
                <Image src={page.image.src} alt={page.image.alt} fill preload sizes="(min-width: 1360px) 610px, (min-width: 1024px) 48vw, 90vw" className="object-cover" />
              </div>
              {(page.image.caption || page.image.credit) && <figcaption className="mt-2 text-sm text-body">{page.image.caption}{page.image.caption && page.image.credit ? ' · ' : ''}{page.image.credit}</figcaption>}
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="BOOM! credentials" className="border-y border-border">
        <ul className="wrap credentials-grid">
          {[
            { href: '/about#band', title: 'Independent & award-winning', detail: `${settings.teamSize} specialists, one team` },
            { href: '/services#veeva', title: 'Veeva partner', detail: 'Multichannel and Vault Content' },
            { href: '/careers#culture', title: workplace.lists[1].rank + ' in the UK', detail: 'Best Workplaces 2026 (Small)' },
            { href: '/about#offices', title: 'Our studios', detail: settings.offices.map(({ city }) => city).join(' · ') },
          ].map(({ href, title, detail }) => (
            <li key={href}><Link className="group" href={href}>
              <span className="flex items-center justify-between gap-2 font-bold text-ink">{title}<ArrowUpRight className="size-4 shrink-0 text-magenta-dark" aria-hidden /></span>
              <span className="mt-1 block text-sm">{detail}</span>
            </Link></li>
          ))}
        </ul>
      </nav>

      {featured && (
        <section aria-labelledby="featured-work" className="wrap section-pad">
          <div className="grid gap-8 border-y border-ink py-8 lg:grid-cols-[1fr_2.2fr] lg:gap-12 lg:py-12">
            <div>
              <Eyebrow>{featured.isExample ? 'Illustrative case study' : 'Featured work'}</Eyebrow>
              <p className="font-semibold text-ink">{featured.therapyArea}</p>
            </div>
            <div>
              <h2 id="featured-work" className="type-title max-w-[22ch] text-pretty">{featured.title}</h2>
              {featured.image && <Image src={featured.image.src} alt={featured.image.alt} width={1440} height={810} sizes="(min-width: 1024px) 62vw, 90vw" className="mt-5 aspect-video w-full object-cover" />}
              <p className="mt-4 max-w-[60ch]">{featured.isExample ? featured.challenge : featured.outcome || featured.challenge}</p>
              <div className="mt-5"><TextLink href={`/work/${encodeURIComponent(featured.slug)}`}>Read the case study</TextLink></div>
            </div>
          </div>
        </section>
      )}

      <BriefLineup lineups={page.lineups ?? []} team={team} cases={cases} />

      <section className="wrap section-pad">
        <EditableSectionHead page={page} id="services" defaults={pageSections.home.services} action={<TextLink href="/services">Explore our services</TextLink>} />
        <ul className="grid border-t border-ink md:grid-cols-3">
          {disciplines.map((discipline) => (
            <li key={discipline.id} className="group/discipline border-b border-border md:border-r md:last:border-r-0">
              <Link href={`/services#${discipline.id}`} className="group flex h-full flex-col gap-2 py-5 md:px-5 md:group-first/discipline:pl-0">
                <span className="flex items-center justify-between gap-4 text-2xl font-bold text-ink group-hover:text-magenta-dark">{discipline.name}<ArrowUpRight className="size-5" aria-hidden /></span>
                <span>{discipline.heading}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10"><Stats stats={settings.stats} /></div>
        <div className="mt-4 grid items-start gap-x-10 gap-y-4 border-t border-border pt-7 md:grid-cols-[1fr_1.2fr]">
          <h3 className="text-2xl text-pretty">Working with a lean team? So are many of our clients.</h3>
          <div>
            <p className="max-w-[54ch]">We work alongside small and mid-sized brand teams, bringing in the specialists you need as the brief develops. We can help shape a global story, adapt it for a region or get it working in a single market.</p>
            <div className="mt-4"><TextLink href="/about#why">How we work with clients</TextLink></div>
          </div>
        </div>
      </section>

      {latest && (
        <section className="bg-ink text-white">
          <div className="wrap section-pad">
            <EditableSectionHead page={page} id="insights" defaults={pageSections.home.insights} tone="light" action={<TextLink href="/insights" light>Browse insights</TextLink>} />
            <div className="text-body"><InsightFeature article={latest} /></div>
          </div>
        </section>
      )}

      <section className="bg-warm">
        <div className="wrap section-pad grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Image src="/images/culture/summer-social-london.webp" alt="BOOM! colleagues at the London summer social" width={1000} height={750} sizes="(min-width: 1024px) 48vw, 90vw" className="aspect-[4/3] w-full object-cover" />
          <div>
            <Eyebrow>Life at BOOM!</Eyebrow>
            <h2 className="type-title text-pretty">{workplace.headline.boom} of our people say it’s a great place to work.</h2>
            <p className="mt-4 max-w-[47ch]">Ranked {workplace.lists[1].rank} in the UK’s Best Workplaces 2026 (Small).</p>
            <div className="mt-5"><WorkplaceBadges size="sm" /></div>
            <div className="mt-5"><TextLink href="/careers">See what it’s like here</TextLink></div>
          </div>
        </div>
      </section>

      <CtaBand title="What are you working on?" body="Tell us who you need to reach and what you want them to do differently." />
    </>
  )
}
