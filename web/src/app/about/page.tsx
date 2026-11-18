import type { Metadata } from 'next'
import { CtaBand, Eyebrow, PageHero, SectionHead, TextLink } from '@/components/site/blocks'
import { getPage, values } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about', { stega: false })
  return { title: page.seoTitle || 'About', description: page.seoDescription }
}

const why = [
  { title: 'Independent', body: 'Your work matters more to us, because it is personal.' },
  { title: 'Healthcare experts', body: 'Everyone here understands the science, the sector and the standards.' },
  { title: 'The right band', body: 'The right mix of skills for your brief, brought together from the start.' },
  { title: 'Genuine partnership', body: 'Open, day-to-day collaboration that makes the work better and lasts.' },
  { title: 'Process with purpose', body: 'Consistency builds trust, so we never leave delivery to chance.' },
]

export default async function AboutPage() {
  const page = await getPage('about')
  return (
    <>
      <PageHero copy={page} />

      <section className="wrap section-pad">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title}>
              <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] tracking-[-0.04em] after:mt-4 after:block after:h-[3px] after:w-9 after:bg-burst">{v.title}</h2>
              <p className="mt-4">{v.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-[clamp(1.2rem,1.8vw,1.5rem)] text-ink">
          We win TOGETHER, we lose TOGETHER and, most importantly, we do everything <strong className="tracking-wide text-magenta">TOGETHER</strong>.
        </p>
      </section>

      <section className="bg-warm">
        <div className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow>Why BOOM!</Eyebrow>
            <h2 className="type-title">The agency you’d hate to lose.</h2>
            <p className="mt-4">
              We know chemistry and creativity win pitches. But it’s the everyday that makes a partnership: answering quickly, flagging risks early, and making sure the juice is worth the
              squeeze.
            </p>
          </div>
          <ol className="border-t-2 border-ink">
            {why.map((w, i) => (
              <li key={w.title} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-border py-5 sm:grid-cols-[48px_200px_1fr]">
                <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg">{w.title}</h3>
                <p className="col-start-2 sm:col-start-auto">{w.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section-pad">
        <SectionHead
          eyebrow="Our story"
          title="Pharma roots. Agency thinking."
          intro="Cory Inglis founded BOOM! in 2018 after ten years inside Novartis and more than a decade leading agencies on both sides of the Atlantic. The idea was simple: bring an explosion of experience closer to what clients actually need."
          action={
            <div className="flex flex-wrap gap-6">
              <TextLink href="/team">Meet the band</TextLink>
              <TextLink href="/how-we-work">How we work</TextLink>
            </div>
          }
        />
      </section>

      <CtaBand title="Let's work something out." body="Tell us what you're working on." />
    </>
  )
}
