import type { Metadata } from 'next'
import { CtaBand, PageHero } from '@/components/site/blocks'
import { getCaseStudies, getPage } from '@/lib/data'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('work', { stega: false })
  return { title: page.seoTitle || 'Work', description: page.seoDescription }
}

const art = [
  'bg-burst',
  'bg-[linear-gradient(135deg,#111_0%,#5b2a86_60%,#d90070_100%)]',
  'bg-[linear-gradient(135deg,#19b5d6_0%,#5b2a86_55%,#111_100%)]',
]

export default async function WorkPage() {
  const [page, cases] = await Promise.all([getPage('work'), getCaseStudies()])
  return (
    <>
      <PageHero copy={page} />
      <section className="bg-warm">
        <div className="wrap section-pad space-y-6">
          {cases.map((c, i) => (
            <article key={c.title} className="grid overflow-hidden rounded-xl bg-white md:grid-cols-[5fr_7fr]">
              <div className={cn('relative flex min-h-44 items-end p-6 md:min-h-72', art[i % art.length])}>
                <span className="text-[clamp(1.4rem,2.4vw,2rem)] font-semibold tracking-tight text-white">{c.therapyArea}</span>
              </div>
              <div className="p-[clamp(24px,3vw,40px)]">
                {c.isExample ? (
                  <p className="mb-3 inline-block rounded-full bg-[#efe8f6] px-3 py-1 text-xs font-bold tracking-wider text-violet uppercase">Example case study</p>
                ) : null}
                <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{c.title}</h2>
                <dl className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-[130px_1fr]">
                  {[
                    ['The challenge', c.challenge],
                    ['The people', c.audience],
                    ['The work', c.work],
                    ['What changed', c.outcome],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-[15px] font-bold text-ink">{k}</dt>
                      <dd className="mb-2 text-[16px] sm:mb-0">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Have a challenge in mind?" body="We'd love to hear about it. Tell us where your brand is and what needs to change." />
    </>
  )
}
