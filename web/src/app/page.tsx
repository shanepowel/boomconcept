import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { WorkplaceBadges } from '@/components/site/badges'
import { CtaBand, Eyebrow, SectionHead, Stats, TextLink } from '@/components/site/blocks'
import { Button } from '@/components/ui/button'
import { disciplines, getSpecialistAreas, getCaseStudies, getPage, getSettings, getTeam, beliefs } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home', { stega: false })
  return { title: { absolute: page.seoTitle || page.title }, description: page.seoDescription }
}

export default async function HomePage() {
  const [page, settings, team, specialist, cases] = await Promise.all([getPage('home'), getSettings(), getTeam(), getSpecialistAreas(), getCaseStudies()])

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
              <TextLink href="/about#band">Meet the band</TextLink>
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
          eyebrow="Services"
          title="From the first question to the final approved asset."
          intro="One connected team for insight, strategy and communications, so nothing important gets lost in a handover."
          action={<TextLink href="/services">Explore our services</TextLink>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {disciplines.map((d) => (
            <Link
              key={d.id}
              href={`/services#${d.id}`}
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

      {/* Therapy areas teaser */}
      <section className="wrap section-pad">
        <div className="grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow>Therapy areas</Eyebrow>
            <h2 className="type-title">We know the science. And the people it affects.</h2>
            <p className="mt-4">More than 70 therapy areas, from blockbuster classes to rare diseases with a few hundred patients. This is where our experience runs deepest.</p>
            <div className="mt-7">
              <TextLink href="/therapy-areas">See all therapy areas</TextLink>
            </div>
          </div>
          <ul className="border-t-2 border-ink">
            {specialist.map((a) => (
              <li key={a.name} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
                <h3 className="text-xl">{a.name}</h3>
                <p className="text-[15px]">{a.experience}</p>
              </li>
            ))}
          </ul>
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
              <TextLink href="/about#band">Meet the band</TextLink>
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

      {/* Beliefs */}
      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead
            eyebrow="What we believe"
            title="We believe in achieving TOGETHER."
            intro="Creativity and chemistry win pitches. It's the everyday that makes a partnership."
            action={<TextLink href="/about#beliefs">What we believe</TextLink>}
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {beliefs.map((b, i) => (
              <li key={b.title} className="bg-white p-6">
                <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg leading-snug">{b.title}</h3>
                <p className="mt-2 text-[15px]">{b.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Great place to work */}
      <section className="wrap py-[clamp(56px,7vw,96px)]">
        <div className="grid items-center gap-10 rounded-2xl border border-border p-[clamp(24px,4vw,48px)] lg:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow>Proud to be a great place to work</Eyebrow>
            <h2 className="type-title">
              96<span className="text-magenta">%</span> of our people say it&apos;s a great place to work.
            </h2>
            <p className="mt-4">
              Against 54% at a typical UK company. Happy teams do better work, and clients notice. We aim to be the place our people would hate to leave.
            </p>
            <div className="mt-6">
              <TextLink href="/careers">Life at BOOM!</TextLink>
            </div>
          </div>
          <WorkplaceBadges className="justify-start lg:justify-end" />
        </div>
      </section>

      <CtaBand title="We aim to be the agency you'd hate to lose." body="That starts with one conversation. Tell us what you're working on." />
    </>
  )
}
