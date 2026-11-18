import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Download, ShieldCheck } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, SectionHead } from '@/components/site/blocks'
import { WorkplaceBadges } from '@/components/site/badges'
import { Button } from '@/components/ui/button'
import { people2025, sustainability } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Sustainability',
  description: "BOOM!'s sustainability commitments, people and data security practices, and 2025 reporting against SASB standards.",
}

export default function SustainabilityPage() {
  return (
    <>
      <PageHero copy={{ eyebrow: 'Sustainability', title: 'Doing the work the right way.', lede: sustainability.intro }}>
        <div className="mt-8">
          <Button asChild variant="magenta" size="xl">
            <a href={sustainability.reportUrl}>
              Download the 2026 report <Download aria-hidden />
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="wrap section-pad">
        <SectionHead eyebrow="Our commitments" title="Four pillars, built into everyday work." />
        <ul className="grid gap-5 md:grid-cols-2">
          {sustainability.pillars.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-border p-7">
              <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-2xl">{p.title}</h3>
              <p className="mt-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="People" title="A people-first culture, in numbers." intro="From our 2025 reporting. Social sustainability starts with the team." />
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {people2025.map((m) => (
              <div key={m.label} className="bg-white p-6">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block text-4xl font-semibold tracking-tight text-ink">{m.value}</span>
                  <span className="mt-2 block text-[15px]">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <WorkplaceBadges size="sm" />
            <Link href="/careers" className="font-bold text-ink link-underline">
              Life at BOOM!
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow tone="light">Data security and ethics</Eyebrow>
            <h2 className="type-title text-white">Your data, handled properly.</h2>
            <p className="mt-4 text-[#d0ccd6]">We take a proactive approach to security across our systems, platforms and processes.</p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {sustainability.metrics2025.map((m) => (
                <div key={m.label} className="rounded-xl border border-[#2e2e2e] bg-night-2 p-4">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold text-white">{m.value}</span>
                    <span className="mt-1 block text-sm">{m.label} in 2025</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="self-center">
            {sustainability.security.map((item) => (
              <li key={item} className="flex gap-3 border-b border-[#2e2e2e] py-4 text-white">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-magenta-soft" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow>How we report</Eyebrow>
          <h2 className="type-title">Measured against recognised standards.</h2>
        </div>
        <div>
          <ul>
            {sustainability.standards.map((s) => (
              <li key={s} className="relative border-b border-border py-4 pl-7 text-ink before:absolute before:top-[1.6rem] before:left-0 before:h-0.5 before:w-4 before:bg-magenta">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-xl bg-magenta-tint p-5 text-ink">
            <strong>What&apos;s next.</strong> {sustainability.next}
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <a href={sustainability.reportUrl} className="inline-flex items-center gap-2 font-bold text-ink link-underline">
              Download the full report <Download className="size-4" aria-hidden />
            </a>
            <Link href="/services#procurement" className="inline-flex items-center gap-2 font-bold text-ink link-underline">
              Procurement information <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title="Need this for a supplier review?" body="We can share our policies, certifications and reporting with your procurement team." href="/contact?topic=procurement" label="Request our supplier pack" />
    </>
  )
}
