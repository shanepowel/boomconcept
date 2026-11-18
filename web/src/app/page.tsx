import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand, Eyebrow, SectionHead, Stats, TextLink } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { disciplines, getBrandMoments, getCaseStudies, getPage, getSettings, getTeam, values } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home', { stega: false })
  return { title: { absolute: page.seoTitle || page.title }, description: page.seoDescription }
}

export default async function HomePage() {
  const [page, settings, team, moments, cases] = await Promise.all([
    getPage('home'),
    getSettings(),
    getTeam(),
    getBrandMoments(),
    getCaseStudies(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="wrap py-[clamp(40px,6vw,88px)]">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
          <div>
            <h1 className="type-display">{page.title}</h1>
            <p className="mt-6 max-w-[560px] text-[clamp(1.08rem,1.4vw,1.25rem)] leading-relaxed">{page.lede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild variant="brand" size="xl">
                <Link href="/contact">
                  Bring us a brief <ArrowUpRight aria-hidden />
                </Link>
              </Button>
              <TextLink href="/team">Meet the band</TextLink>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-night">
            <Image src="/images/boom-splash.webp" alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <div className="absolute bottom-4 left-4 max-w-[80%] rounded-lg bg-night/85 px-5 py-4 text-sm text-white">
              <strong className="block text-2xl tracking-tight">{settings.teamSize} specialists</strong>
              One team across {settings.offices.map((o) => o.city).join(', ')}
            </div>
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <section aria-label="Credentials" className="border-y border-border">
        <ul className="wrap flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-semibold text-ink">
          {settings.proofPoints.map((point) => (
            <li key={point} className="inline-flex items-center gap-2.5 before:size-[7px] before:rounded-full before:bg-magenta">
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* What we do */}
      <section className="wrap section-pad">
        <SectionHead
          eyebrow="What we do"
          title="From the first question to the final approved asset."
          intro="One connected team for insight, strategy and communications, so nothing important gets lost in a handover."
          action={<TextLink href="/what-we-do">Explore our capabilities</TextLink>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {disciplines.map((d) => (
            <Link
              key={d.id}
              href={`/what-we-do#${d.id}`}
              className="group flex flex-col gap-3 rounded-xl border border-border p-7 transition hover:-translate-y-1 hover:border-magenta"
            >
              <span className="text-sm font-bold tracking-wider text-magenta">{d.number}</span>
              <h3 className="text-2xl">{d.name}</h3>
              <p>{d.heading}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 font-bold text-ink">
                Find out more <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap py-[clamp(56px,7vw,96px)]">
          <SectionHead tone="light" eyebrow="Experience" title="We've been here before." intro="Collective experience at global, regional and local level, including emerging markets." />
          <Stats stats={settings.stats} dark />
        </div>
      </section>

      {/* Expertise teaser */}
      <section className="wrap section-pad">
        <div className="grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow>Expertise</Eyebrow>
            <h2 className="type-title">Wherever your brand is in its life.</h2>
            <p className="mt-4">
              Launches, crowded classes, biosimilars, rare diseases with a few hundred patients. Whatever stage your brand is at, someone on our team has worked through it.
            </p>
            <div className="mt-7">
              <TextLink href="/expertise">See where our experience runs deepest</TextLink>
            </div>
          </div>
          <ol className="border-t-2 border-ink">
            {moments.map((m, i) => (
              <li key={m.title} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-border py-5">
                <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-[13px] font-bold tracking-[0.12em] text-[#5e5e5e] uppercase">{m.stage}</p>
                  <h3 className="mt-1 text-xl">{m.title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="Work" title="Work that moved things on." action={<TextLink href="/work">See the work</TextLink>} />
          <div className="grid gap-5 md:grid-cols-3">
            {cases.slice(0, 3).map((c, i) => (
              <Link key={c.title} href="/work" className="group overflow-hidden rounded-xl bg-white transition hover:-translate-y-1">
                <div
                  className={
                    ['bg-burst', 'bg-[linear-gradient(135deg,#111_0%,#5b2a86_60%,#d90070_100%)]', 'bg-[linear-gradient(135deg,#19b5d6_0%,#5b2a86_55%,#111_100%)]'][i % 3] +
                    ' flex h-40 items-end p-5'
                  }
                >
                  <span className="text-lg font-semibold text-white">{c.therapyArea}</span>
                </div>
                <div className="p-6">
                  {c.isExample ? <p className="mb-2 text-xs font-bold tracking-wider text-violet uppercase">Example case study</p> : null}
                  <h3 className="text-xl">{c.title}</h3>
                  <p className="mt-2 text-[15px]">{c.challenge}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The band */}
      <section className="wrap section-pad">
        <div className="grid items-center gap-[clamp(32px,6vw,96px)] md:grid-cols-[6fr_6fr]">
          <div>
            <Eyebrow>The band</Eyebrow>
            <h2 className="type-title">Senior people. On your work.</h2>
            <p className="mt-4">
              Our founder spent a decade inside Novartis before moving agency-side. Our leaders have run agencies, written the science and launched cell therapies. And they stay close to the work.
            </p>
            <div className="mt-7 flex flex-wrap gap-6">
              <TextLink href="/team">Meet the band</TextLink>
              <TextLink href="/careers">Join the band</TextLink>
            </div>
          </div>
          <ul className="grid grid-cols-4 gap-3 sm:gap-4">
            {team.map((m) => (
              <li key={m.slug}>
                <Image src={m.photo.src} alt={m.photo.alt} width={240} height={240} className="aspect-square w-full rounded-full object-cover ring-4 ring-white" />
                <p className="mt-2 text-center text-sm font-semibold text-ink">{m.name}</p>
              </li>
            ))}
            <li className="flex aspect-square items-center justify-center rounded-full bg-magenta p-2 text-center text-sm leading-tight font-bold text-white">
              +{Number(settings.teamSize) - team.length} more
            </li>
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="What we believe" title="Experience. Skill. Effort. Courage." action={<TextLink href="/about">Our values</TextLink>} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-2xl after:mt-3 after:block after:h-[3px] after:w-9 after:bg-burst">{v.title}</h3>
                <p className="mt-3">{v.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xl text-ink">
            And one word that holds them together: <strong className="tracking-wide text-magenta">TOGETHER</strong>.
          </p>
        </div>
      </section>

      <CtaBand title="We aim to be the agency you'd hate to lose." body="That starts with one conversation. Tell us what you're working on." />
    </>
  )
}
