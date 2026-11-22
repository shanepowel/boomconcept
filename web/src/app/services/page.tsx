import { BrandMoments } from '@/components/site/brand-moments'
import { pageSections } from '@/content/page-sections'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, EditableSectionHead, SectionHead, TextLink, Tags } from '@/components/site/blocks'
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
      <PageHero copy={page}>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <TextLink href="#insights">Explore our services</TextLink>
          <TextLink href="/therapy-areas">Find your therapy area</TextLink>
        </div>
      </PageHero>
      <SubNav
        items={[
          ...disciplines.map((d) => ({ id: d.id, label: d.name })),
          { id: 'moments', label: 'When to call us' },
          { id: 'how-we-work', label: 'How we work' },
          { id: 'procurement', label: 'Procurement' },
        ]}
      />

      {/* Disciplines */}
      {disciplines.map((d, i) => (
        <section key={d.id} id={d.id} className={i % 2 === 1 ? 'lg:scroll-mt-14 bg-warm' : 'lg:scroll-mt-14'}>
          <div className="wrap section-pad section-split">
            <div>
              <span aria-hidden className="mb-4 block h-0.5 w-12 bg-magenta" />
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

      <section className="border-y border-border bg-magenta-tint">
        <div className="wrap grid items-center gap-x-12 gap-y-4 py-9 md:grid-cols-[1.1fr_1fr]">
          <h2 className="text-3xl text-pretty">What would this look like on your brief?</h2>
          <div><TextLink href="/#lineup">See how we’d put a team together</TextLink></div>
        </div>
      </section>

      {/* Supporting capabilities */}
      <section className="wrap py-[clamp(56px,7vw,96px)]">
        <EditableSectionHead page={page} id="capabilities" defaults={pageSections.services.capabilities} className="mb-10" />
        <ul className="grid gap-x-8 md:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c.title} className="border-t border-ink py-5">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2 text-[16px]">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Veeva */}
      <section id="veeva" className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid items-center gap-10 md:grid-cols-[7fr_5fr]">
          <SectionHead
            tone="light"
            className="mb-0"
            eyebrow="Veeva partners"
            title="Built for how pharma actually works."
            intro="We’re Veeva Multichannel and Vault Content Partners. We plan for your channels, review process and local approvals from the first brief."
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
      <section id="moments" className="wrap section-pad lg:scroll-mt-14">
        <SectionHead
          eyebrow="When to call us"
          title="Find the moment that feels familiar."
          intro="Pick the stage your brand is at to see where we can help."
        />
        <BrandMoments moments={moments} />
      </section>

      {/* How we work */}
      <section id="how-we-work" className="lg:scroll-mt-14 bg-warm">
        <div className="wrap section-pad">
          <EditableSectionHead page={page} id="delivery" defaults={pageSections.services.delivery}
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
          <p className="mt-8 max-w-3xl">
            From Microsoft Teams to Miro, we&apos;re set up to work just as well remotely as face to face. Every day starts with a quick team call, and when getting together will move the work on,
            we&apos;re there: in {settings.offices.map((o) => o.city).join(', ')} or at your office.
          </p>
          <div className="mt-5"><TextLink href="/work#approach">See the approach in practice</TextLink></div>
        </div>
      </section>

      {/* Procurement */}
      <section id="procurement" className="lg:scroll-mt-14 bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
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
          <div className="min-w-0 rounded-xl border border-[#2e2e2e] bg-night-2 p-4 sm:p-7">
            <dl className="space-y-3 text-[15px]">
              {[
                ['UK company', `${settings.name} Limited`],
                ['Company number', settings.companyNumber],
                ['VAT number', settings.vatNumber],
                ['Registered office', settings.registeredOffice],
                ['Danish company', `${settings.danishEntity.name}, CVR ${settings.danishEntity.cvr}`],
                ['Founded', '2018'],
              ].map(([k, v], i, all) => (
                <div key={k} className={i < all.length - 1 ? 'grid gap-1 border-b border-[#2e2e2e] pb-3 sm:grid-cols-[2fr_3fr] sm:gap-4' : 'grid gap-1 sm:grid-cols-[2fr_3fr] sm:gap-4'}>
                  <dt>{k}</dt>
                  <dd className="min-w-0 font-semibold break-words text-white sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="magenta" size="xl" className="mt-6 h-auto min-h-12 w-full px-3 py-2 text-center whitespace-normal">
              <Link href="/contact?topic=procurement">
                Request supplier pack <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand title="Bring us the complicated brief." body="We'll ask the right questions and put the right people on it." />
    </>
  )
}
