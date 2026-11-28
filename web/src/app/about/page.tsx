import { getEditorialLists } from '@/content/editorial-lists'
import { pageSections, sectionCopy } from '@/content/page-sections'
import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand, PageHero, EditableSectionHead, SectionHead, TextLink } from '@/components/site/blocks'
import { WorkplaceBadges } from '@/components/site/badges'
import { OfficeStrip } from '@/components/site/office-strip'
import { SubNav } from '@/components/site/sub-nav'
import { getPage, getProof, getSettings, getTeam } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about', { stega: false })
  return { title: page.seoTitle || 'About', description: page.seoDescription }
}

export default async function AboutPage() {
  const [page, team, settings, { workplace, glassdoor, teamMix }] = await Promise.all([getPage('about'), getTeam(), getSettings(), getProof()])
  const lists = getEditorialLists('about', page.editorialLists)
  const founder = team.find((m) => m.isFounder) ?? team[0]
  const leaders = team.filter((m) => m !== founder)

  return (
    <>
      <PageHero copy={page}>
        <div className="mt-6"><TextLink href="#band">Meet the band</TextLink></div>
      </PageHero>
      <SubNav
        items={[
          { id: 'band', label: 'The band' },
          { id: 'story', label: 'Our story' },
          { id: 'beliefs', label: 'What we believe' },
          { id: 'why', label: 'Why BOOM!' },
          { id: 'offices', label: 'Where we are' },
        ]}
      />

      {/* The band */}
      <section id="band" className="wrap section-pad lg:scroll-mt-14">
        <EditableSectionHead page={page} id="team" defaults={pageSections.about.team}
        />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((m, i) => (
            <li key={m.slug} id={`person-${m.slug}`} className="flex flex-col border-t border-ink pt-6">
              <div className="relative isolate w-36">
                <span aria-hidden className={`founder-splash founder-splash--small team-splash--${['magenta', 'violet', 'cyan'][i % 3]}`} />
                <Image src={m.photo.src} alt={m.photo.alt} width={600} height={630} sizes="144px" className="relative aspect-square w-36 rounded-full bg-warm object-cover object-[center_25%]" />
              </div>
              <p className="mt-5 text-xs font-bold tracking-[0.12em] text-magenta uppercase">{m.discipline}</p>
              <h3 className="mt-1.5 text-2xl">{m.fullName}</h3>
              <p className="text-[15px] font-semibold text-ink">{m.role}</p>
              <p className="mt-3 text-[16px]">{m.bio}</p>
              {m.linkedinUrl ? (
                <a href={m.linkedinUrl} className="mt-4 text-sm font-bold text-ink link-underline">
                  LinkedIn
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* Story */}
      <section id="story" className="wrap section-pad lg:scroll-mt-14">
        <div className="grid items-center gap-[clamp(40px,6vw,96px)] md:grid-cols-[7fr_5fr]">
          <div>
            <h2 className="type-title">{sectionCopy(page, 'about', 'story').title}</h2>
            <p className="mt-5 text-lg">{founder.bio}</p>
            {founder.linkedinUrl ? (
              <a href={founder.linkedinUrl} className="mt-6 inline-block text-[15px] font-bold text-ink link-underline">
                {founder.name} on LinkedIn
              </a>
            ) : null}
          </div>
          <figure id={`person-${founder.slug}`} className="mx-auto w-full max-w-[420px]">
            <div className="relative">
              <Image src={founder.photo.src} alt={founder.photo.alt} width={750} height={750} className="relative aspect-square w-full object-cover" />
            </div>
            <figcaption className="mt-8 font-bold text-ink">
              {founder.fullName}
              <span className="block text-[15px] font-medium text-[#5e5e5e]">{founder.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="wrap pb-[clamp(64px,8vw,120px)]">
        <h2 id="timeline-heading" className="text-[13px] font-bold tracking-[0.14em] text-ink uppercase">
          {sectionCopy(page, 'about', 'timeline').title}
        </h2>
        <ol className="mt-6 grid gap-0 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-6">
          {lists.milestones.map((m) => (
            <li key={m.year} className="relative border-b border-border py-5 pr-5 lg:border-b-0 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0">
              <span aria-hidden className="absolute -top-[7px] left-0 size-3 rounded-full bg-magenta lg:left-5 lg:first:left-0" />
              <p className="text-2xl font-semibold tracking-tight text-ink">{m.year}</p>
              <p className="mt-2 text-[15px]">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Beliefs */}
      <section id="beliefs" className="lg:scroll-mt-14 bg-warm">
        <div className="wrap section-pad">
          <SectionHead title={sectionCopy(page, 'about', 'beliefs').title} intro={sectionCopy(page, 'about', 'beliefs').intro} />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lists.beliefs.map((b, i) => (
              <li key={b.title} className={i === 0 ? 'flex flex-col rounded-2xl bg-night p-7 text-[#d6d2db] lg:row-span-2' : 'flex flex-col rounded-2xl bg-white p-7'}>
                <span className={`text-sm font-bold ${i === 0 ? 'text-magenta-soft' : 'text-magenta'}`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={i === 0 ? 'mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-white' : 'mt-3 text-xl'}>{b.title}</h3>
                <p className={i === 0 ? 'mt-2 text-lg font-semibold text-magenta-soft' : 'mt-1 font-semibold text-magenta'}>{b.short}</p>
                <p className="mt-3 text-[16px]">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we succeed + why BOOM! */}
      <section id="why" className="wrap section-pad lg:scroll-mt-14">
        <SectionHead title={sectionCopy(page, 'about', 'howWeSucceed').title} intro={sectionCopy(page, 'about', 'howWeSucceed').intro} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {lists.values.map((v) => (
            <div key={v.title}>
              <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.04em] after:mt-4 after:block after:h-[3px] after:w-9 after:bg-burst">{v.title}</h3>
              <p className="mt-4">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(56px,7vw,96px)] grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
          <div>
            <h3 className="type-title text-[clamp(1.8rem,3vw,2.5rem)]">{sectionCopy(page, 'about', 'whyChoose').title}</h3>
            <p className="mt-4">{sectionCopy(page, 'about', 'whyChoose').intro}</p>
            <WorkplaceBadges size="sm" className="mt-8" />
            <p className="mt-4 rounded-xl bg-magenta-tint px-5 py-4 text-[15px] text-ink">
              <strong>Proud to be a great place to work.</strong> {workplace.headline.boom} of the team say so, against {workplace.headline.typical} at a typical UK company, and we&apos;re {workplace.lists[1]?.rank} in the UK&apos;s {workplace.lists[1]?.name}.{' '}
              <a href={workplace.source} className="font-bold link-underline [text-underline-offset:4px]">
                Great Place To Work®
              </a>
            </p>
          </div>
          <div>
            <ol className="border-t-2 border-ink">
              {lists.differentiators.map((w, i) => (
                <li key={w.title} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-border py-5 sm:grid-cols-[48px_200px_1fr]">
                  <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="text-lg font-semibold text-ink">{w.title}</h4>
                  <p className="col-start-2 sm:col-start-auto">{w.body}</p>
                </li>
              ))}
            </ol>
            <h4 className="mt-10 text-[13px] font-bold tracking-[0.14em] text-ink uppercase">{sectionCopy(page, 'about', 'bestFitHeading').title}</h4>
            <ul className="mt-3 space-y-2">
              {lists.bestFit.map((f) => (
                <li key={f.body} className="relative pl-7 before:absolute before:top-[0.8rem] before:left-0 before:h-0.5 before:w-4 before:bg-magenta">
                  {f.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad">
          <div className="grid items-end gap-10 md:grid-cols-[7fr_5fr]">
            <div>
              <SectionHead
                tone="light"
                className="mb-0"
                title={`${settings.teamSize} specialists in the band.`}
                intro={`${teamMix.where} Every brief gets the line-up it needs.`}
              />
              <div className="mt-8">
                <TextLink href="/careers" light>
                  Think you&apos;re a Wilbury?
                </TextLink>
              </div>
            </div>
            <figure className="relative rounded-2xl border border-[#2e2e2e] bg-night-2 p-8">
              <span aria-hidden className="absolute -top-6 left-6 text-7xl leading-none font-semibold text-magenta">&ldquo;</span>
              <blockquote className="text-2xl leading-snug font-medium tracking-tight text-white">{glassdoor.quote}</blockquote>
              <figcaption className="mt-5 text-sm">
                {glassdoor.attribution} ·{' '}
                <a href={glassdoor.url} target="_blank" rel="noreferrer" className="link-underline text-magenta-soft">
                  {glassdoor.rating} on Glassdoor
                </a>
              </figcaption>
            </figure>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#2e2e2e] sm:grid-cols-2 lg:grid-cols-5">
            {teamMix.disciplines.map((d) => (
              <li key={d.label} className="bg-night-2 p-6">
                <p className="text-4xl font-semibold tracking-tight text-white">{d.count}</p>
                <p className="mt-2 font-semibold text-white">{d.label}</p>
                <p className="mt-1 text-[14px]">{d.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px]">
            <span className="font-semibold text-white">Science runs deep.</span> Between us we&apos;ve studied {teamMix.backgrounds.slice(0, -1).join(', ').toLowerCase()} and{' '}
            {teamMix.backgrounds[teamMix.backgrounds.length - 1].toLowerCase()}, so the people writing about the data understand it.
          </p>
        </div>
        <div id="offices" className="wrap lg:scroll-mt-14 pb-[clamp(64px,8vw,120px)]">
          <OfficeStrip offices={settings.offices} />
        </div>
      </section>

      <CtaBand title={sectionCopy(page, 'about', 'aboutCta').title} body={sectionCopy(page, 'about', 'aboutCta').intro ?? ''} />
    </>
  )
}
