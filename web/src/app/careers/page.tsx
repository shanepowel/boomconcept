import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, SectionHead } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { getPage, getPerks, getSettings } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('careers', { stega: false })
  return { title: page.seoTitle || 'Careers', description: page.seoDescription }
}

const dayToDay = [
  { title: 'Every day starts at 8.45', body: 'A quick team call to catch up and get aligned. Then you get on with it.' },
  { title: 'Hybrid by design', body: 'Work from home and from our offices, with face-to-face time when it moves the work on.' },
  { title: 'Flexible where it counts', body: 'Core hours of 8.45 to 5.30, flexibility when life needs it, and shorter days considered for the right person.' },
  { title: 'Real variety', body: 'Strategy, research, science, creative, digital, project management and client services all have a part to play.' },
]

export default async function CareersPage() {
  const [page, perks, settings] = await Promise.all([getPage('careers'), getPerks(), getSettings()])
  return (
    <>
      <PageHero copy={page}>
        <div className="mt-8">
          <Button asChild variant="magenta" size="xl">
            <a href="#join">
              Join the band <ArrowUpRight aria-hidden />
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow>What a Wilbury is</Eyebrow>
          <h2 className="type-title">Brilliant at the job. Great to work with.</h2>
        </div>
        <div className="space-y-5 text-lg">
          <p>
            A Wilbury has the skill and the confidence to do the job really well, and the potential to become world-class with the right experience and support.
          </p>
          <p>
            They&apos;re proactive and curious, they solve problems, they have a good sense of humour, and they&apos;d rather win TOGETHER than alone. Recognised as a great place to
            work in 2026, we&apos;re proud of the team we&apos;ve built, and we&apos;re still growing.
          </p>
        </div>
      </section>

      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="Life at BOOM!" title="Good work should feel good to do." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dayToDay.map((d) => (
              <div key={d.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-xl leading-tight">{d.title}</h3>
                <p className="mt-3 text-[16px]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section-pad">
        <SectionHead eyebrow="The perks" title="The small print we're proud of." />
        <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <li key={p.title} className="bg-white p-7">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-[16px]">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="join" className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <SectionHead
            tone="light"
            className="mb-0"
            eyebrow="Open roles"
            title="Join the band."
            intro="We don't have an open role listed right now, but we're always happy to meet a Wilbury. Tell us what you do and why BOOM! appeals."
          />
          <div className="flex flex-col gap-4">
            <Button asChild variant="magenta" size="xl">
              <Link href="/contact?topic=careers">
                Get in touch <ArrowUpRight aria-hidden />
              </Link>
            </Button>
            <a href={settings.linkedinUrl} className="font-bold text-white link-underline">
              Follow BOOM! on LinkedIn for new roles
            </a>
          </div>
        </div>
      </section>

      <CtaBand title="Want to see who you'd be working with?" body="Meet the people behind the work." href="/about#band" label="Meet the band" />
    </>
  )
}
