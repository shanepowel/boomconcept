import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, SectionHead } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { getPage, getSettings, processSteps } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('howWeWork', { stega: false })
  return { title: page.seoTitle || 'How we work', description: page.seoDescription }
}

export default async function HowWeWorkPage() {
  const [page, settings] = await Promise.all([getPage('howWeWork'), getSettings()])
  return (
    <>
      <PageHero copy={page} />

      <section className="wrap section-pad">
        <SectionHead eyebrow="Our process" title="Five steps, every time." intro="Tried-and-trusted ways of working, so everyone knows what's next and what's needed." />
        <ol className="grid gap-5 md:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 border-t-2 border-ink pt-5">
              <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-xl leading-tight">{s.title}</h3>
              <p className="text-[16px]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="relative h-[clamp(240px,30vw,420px)] bg-night">
        <Image src="/images/boom-process.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <section id="procurement" className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <SectionHead
            tone="light"
            className="mb-0"
            eyebrow="For procurement teams"
            title="Ready for your supplier checks."
            intro="Big organisations need suppliers they can check. We keep the essentials in one place: company details, data protection, information security, sustainability and our Veeva credentials."
          />
          <div className="rounded-xl border border-[#2e2e2e] bg-night-2 p-7">
            <dl className="space-y-3 text-[15px]">
              <div className="flex justify-between gap-4 border-b border-[#2e2e2e] pb-3">
                <dt>Company</dt>
                <dd className="text-right font-semibold text-white">{settings.name} Ltd</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#2e2e2e] pb-3">
                <dt>Company number</dt>
                <dd className="font-semibold text-white">{settings.companyNumber}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#2e2e2e] pb-3">
                <dt>VAT number</dt>
                <dd className="font-semibold text-white">{settings.vatNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Entities</dt>
                <dd className="text-right font-semibold text-white">UK and Denmark</dd>
              </div>
            </dl>
            <Button asChild variant="magenta" size="xl" className="mt-6 w-full">
              <Link href="/contact?topic=procurement">
                Request our supplier pack <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-2">
        <div>
          <Eyebrow>Ways of working</Eyebrow>
          <h2 className="type-title">In the room or on the call.</h2>
        </div>
        <div className="space-y-5 text-lg">
          <p>We’re as comfortable on Teams and Miro as we are in a workshop room. Every day starts with a quick team call, so whoever is on your brief is aligned before your inbox opens.</p>
          <p>
            When getting together will move the work on, we’re there: in {settings.offices.map((o) => o.city).join(', ')} or at your office.
          </p>
        </div>
      </section>

      <CtaBand title="Bring us into the conversation." body="We're ready for a challenging brief." />
    </>
  )
}
