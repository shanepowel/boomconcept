import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, SectionHead, Tags } from '@/components/site/blocks'
import { SubNav } from '@/components/site/sub-nav'
import { Button } from '@/components/ui/button'
import { capabilities, disciplines, getBrandMoments, getPage, getSettings, processSteps } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('services', { stega: false })
  return { title: page.seoTitle || 'Services', description: page.seoDescription }
}

export default async function ServicesPage() {
  const [page, moments, settings] = await Promise.all([getPage('services'), getBrandMoments(), getSettings()])

  return (
    <>
      <PageHero copy={page} />
      <SubNav
        items={[
          ...disciplines.map((d) => ({ id: d.id, label: d.name, number: d.number })),
          { id: 'moments', label: 'When to call us' },
          { id: 'how-we-work', label: 'How we work' },
          { id: 'procurement', label: 'Procurement' },
        ]}
      />

      {/* Disciplines */}
      {disciplines.map((d, i) => (
        <section key={d.id} id={d.id} className={i % 2 === 1 ? 'scroll-mt-36 bg-warm' : 'scroll-mt-36'}>
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
              <Tags items={d.services} />
            </div>
          </div>
        </section>
      ))}

      {/* Supporting capabilities */}
      <section className="wrap py-[clamp(56px,7vw,96px)]">
        <SectionHead eyebrow="Behind every discipline" title="The skills that make it all work." className="mb-10" />
        <ul className="grid gap-5 md:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c.title} className="rounded-2xl border border-border p-7">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2 text-[16px]">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Veeva */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid items-center gap-10 md:grid-cols-[7fr_5fr]">
          <SectionHead
            tone="light"
            className="mb-0"
            eyebrow="Veeva partners"
            title="Built for how pharma actually works."
            intro="We're Veeva Multichannel and Vault Content Partners. Content is built to run in your systems and through your approval process, not rebuilt at the last minute."
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

      {/* Brand moments */}
      <section id="moments" className="wrap section-pad scroll-mt-36">
        <SectionHead
          eyebrow="When to call us"
          title="Wherever your brand is in its life."
          intro="Clients usually bring us in at one of five moments. We've been through each of them many times."
        />
        <ol className="border-t-2 border-ink">
          {moments.map((m, i) => (
            <li key={m.title} className="grid gap-x-[clamp(20px,3vw,48px)] gap-y-3 border-b border-border py-[clamp(26px,3vw,38px)] md:grid-cols-[72px_4fr_6fr]">
              <span className="text-[15px] font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[clamp(1.3rem,2vw,1.65rem)] leading-tight">
                <span className="mb-1.5 block text-[13px] font-bold tracking-[0.12em] text-[#5e5e5e] uppercase">{m.stage}</span>
                {m.title}
              </h3>
              <div>
                <p>{m.body}</p>
                <Tags items={m.tags} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* How we work */}
      <section id="how-we-work" className="scroll-mt-36 bg-warm">
        <div className="wrap section-pad">
          <SectionHead
            eyebrow="How we work"
            title="Process underpins our performance."
            intro="In a highly regulated industry, experience has taught us the value of process. Whether we're following your SOPs or bringing our own, a great idea only counts if it gets approved, on time and on budget."
          />
          <ol className="grid gap-6 md:grid-cols-5">
            {processSteps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 border-t-2 border-ink pt-5">
                <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl leading-tight">{s.title}</h3>
                <p className="text-[16px]">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-lg">
            From Microsoft Teams to Miro, we&apos;re set up to work just as well remotely as face to face. Every day starts with a quick team call, and when getting together will move the work on,
            we&apos;re there: in {settings.offices.map((o) => o.city).join(', ')} or at your office.
          </p>
        </div>
      </section>

      <div className="relative h-[clamp(220px,28vw,400px)] bg-night">
        <Image src="/images/boom-process.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      {/* Procurement */}
      <section id="procurement" className="scroll-mt-36 bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <Eyebrow tone="light">For procurement teams</Eyebrow>
            <h2 className="type-title text-white">Ready for your supplier checks.</h2>
            <p className="mt-4 max-w-[600px] text-[#d0ccd6]">
              Big organisations need suppliers they can check. We keep the essentials in one place: company details, data protection, information security, sustainability and our Veeva
              credentials. We work within the ABPI Code of Practice, report against SASB standards, and in 2025 had zero information security incidents.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-bold">
              <li>
                <Link href="/sustainability" className="text-white link-underline [text-underline-offset:4px]">
                  Sustainability and data security
                </Link>
              </li>
              <li>
                <a href={settings.sustainabilityUrl} className="text-white link-underline [text-underline-offset:4px]">
                  Sustainability report 2026
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-white link-underline [text-underline-offset:4px]">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white link-underline [text-underline-offset:4px]">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#2e2e2e] bg-night-2 p-7">
            <dl className="space-y-3 text-[15px]">
              {[
                ['UK company', `${settings.name} Limited`],
                ['Company number', settings.companyNumber],
                ['VAT number', settings.vatNumber],
                ['Registered office', settings.registeredOffice],
                ['Danish company', `${settings.danishEntity.name}, CVR ${settings.danishEntity.cvr}`],
                ['Founded', '2018'],
              ].map(([k, v], i, all) => (
                <div key={k} className={i < all.length - 1 ? 'flex justify-between gap-4 border-b border-[#2e2e2e] pb-3' : 'flex justify-between gap-4'}>
                  <dt>{k}</dt>
                  <dd className="max-w-[60%] text-right font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="magenta" size="xl" className="mt-6 w-full">
              <Link href="/contact?topic=procurement">
                Request our supplier pack <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand title="Bring us the complicated brief." body="We'll ask the right questions and put the right people on it." />
    </>
  )
}
