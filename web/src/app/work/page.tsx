import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, SectionHead, TextLink } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { getCaseStudies, getPage } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('work', { stega: false })
  return { title: page.seoTitle || 'Work', description: page.seoDescription }
}

const decisions = [
  {
    title: 'Agree on the decision that matters.',
    body: 'Start with who needs to do something differently. If the brief is to build awareness, ask what the audience needs to understand or decide after they’ve seen the work.',
    output: 'A brief with a named audience and a clear objective',
  },
  {
    title: 'Look for what’s getting in the way.',
    body: 'Read the evidence and listen to the people closest to the problem. Bring the researcher, strategist and scientific lead together early, while the brief can still change.',
    output: 'A positioning and evidence base the team can test',
  },
  {
    title: 'Make the work and plan how it travels.',
    body: 'Develop the core story, then decide what belongs in each channel. Agree the claims, owners and review steps before production so local teams know what they can adapt.',
    output: 'A channel plan, review-ready materials and a handover',
  },
]

export default async function WorkPage() {
  const [page, cases] = await Promise.all([getPage('work'), getCaseStudies()])
  const featured = cases.find((study) => !study.isExample) ?? cases[0]
  const otherCases = cases.filter((study) => study !== featured)

  return (
    <>
      <PageHero copy={page}>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild variant="magenta" size="xl"><a href="#approach">See our approach <ArrowDown aria-hidden /></a></Button>
          {featured && <TextLink href="#case-studies">Browse case studies</TextLink>}
        </div>
      </PageHero>

      <section id="approach" className="wrap section-pad">
        <SectionHead title="Before there’s anything to show, there’s a decision to make." intro="Here’s how we go from an open question to something a healthcare team can review, use and adapt." />
        <ol className="grid gap-x-7 gap-y-7 md:grid-cols-3">
          {decisions.map(({ title, body, output }, index) => (
            <li key={title} className="flex flex-col border-t border-ink pt-5">
              <p className="mb-3 text-sm font-bold text-magenta-dark">Step {index + 1}</p>
              <h3 className="text-2xl text-pretty">{title}</h3>
              <p className="mt-3 mb-5">{body}</p>
              <p className="mt-auto border-l-2 border-magenta bg-warm px-4 py-3 text-sm font-semibold text-ink">{output}</p>
            </li>
          ))}
        </ol>
        <div className="mt-7"><TextLink href="/services#how-we-work">See how we handle delivery and approval</TextLink></div>
      </section>

      {featured && (
        <section id="case-studies" aria-labelledby="featured-study" className="bg-night text-white">
          <div className="wrap section-pad grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <Eyebrow tone="light">{featured.isExample ? 'Illustrative case study' : 'Featured case study'}</Eyebrow>
              <h2 id="featured-study" className="type-title text-white">{featured.title}</h2>
              <p className="mt-3 text-sm font-bold text-magenta-soft">{featured.therapyArea}</p>
              <p className="mt-5 max-w-[48ch] text-white/80">{featured.challenge}</p>
              <div className="mt-6"><TextLink href={`/work/${encodeURIComponent(featured.slug)}`} light>Read the full case study</TextLink></div>
            </div>
            {featured.image ? (
              <Image src={featured.image.src} alt={featured.image.alt} width={1440} height={900} sizes="(min-width: 1024px) 44vw, 90vw" className="aspect-[8/5] w-full self-start object-cover" />
            ) : (
              <dl className="border-t border-magenta-soft">
                <div className="border-b border-white/20 py-5">
                  <dt className="mb-2 text-sm font-bold text-magenta-soft">Who needed to hear it</dt>
                  <dd className="text-white/85">{featured.audience}</dd>
                </div>
                <div className="border-b border-white/20 py-5">
                  <dt className="mb-2 text-sm font-bold text-magenta-soft">What the work involved</dt>
                  <dd className="text-white/85">{featured.work}</dd>
                </div>
              </dl>
            )}
          </div>
        </section>
      )}

      {otherCases.length > 0 && (
        <section className="wrap section-pad">
          <SectionHead title="Different briefs, different starting points." />
          <div className="grid gap-7 md:grid-cols-2">
            {otherCases.map((study) => (
              <article key={study.slug} className="border-t border-ink pt-5">
                {study.image && <Image src={study.image.src} alt={study.image.alt} width={1440} height={900} sizes="(min-width: 768px) 44vw, 90vw" className="mb-5 aspect-[8/5] w-full object-cover" />}
                <Eyebrow>{study.therapyArea || 'Case study'}{study.isExample && ' · Illustrative'}</Eyebrow>
                <h3 className="text-2xl text-pretty">{study.title}</h3>
                <p className="mt-3 max-w-[55ch]">{study.challenge}</p>
                <div className="mt-4"><TextLink href={`/work/${encodeURIComponent(study.slug)}`}>Read the case study<span className="sr-only">, {study.title}</span></TextLink></div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-warm">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6">
          <TextLink href="/#lineup">See who we’d put on your brief</TextLink>
          <TextLink href="/insights">Read more about how we think</TextLink>
        </div>
      </section>
      <CtaBand title="What’s the decision in front of you?" body="Tell us where the brief is stuck, who it needs to reach and what has to happen next." />
    </>
  )
}
