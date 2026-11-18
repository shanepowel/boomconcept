import type { Metadata } from 'next'
import { CtaBand, PageHero, SectionHead } from '@/components/site/blocks'
import { disciplines, getPage } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('whatWeDo', { stega: false })
  return { title: page.seoTitle || 'What we do', description: page.seoDescription }
}

export default async function WhatWeDoPage() {
  const page = await getPage('whatWeDo')
  return (
    <>
      <PageHero copy={page} />

      <nav aria-label="On this page" className="border-b border-border">
        <ul className="wrap flex flex-wrap gap-x-8 gap-y-2 py-4 text-[15px] font-semibold text-ink">
          {disciplines.map((d) => (
            <li key={d.id}>
              <a href={`#${d.id}`} className="hover:text-magenta">
                <span className="mr-2 text-magenta">{d.number}</span>
                {d.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#veeva" className="hover:text-magenta">
              <span className="mr-2 text-magenta">04</span>Veeva
            </a>
          </li>
        </ul>
      </nav>

      {disciplines.map((d, i) => (
        <section key={d.id} id={d.id} className={i % 2 === 1 ? 'bg-warm' : undefined}>
          <div className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
            <div>
              <p className="text-sm font-bold tracking-wider text-magenta">{d.number}</p>
              <h2 className="mt-2 text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-[-0.045em]">{d.name}</h2>
              <p className="mt-6 text-xl text-ink">{d.heading}</p>
            </div>
            <div>
              <p className="text-lg">{d.body}</p>
              <h3 className="mt-8 text-[13px] font-bold tracking-[0.14em] text-ink uppercase">The questions we answer</h3>
              <ul className="mt-3">
                {d.questions.map((q) => (
                  <li key={q} className="relative border-b border-border py-3 pl-7 text-ink before:absolute before:top-[1.35rem] before:left-0 before:h-0.5 before:w-4 before:bg-magenta">
                    {q}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-[13px] font-bold tracking-[0.14em] text-ink uppercase">Services</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {d.services.map((s) => (
                  <li key={s} className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-semibold text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section id="veeva" className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid items-center gap-10 md:grid-cols-[7fr_5fr]">
          <SectionHead
            tone="light"
            className="mb-0"
            eyebrow="04 · Veeva"
            title="Built for how pharma actually works."
            intro="We're Veeva Multichannel and Vault Content Partners. That means content built to run in your systems and through your approval process, not rebuilt at the last minute."
          />
          <ul className="grid grid-cols-2 gap-3">
            {['CLM', 'Approved Email', 'PromoMats', 'Engage Meeting', 'Engage for Portals'].map((c) => (
              <li key={c} className="rounded-lg border border-[#3c3944] px-4 py-3 font-semibold text-white">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Bring us the complicated brief." body="We'll ask the right questions and put the right people on it." />
    </>
  )
}
