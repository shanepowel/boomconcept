import { pageSections } from '@/content/page-sections'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { WorkplaceBadges } from '@/components/site/badges'
import { InsightFeature } from '@/components/site/insight-feature'
import { BriefLineup } from '@/components/site/brief-lineup'
import { CtaBand, Eyebrow, EditableSectionHead, Stats, TextLink } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { disciplines as defaultDisciplines, getCaseStudies, getInsights, getPage, getSettings, getTeam, workplace } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home', { stega: false })
  return { title: { absolute: page.seoTitle || page.title }, description: page.seoDescription }
}

export default async function HomePage() {
  const [page, settings, team, cases, insights, servicesPage] = await Promise.all([getPage('home'), getSettings(), getTeam(), getCaseStudies(), getInsights(), getPage('services')])
  const disciplines = servicesPage.servicesCopy?.disciplines ?? defaultDisciplines
  const latest = insights.find((article) => article.featured) ?? insights[0]
  // Only real, approved work earns a place on the home page. Example stories stay on the Work page.
  const featured = cases.find((study) => !study.isExample)
  const founder = team.find((person) => person.isFounder)

  return (
    <>
      <section className="bg-warm">
        <div className="wrap masthead-grid masthead-grid--home">
          <div>
            <Eyebrow>{page.eyebrow || 'Independent healthcare communications'}</Eyebrow>
            <h1 className="editorial-display max-w-[15ch] lg:text-[clamp(3rem,6.4vw,6.2rem)]">{page.title}</h1>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed">{page.lede}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild variant="magenta" size="xl">
                <Link href="/contact">Bring us a brief <ArrowRight aria-hidden /></Link>
              </Button>
              {Boolean(page.lineups?.length) && <a href="#lineup" className="inline-flex items-center gap-2 font-bold text-ink link-underline">Meet the line-up <ArrowDown className="size-4" aria-hidden /></a>}
            </div>
          </div>
          {page.image && (
            <figure className="relative min-w-0">
              <div className="relative aspect-[4/3] masthead-photo overflow-hidden bg-night-2">
                <Image src={page.image.src} alt={page.image.alt} fill preload sizes="(min-width: 1360px) 610px, (min-width: 1024px) 48vw, 90vw" className="object-cover object-[center_35%]" />
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
              <span className="block font-bold text-ink group-hover:text-magenta-dark">{title}</span>
              <span className="mt-1 block text-sm">{detail}</span>
            </Link></li>
          ))}
        </ul>
      </nav>

      <BriefLineup lineups={page.lineups ?? []} team={team} cases={cases} />

      {founder && (
        <section aria-labelledby="founder-story" className="wrap section-pad">
          <div className="grid items-center gap-8 border-y border-ink py-10 md:grid-cols-[minmax(0,220px)_1fr] lg:gap-14 lg:py-14">
            <Image src={founder.photo.src} alt={founder.photo.alt} width={440} height={440} sizes="220px" className="aspect-square w-40 object-cover object-[center_30%] md:w-full" />
            <div>
              <h2 id="founder-story" className="type-title max-w-[24ch] text-pretty">Ten years at Novartis, then a band of his own.</h2>
              <p className="mt-4 max-w-[62ch] text-lg">
                {founder.fullName} worked in sales, market access, research and marketing at Novartis before running agencies on both sides of the Atlantic. In 2018 he started BOOM! on an idea borrowed from the Traveling Wilburys: get very good people in a room, then give them space to play.
              </p>
              <div className="mt-5"><TextLink href="/about#band">Meet the band</TextLink></div>
            </div>
          </div>
        </section>
      )}

      {featured && (
        <section aria-labelledby="featured-work" className="wrap pb-[clamp(56px,7vw,96px)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-12">
            <p className="font-semibold text-ink">{featured.therapyArea}</p>
            <div>
              <h2 id="featured-work" className="type-title max-w-[22ch] text-pretty">{featured.title}</h2>
              {featured.image && <Image src={featured.image.src} alt={featured.image.alt} width={1440} height={810} sizes="(min-width: 1024px) 62vw, 90vw" className="mt-5 aspect-video w-full object-cover" />}
              <p className="mt-4 max-w-[60ch]">{featured.outcome || featured.challenge}</p>
              <div className="mt-5"><TextLink href={`/work/${encodeURIComponent(featured.slug)}`}>Read the case study</TextLink></div>
            </div>
          </div>
        </section>
      )}

      <section className="wrap pb-[clamp(56px,7vw,96px)]">
        <EditableSectionHead page={page} id="services" defaults={pageSections.home.services} action={<TextLink href="/services">All services</TextLink>} />
        <ul className="grid border-t border-ink md:grid-cols-3">
          {disciplines.map((discipline) => (
            <li key={discipline.id} className="group/discipline border-b border-border md:border-r md:last:border-r-0">
              <Link href={`/services#${discipline.id}`} className="group flex h-full flex-col gap-3 py-5 md:px-5 md:group-first/discipline:pl-0">
                <span className="text-2xl font-bold text-ink group-hover:text-magenta-dark">{discipline.name}</span>
                <span className="text-[15px] leading-relaxed">{discipline.services.slice(0, 4).join(' · ')}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12"><Stats stats={settings.stats} /></div>
        <div className="mt-6 grid items-start gap-x-10 gap-y-3 md:grid-cols-[1fr_1.2fr]">
          <h3 className="text-2xl text-pretty">Built for lean brand teams.</h3>
          <div>
            <p className="max-w-[54ch]">Many of our clients run a brand with a handful of people. We bring in the specialists as the brief needs them, whether that means shaping a global story, adapting it for a region or getting it working in one market.</p>
            <div className="mt-4"><TextLink href="/about#why">How we work with clients</TextLink></div>
          </div>
        </div>
      </section>

      {latest && (
        <section className="bg-ink text-white">
          <div className="wrap section-pad">
            <EditableSectionHead page={page} id="insights" defaults={pageSections.home.insights} tone="light" action={<TextLink href="/insights" light>All insights</TextLink>} />
            <div className="text-body"><InsightFeature article={latest} showArt={Boolean(latest.image)} /></div>
          </div>
        </section>
      )}

      <section className="bg-warm">
        <div className="wrap section-pad grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Image src="/images/culture/summer-social-london.webp" alt="BOOM! colleagues at the London summer social" width={1000} height={750} sizes="(min-width: 1024px) 48vw, 90vw" className="aspect-[4/3] w-full object-cover" />
          <div>
            <h2 className="type-title text-pretty">{workplace.headline.boom} of our people say it’s a great place to work.</h2>
            <p className="mt-4 max-w-[47ch]">Ranked {workplace.lists[1].rank} in the UK’s Best Workplaces 2026 (Small).</p>
            <div className="mt-5"><WorkplaceBadges size="sm" /></div>
            <div className="mt-5"><TextLink href="/careers">Life at BOOM!</TextLink></div>
          </div>
        </div>
      </section>

      <CtaBand title="Send us the brief." body="A few lines on who you need to reach and what has to change is enough to start." />
    </>
  )
}
