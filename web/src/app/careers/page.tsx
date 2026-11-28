import { getEditorialLists } from '@/content/editorial-lists'
import { SubNav } from '@/components/site/sub-nav'
import { sectionCopy } from '@/content/page-sections'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, TextLink } from '@/components/site/blocks'
import { WorkplaceBadges } from '@/components/site/badges'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { getCareersRoles, getPage, getPerks, getProof, getSettings } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('careers', { stega: false })
  return { title: page.seoTitle || 'Careers', description: page.seoDescription }
}

const tones = ['magenta', 'violet', 'cyan']
const percent = (value: string) => Math.max(0, Math.min(100, Number.parseFloat(value) || 0))

export default async function CareersPage() {
  const [page, perks, settings, roles, { workplace }] = await Promise.all([getPage('careers'), getPerks(), getSettings({ stega: false }), getCareersRoles(), getProof()])
  const lists = getEditorialLists('careers', page.editorialLists)
  const introduction = '/contact?topic=careers#form'
  const copy = (id: Parameters<typeof sectionCopy<'careers'>>[2]) => sectionCopy(page, 'careers', id)
  const [workingLife, culture, roleCopy, rider, applying, cta] = [copy('workingLife'), copy('culture'), copy('roles'), copy('benefits'), copy('applying'), copy('careersCta')]
  // The masthead photo leads the page, so the mosaic uses the others.
  const photos = workplace.photos.filter((photo) => photo.src !== page.image?.src).slice(0, 5)
  const bars = [
    { label: 'BOOM!', value: workplace.headline.boom, highlight: true },
    { label: 'A typical UK company', value: workplace.headline.typical, highlight: false },
  ]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-white">
        {page.image && <Image src={page.image.src} alt={page.image.alt} fill preload sizes="100vw" className="-z-20 object-cover object-[center_45%]" />}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--night)_10%,color-mix(in_oklch,var(--night)_70%,transparent)_45%,color-mix(in_oklch,var(--night)_20%,transparent)_100%)] max-lg:bg-[linear-gradient(0deg,var(--night)_35%,color-mix(in_oklch,var(--night)_40%,transparent)_100%)]" />
        <div className="wrap flex min-h-[min(82vh,780px)] flex-col justify-end py-[clamp(56px,7vw,96px)] lg:justify-center">
          <Eyebrow tone="light">{page.eyebrow || 'Careers'}</Eyebrow>
          <h1 className="editorial-display max-w-[11ch] text-white lg:text-[clamp(3.4rem,7vw,7rem)]">{page.title}</h1>
          {page.lede && <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/85 sm:text-xl">{page.lede}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild variant="magenta" size="xl"><a href="#join">{roles.length ? 'See open roles' : 'Join the band'} <ArrowDown aria-hidden /></a></Button>
            <a href="#rider" className="inline-flex items-center gap-2 font-bold text-white link-underline">The rider <ArrowDown className="size-4" aria-hidden /></a>
          </div>
        </div>
      </section>
      <SubNav items={[
        { id: 'life', label: 'Working life' },
        { id: 'culture', label: 'Culture' },
        { id: 'rider', label: 'The rider' },
        { id: 'join', label: 'Roles' },
        { id: 'questions', label: 'Applying' },
      ]} />

      <section id="life" className="wrap section-pad">
        <h2 className="type-title max-w-[22ch] text-pretty">{workingLife.title}</h2>
        {workingLife.intro && <p className="mt-4 max-w-[60ch] text-lg">{workingLife.intro}</p>}
        <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {lists.workingLife.map(({ title, body }, i) => (
            <li key={title}>
              <p aria-hidden className={`value-word value-word--number value-word--${tones[i % tones.length]}`}>{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-2xl text-pretty">{title}</h3>
              <p className="mt-2 text-[17px] leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10"><TextLink href="/about#band">Meet the people you could work with</TextLink></div>
      </section>

      <section id="culture" aria-labelledby="culture-title" className="bg-night text-white">
        <div className="wrap section-pad">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <h2 id="culture-title" className="type-title text-white">{culture.title}</h2>
              {culture.intro && <p className="mt-4 max-w-[52ch] text-lg text-white/80">{culture.intro}</p>}
            </div>
            <figure aria-label={`${workplace.headline.boom} of BOOM! people say it is a great place to work, against ${workplace.headline.typical} at a typical UK company`}>
              <dl className="space-y-4">
                {bars.map((bar) => (
                  <div key={bar.label}>
                    <dt className="flex justify-between text-sm font-semibold text-white/80"><span>{bar.label}</span><span className={bar.highlight ? 'text-white' : ''}>{bar.value}</span></dt>
                    <dd className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/10">
                      <span className={`block h-full rounded-full ${bar.highlight ? 'bg-burst' : 'bg-white/35'}`} style={{ width: `${percent(bar.value)}%` }} />
                    </dd>
                  </div>
                ))}
              </dl>
              <figcaption className="mt-3 text-sm text-white/65">Say it’s a great place to work. <a href={workplace.source} className="font-semibold text-white link-underline">Great Place To Work® survey</a></figcaption>
            </figure>
          </div>

          <ul className="culture-mosaic mt-12">
            {photos.map((photo, i) => (
              <li key={photo.src} className={`culture-mosaic__item culture-mosaic__item--${i + 1}`}>
                <figure className="relative h-full">
                  <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.75),transparent)] px-4 pt-10 pb-3 text-sm text-white">{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <WorkplaceBadges size="sm" />
            <p className="max-w-[40ch] text-white/80">Ranked {workplace.lists[1]?.rank} in the UK’s {workplace.lists[1]?.name}.</p>
          </div>
        </div>
      </section>

      <section id="rider" className="bg-warm">
        <div className="wrap section-pad">
          <h2 className="type-title">{rider.title}</h2>
          {rider.intro && <p className="mt-3 text-lg">{rider.intro}</p>}
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, i) => (
              <li key={perk.title} className="rider-card">
                <span aria-hidden className={`discipline-dot discipline-dot--${tones[i % tones.length]}`} />
                <h3 className="mt-6 text-[clamp(1.4rem,2vw,1.75rem)] leading-tight">{perk.title}</h3>
                <p className="mt-2 text-[16px]">{perk.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="join" className="wrap section-pad">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[0.85fr_1.15fr]">
          <h2 className="type-title">{roleCopy.title}</h2>
          <div className="border-t border-ink pt-5">
            {roles.length > 0 ? (
              <ul className="divide-y divide-border">
                {roles.map((role) => (
                  <li key={role.id} className="pb-5 not-first:pt-5">
                    <h3 className="text-xl">{role.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-magenta-dark">{[role.location, role.workingPattern].filter(Boolean).join(' · ')}</p>
                    <p className="mt-3">{role.summary}</p>
                    <a href={role.applicationUrl} className="mt-3 inline-flex items-center gap-2 font-bold text-ink link-underline">View role and apply <span className="sr-only">for {role.title}</span><ArrowUpRight className="size-4" aria-hidden /></a>
                  </li>
                ))}
              </ul>
            ) : <p className="max-w-[52ch] text-lg">{roleCopy.intro}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild variant="magenta" size="xl"><Link href={introduction}>Introduce yourself <ArrowRight aria-hidden /></Link></Button>
              <a href={settings.linkedinUrl} className="text-sm font-bold text-ink link-underline">Follow BOOM! for vacancies</a>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="border-t border-border bg-warm">
        <div className="wrap section-pad section-split">
          <div>
            <h2 className="type-title">{applying.title}</h2>
            <div className="mt-5"><TextLink href={introduction}>Ask us a question</TextLink></div>
          </div>
          <Accordion type="single" collapsible className="border-t border-ink">
            {lists.applicationQuestions.map(({ title, body }) => (
              <AccordionItem value={title} key={title}>
                <AccordionTrigger className="py-4 text-base font-semibold">{title}</AccordionTrigger>
                <AccordionContent className="pb-4 text-base">{body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaBand title={cta.title} body={cta.intro ?? ''} href={introduction} label="Introduce yourself" />
    </>
  )
}
