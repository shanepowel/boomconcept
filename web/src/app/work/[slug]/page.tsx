import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaBand, PageHero, ReadingLayout } from '@/components/site/blocks'
import { getCaseStudies } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = (await getCaseStudies({ stega: false })).find((item) => item.slug === slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.challenge,
    robots: study.isExample ? { index: false } : undefined,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cases = await getCaseStudies()
  const study = cases.find((item) => item.slug === slug)
  if (!study) notFound()

  const chapters = [
    { id: 'challenge', title: 'The challenge', body: study.challenge },
    { id: 'people', title: 'The people', body: study.audience },
    { id: 'work', title: 'The work', body: study.work },
    { id: 'outcome', title: study.isExample ? 'Intended outcome' : 'What changed', body: study.outcome },
  ].filter(({ body }) => body)

  return (
    <>
      <PageHero artwork="echo" copy={{ eyebrow: study.therapyArea || 'Work', title: study.title, image: study.image }} />
      <ReadingLayout back={{ href: '/work', label: 'All work' }} chapters={chapters}>
        <div>
          {study.isExample && <p className="mb-8 border-l-2 border-magenta bg-warm px-5 py-4 text-sm"><strong className="block text-ink">Illustrative case study</strong>This scenario shows how BOOM! could approach a brief.</p>}
          <div className="border-t border-ink">
            {chapters.map(({ id, title, body }) => (
              <section id={id} key={id} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <h2 className="text-xl">{title}</h2>
                <p className="max-w-[60ch]">{body}</p>
              </section>
            ))}
          </div>
        </div>
      </ReadingLayout>
      <CtaBand title="Working on something similar?" body="Tell us about the challenge and where you need support." />
    </>
  )
}
