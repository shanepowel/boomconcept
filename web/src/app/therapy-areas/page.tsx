import type { Metadata } from 'next'
import { CtaBand, Eyebrow, PageHero, SectionHead, Tags, TextLink } from '@/components/site/blocks'
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
      <PageHero copy={page}>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <TextLink href="#therapy-directory">Search therapy areas</TextLink>
          <TextLink href="/contact?topic=credentials">Request credentials</TextLink>
        </div>
      </PageHero>

      {/* Directory */}
      <section id="therapy-directory" className="border-b border-border">
        <div className="wrap section-pad">
          <SectionHead eyebrow="The full list" title="18 specialisms. 70+ therapy areas." intro="Search by condition, treatment or abbreviation." className="mb-0" />
          <TherapyDirectory areas={areas} />
        </div>
      </section>

      {/* Depth */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad">
          <SectionHead
            tone="light"
            eyebrow="Where we go deepest"
            title="Where we have the deepest experience."
            intro="Start with what makes the brief difficult, then see what our team has worked on."
          />
          <div className="overflow-hidden rounded-xl border border-[#2e2e2e]">
            <div className="hidden grid-cols-[3fr_4fr_5fr] gap-6 border-b border-[#2e2e2e] bg-night-2 px-7 py-3 text-xs font-bold tracking-[0.12em] text-magenta-soft uppercase md:grid">
              <span>Area</span>
              <span>Why it’s hard to communicate</span>
              <span>What we’ve worked on</span>
            </div>
            {specialist.map((s) => (
              <div key={s.name} className="grid gap-2 border-b border-[#2e2e2e] bg-[#16141b] px-7 py-6 last:border-b-0 md:grid-cols-[3fr_4fr_5fr] md:gap-6">
                <h3 className="text-xl text-white">{s.name}</h3>
                <p className="text-[16px] text-[#d0ccd6]">
                  <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-magenta-soft uppercase md:hidden">Why it’s hard</span>
                  {s.challenge}
                </p>
                <p className="text-[16px] text-[#d0ccd6]">
                  <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-magenta-soft uppercase md:hidden">What we’ve worked on</span>
                  {s.experience}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <TextLink href="/about#band" light>
              Meet the people behind the work
            </TextLink>
          </div>
        </div>
      </section>

      <section className="wrap section-pad grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-14">
        <div>
          <Eyebrow>Across therapy areas</Eyebrow>
          <h2 className="type-title">When the challenge crosses categories.</h2>
          <p className="mt-4">Some briefs need experience of a particular market change or treatment pathway. We bring that perspective into the team alongside therapy-area knowledge.</p>
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

      <CtaBand title="Got a brief in one of these areas?" body="Tell us the challenge. We'll put the right people around it." />
    </>
  )
}
