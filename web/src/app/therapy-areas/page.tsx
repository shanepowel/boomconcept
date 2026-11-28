import { SubNav } from '@/components/site/sub-nav'
import { pageSections, sectionCopy } from '@/content/page-sections'
import type { Metadata } from 'next'
import { CtaBand, PageHero, EditableSectionHead, Tags, TextLink } from '@/components/site/blocks'
import { TherapyDirectory } from '@/components/site/therapy-directory'
import { getCaseStudies, getPage, getSpecialistAreas, getTherapyAreas } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('therapyAreas', { stega: false })
  return { title: page.seoTitle || 'Therapy areas', description: page.seoDescription }
}

export default async function TherapyAreasPage() {
  const [page, specialist, areas, cases] = await Promise.all([getPage('therapyAreas'), getSpecialistAreas(), getTherapyAreas(), getCaseStudies()])

  return (
    <>
      <PageHero copy={page} artwork="press">
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <TextLink href="#therapy-directory">Search therapy areas</TextLink>
          <TextLink href="/contact?topic=credentials">Request credentials</TextLink>
        </div>
      </PageHero>
      <SubNav items={[
        { id: 'therapy-directory', label: 'Directory' },
        { id: 'experience', label: 'Specialist experience' },
        { id: 'across', label: 'Across therapy areas' },
      ]} />

      {/* Directory */}
      <section id="therapy-directory" className="relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden className="cta-cloud opacity-60" />
        <div className="wrap section-pad">
          <EditableSectionHead page={page} id="directory" defaults={pageSections.therapyAreas.directory} tone="light" className="mb-0" />
          <TherapyDirectory areas={areas} />
        </div>
      </section>

      {/* Depth */}
      <section id="experience" className="bg-warm">
        <div className="wrap section-pad">
          <EditableSectionHead page={page} id="experience" defaults={pageSections.therapyAreas.experience} />
          <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
            <div className="hidden grid-cols-[3fr_4fr_5fr] gap-6 border-b border-ink/10 bg-ink px-7 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase md:grid">
              <span>Area</span>
              <span>Why it’s hard to communicate</span>
              <span>What we’ve worked on</span>
            </div>
            {specialist.map((s) => (
              <div key={s.name} className="grid gap-2 border-b border-ink/10 bg-white px-7 py-6 last:border-b-0 md:grid-cols-[3fr_4fr_5fr] md:gap-6">
                <h3 className="text-xl">{s.name}</h3>
                <p className="text-[16px]">
                  <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-magenta-dark uppercase md:hidden">Why it’s hard</span>
                  {s.challenge}
                </p>
                <p className="text-[16px]">
                  <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-magenta-dark uppercase md:hidden">What we’ve worked on</span>
                  {s.experience}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <TextLink href="/about#band">
              Meet the people behind the work
            </TextLink>
          </div>
        </div>
      </section>

      <section id="across" className="wrap section-pad section-split">
        <div>
          <h2 className="type-title">{sectionCopy(page, 'therapyAreas', 'across').title}</h2>
          <p className="mt-4">{sectionCopy(page, 'therapyAreas', 'across').intro}</p>
          <Tags items={['Rare disease', 'Biosimilars', 'Brand substitution', 'Generics', 'Multi-indication therapies']} />
        </div>
        {cases.length > 0 && (
          <div className="border-t border-ink pt-5">
            <h3 className="text-2xl">See how we’d approach a brief.</h3>
            <ul className="mt-3 divide-y divide-border">
              {cases.slice(0, 3).map((study) => (
                <li key={study.slug} className="py-3">
                  <p className="text-sm">{study.therapyArea}{study.isExample && ' · Illustrative case study'}</p>
                  <TextLink href={`/work/${encodeURIComponent(study.slug)}`}>{study.title}</TextLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <CtaBand title={sectionCopy(page, 'therapyAreas', 'therapyCta').title} body={sectionCopy(page, 'therapyAreas', 'therapyCta').intro ?? ''} />
    </>
  )
}
