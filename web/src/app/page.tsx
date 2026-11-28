import { pageSections } from '@/content/page-sections'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { WorkplaceBadges } from '@/components/site/badges'
import { Burst } from '@/components/site/burst'
import { InsightFeature } from '@/components/site/insight-feature'
import { BriefLineup } from '@/components/site/brief-lineup'
import { CtaBand, Eyebrow, EditableSectionHead, TextLink } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { disciplines as defaultDisciplines, getCaseStudies, getInsights, getPage, getSettings, getTeam, workplace } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home', { stega: false })
  return { title: { absolute: page.seoTitle || page.title }, description: page.seoDescription }
}

/** Lights up the word "explosion" in the headline, if the headline uses it. */
function Headline({ text }: { text: string }) {
  const match = text.match(/^(.*?)(explosion)(.*)$/i)
  if (!match) return <>{text}</>
  return <>{match[1]}<span className="burst-text">{match[2]}</span>{match[3]}</>
}

export default async function HomePage() {
  const [page, settings, team, cases, insights, servicesPage] = await Promise.all([getPage('home'), getSettings(), getTeam(), getCaseStudies(), getInsights(), getPage('services')])
  const disciplines = servicesPage.servicesCopy?.disciplines ?? defaultDisciplines
  const latest = insights.find((article) => article.featured) ?? insights[0]
  // Only real, approved work earns a place on the home page. Example stories stay on the Work page.
  const featured = cases.find((study) => !study.isExample)
  const founder = team.find((person) => person.isFounder)
  const statValue = (label: string) => settings.stats.find((stat) => stat.label === label)?.value

  const values = [
    {
      word: 'Experience',
      tone: 'magenta',
      body: (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {settings.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[15px]">{stat.label}</dt>
              <dd className="text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-semibold tracking-[-0.04em] text-ink">{stat.value}+</dd>
            </div>
          ))}
          <p className="col-span-full text-[15px]">Global, regional and local, including emerging markets.</p>
        </dl>
      ),
    },
    {
      word: 'Skill',
      tone: 'violet',
      body: <p className="text-lg leading-relaxed">Client services, project management, strategy, market research, science, creative and digital. Plus the Veeva know-how to take content from approved email and sales aids right through PromoMats.</p>,
    },
    {
      word: 'Effort',
      tone: 'cyan',
      body: <p className="text-lg leading-relaxed">The perfect mix of inspiration and perspiration. We know when to think and when to act.</p>,
    },
    {
      word: 'Courage',
      tone: 'red',
      body: <p className="text-lg leading-relaxed">The confidence to stand up and speak. And the sense to sit down and listen!</p>,
    },
  ]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Burst className="absolute inset-0 -z-10 h-full w-full" originX={0.72} originY={0.5} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--night)_0%,color-mix(in_oklch,var(--night)_80%,transparent)_38%,transparent_70%)] max-lg:bg-[linear-gradient(180deg,transparent_0%,transparent_28%,color-mix(in_oklch,var(--night)_75%,transparent)_52%,var(--night)_78%)]" />
        <div className="wrap flex min-h-[min(86vh,860px)] flex-col justify-end pt-40 pb-[clamp(48px,7vw,96px)] lg:justify-center lg:pt-24">
          <Eyebrow tone="light">{page.eyebrow || 'Independent healthcare communications'}</Eyebrow>
          <h1 className="editorial-display max-w-[11ch] text-white lg:text-[clamp(3.4rem,7.4vw,7.6rem)]"><Headline text={page.title} /></h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-white/85 sm:text-xl">{page.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild variant="magenta" size="xl">
              <Link href="/contact">Bring us a brief <ArrowRight aria-hidden /></Link>
            </Button>
            {Boolean(page.lineups?.length) && <a href="#lineup" className="inline-flex items-center gap-2 font-bold text-white link-underline">Meet the team <ArrowDown className="size-4" aria-hidden /></a>}
          </div>
        </div>
      </section>

      <nav aria-label="BOOM! credentials" className="border-b border-border">
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

      <section aria-labelledby="values-title" className="wrap section-pad">
        <h2 id="values-title" className="type-title max-w-[24ch] text-pretty">Partnering with you, we succeed through experience, skill, effort and courage.</h2>
        <ol className="mt-10 border-b border-ink">
          {values.map((value) => (
            <li key={value.word} className="grid gap-x-12 gap-y-4 border-t border-ink py-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:py-10">
              <p className={`value-word value-word--${value.tone}`}>{value.word}</p>
              <div className="max-w-[60ch]">{value.body}</div>
            </li>
          ))}
        </ol>
      </section>

      <BriefLineup lineups={page.lineups ?? []} team={team} cases={cases} />

      {founder && (
        <section aria-labelledby="founder-story" className="wrap section-pad">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,260px)_1fr] lg:gap-16">
            <div className="relative w-44 md:w-full">
              <span aria-hidden className="founder-splash" />
              <Image src={founder.photo.src} alt={founder.photo.alt} width={520} height={520} sizes="260px" className="relative aspect-square w-full rounded-full object-cover object-[center_30%]" />
            </div>
            <div>
              <h2 id="founder-story" className="type-title max-w-[22ch] text-pretty">Ten years at Novartis. Then BOOM!</h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">
                {founder.fullName} spent the first decade of his career at Novartis, across sales, key accounts, market access, research and marketing. He went on to lead research, digital, medical communications and creative agencies on both sides of the Atlantic, then founded BOOM! in 2018 to bring an explosion of experience to the people who need it.
              </p>
              <div className="mt-5"><TextLink href="/about#band">Meet the leadership team</TextLink></div>
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

      <section className="bg-warm">
        <div className="wrap section-pad">
          <EditableSectionHead page={page} id="services" defaults={pageSections.home.services} action={<TextLink href="/services">All services</TextLink>} />
          <ul className="grid gap-px bg-ink/15 md:grid-cols-3">
            {disciplines.map((discipline, i) => (
              <li key={discipline.id} className="bg-warm">
                <Link href={`/services#${discipline.id}`} className="group flex h-full flex-col gap-4 py-6 md:px-6">
                  <span className={`discipline-dot discipline-dot--${['magenta', 'violet', 'cyan'][i % 3]}`} aria-hidden />
                  <span className="text-2xl font-bold text-ink group-hover:text-magenta-dark">{discipline.name}</span>
                  <ul className="space-y-1.5 text-[15px] leading-snug">
                    {discipline.services.map((service) => <li key={service}>{service}</li>)}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid items-start gap-x-12 gap-y-4 md:grid-cols-[1fr_1.2fr]">
            <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold text-pretty text-ink">Small team, big brief? That’s our favourite kind.</h3>
            <div className="text-lg leading-relaxed">
              <p className="max-w-[54ch]">We love the passion and energy of small to mid-size teams, and of teams that are leanly resourced with a genuine need for partnership. We go looking for challenging projects, because that’s where {statValue('therapy areas') ? `experience across ${statValue('therapy areas')}+ therapy areas` : 'our experience'} gets us to the heart of the issue quickly.</p>
              <p className="mt-4 max-w-[54ch]">We challenge beliefs and change behaviour, and we always make sure the juice is worth the squeeze!</p>
              <div className="mt-5"><TextLink href="/about#why">Why choose BOOM!</TextLink></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="people-title" className="relative isolate overflow-hidden bg-night text-white">
        {page.image && <Image src={page.image.src} alt={page.image.alt} fill sizes="100vw" className="-z-20 object-cover object-[center_40%] opacity-55" />}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,var(--night)_8%,color-mix(in_oklch,var(--night)_40%,transparent)_70%)]" />
        <div className="wrap flex min-h-[620px] flex-col justify-end py-[clamp(56px,7vw,96px)]">
          <h2 id="people-title" className="type-title max-w-[22ch] text-pretty text-white">We aim to be the agency our clients would absolutely hate to lose, and our people would hate to leave!</h2>
          <p className="mt-5 max-w-[52ch] text-lg text-white/85">{workplace.headline.boom} of our people say BOOM! is a great place to work, and we’re ranked {workplace.lists[1].rank} in the UK’s Best Workplaces 2026 (Small).</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
            <WorkplaceBadges size="sm" />
            <TextLink href="/careers" light>Life at BOOM!</TextLink>
          </div>
        </div>
      </section>

      {latest && (
        <section className="wrap section-pad">
          <EditableSectionHead page={page} id="insights" defaults={pageSections.home.insights} action={<TextLink href="/insights">All insights</TextLink>} />
          <InsightFeature article={latest} showArt={Boolean(latest.image)} />
        </section>
      )}

      <CtaBand title="Got a challenging brief? Let’s light the fuse." body="Tell us who you need to reach and what has to change. We’ll bring the right people to the first conversation." label="Contact us" />
    </>
  )
}
