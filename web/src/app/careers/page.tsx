import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero, SectionHead } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { WorkplaceBadges } from '@/components/site/badges'
import { getPage, getPerks, getSettings, glassdoor, people2025, workplace } from '@/lib/data'

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
            They&apos;re proactive and curious, they solve problems, they have a good sense of humour, and they&apos;d rather win TOGETHER than alone. We&apos;re proud of the team we&apos;ve built, and we&apos;re still growing.
          </p>
        </div>
      </section>

      {/* Great Place To Work */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad">
          <div className="grid items-end gap-10 md:grid-cols-[7fr_5fr]">
            <SectionHead
              tone="light"
              className="mb-0"
              eyebrow="Don't just take our word for it"
              title="96% of the team say it's a great place to work."
              intro={`That's against ${workplace.headline.typical} at a typical UK company, from the independent Great Place To Work® survey of our team.`}
            />
            <p className="text-[clamp(4.5rem,11vw,9rem)] leading-none font-semibold tracking-[-0.06em] text-white">
              96<span className="text-magenta">%</span>
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#2e2e2e] sm:grid-cols-2 lg:grid-cols-4">
            {workplace.stats.map((st) => (
              <li key={st.label} className="bg-night-2 p-6">
                <p className="text-3xl font-semibold tracking-tight text-white">{st.value}</p>
                <p className="mt-2 text-[15px]">{st.label}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-10 lg:grid-cols-[7fr_5fr]">
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.14em] text-white uppercase">Five UK Best Workplaces™ lists in 2026</h3>
              <WorkplaceBadges showRanks dark className="mt-5" />
              <a href={workplace.source} className="mt-4 inline-block text-sm font-bold text-white link-underline [text-underline-offset:4px]">
                See our Great Place To Work® profile
              </a>
            </div>
            <figure className="rounded-2xl bg-night-2 p-7">
              <p className="text-sm font-semibold text-magenta-soft">
                Glassdoor · {glassdoor.rating} out of 5 from {glassdoor.reviews} reviews
              </p>
              <blockquote className="mt-4 text-[clamp(1.3rem,2vw,1.6rem)] leading-snug font-medium text-white">&ldquo;{glassdoor.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-[15px]">{glassdoor.attribution}</figcaption>
              <a href={glassdoor.url} className="mt-5 inline-block text-sm font-bold text-white link-underline [text-underline-offset:4px]">
                Read the reviews
              </a>
            </figure>
          </div>
        </div>
      </section>

      {/* Culture gallery */}
      <section className="wrap section-pad">
        <SectionHead
          eyebrow="Life outside the brief"
          title="We celebrate TOGETHER, too."
          intro="Star Wars Day, socials in London, and a five-year birthday conference in Lisbon. Every person in our survey said we celebrate special events, and we meant it."
        />
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {workplace.photos.map((ph, i) => (
            <li key={ph.src} className={i === 0 ? 'relative col-span-2 overflow-hidden rounded-2xl md:row-span-2' : 'relative overflow-hidden rounded-2xl'}>
              <figure className="group h-full">
                <Image
                  src={ph.src}
                  alt={ph.caption}
                  width={1000}
                  height={750}
                  sizes={i === 0 ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-3 pt-10 text-[13px] leading-snug text-white sm:text-sm">
                  {ph.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-[#5e5e5e]">Photos: BOOM!&apos;s Great Place To Work® profile.</p>

        <dl className="mt-[clamp(48px,6vw,80px)] grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {people2025.map((m) => (
            <div key={m.label} className="bg-white p-6">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-4xl font-semibold tracking-tight text-ink">{m.value}</span>
                <span className="mt-2 block text-[15px]">{m.label} (2025)</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-[#5e5e5e]">
          From our{' '}
          <Link href="/sustainability" className="underline">
            2026 sustainability report
          </Link>
          .
        </p>
      </section>

      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead
            eyebrow="Life at BOOM!"
            title="People at the heart. The journey should be enjoyable."
            intro="Teamwork, trust and the right support to grow. We win TOGETHER, we lose TOGETHER, and most importantly we do it TOGETHER."
          />
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
