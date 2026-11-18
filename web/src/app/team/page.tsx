import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand, Eyebrow, PageHero, SectionHead } from '@/components/site/blocks'
import { getPage, getSettings, getTeam } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('team', { stega: false })
  return { title: page.seoTitle || 'The band', description: page.seoDescription }
}

export default async function TeamPage() {
  const [page, team, settings] = await Promise.all([getPage('team'), getTeam(), getSettings()])
  const founder = team.find((m) => m.isFounder) ?? team[0]
  const leaders = team.filter((m) => m !== founder)

  return (
    <>
      <PageHero copy={page}>
        <ul className="mt-10 flex" aria-label="The leadership team">
          {team.map((m) => (
            <li key={m.slug} className="-ml-3 first:ml-0">
              <Image src={m.photo.src} alt={m.photo.alt} width={184} height={184} className="size-[clamp(56px,7vw,92px)] rounded-full border-4 border-night object-cover" />
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Founder */}
      <section className="wrap section-pad">
        <div className="grid items-center gap-[clamp(40px,6vw,96px)] md:grid-cols-[7fr_5fr]">
          <div>
            <Eyebrow>Founder and CEO</Eyebrow>
            <h2 className="type-title">Ten years inside pharma. Then he switched sides.</h2>
            <p className="mt-5 text-lg">{founder.bio}</p>
            <div className="mt-6 flex flex-wrap gap-5 text-[15px] font-bold">
              {founder.linkedinUrl ? (
                <a href={founder.linkedinUrl} className="text-ink link-underline">
                  {founder.name} on LinkedIn
                </a>
              ) : null}
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[440px]">
            <div className="relative">
              <div aria-hidden className="absolute inset-0 translate-x-[-14px] translate-y-[14px] rounded-xl bg-burst" />
              <Image src={founder.photo.src} alt={founder.photo.alt} width={750} height={750} className="relative aspect-square w-full rounded-xl object-cover" />
            </div>
            <figcaption className="mt-8 font-bold text-ink">
              {founder.fullName}
              <span className="block text-[15px] font-medium text-[#5e5e5e]">{founder.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Leaders */}
      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="The leadership team" title="Meet the band." intro="The line-up changes with the brief. The experience stays close to the work." />
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((m) => (
              <li key={m.slug} className="flex flex-col">
                <Image src={m.photo.src} alt={m.photo.alt} width={600} height={630} className="aspect-[4/4.2] w-full rounded-xl bg-white object-cover object-[center_25%]" />
                <p className="mt-5 text-xs font-bold tracking-[0.12em] text-magenta uppercase">{m.discipline}</p>
                <h3 className="mt-1.5 text-2xl">{m.name}</h3>
                <p className="text-[15px] font-semibold text-ink">{m.role}</p>
                <p className="mt-3 text-[16px]">{m.bio}</p>
                {m.linkedinUrl ? (
                  <a href={m.linkedinUrl} className="mt-4 text-sm font-bold text-ink link-underline">
                    LinkedIn
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wider team */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid items-end gap-10 md:grid-cols-[7fr_5fr]">
          <SectionHead
            tone="light"
            className="mb-0"
            eyebrow="The wider team"
            title={`${settings.teamSize} specialists in all.`}
            intro={`Strategists, medical writers, researchers, creatives, digital producers, project managers and client service leads across ${settings.offices
              .map((o) => o.city)
              .join(', ')}. Every brief gets the line-up it needs.`}
          />
          <p className="text-[clamp(4rem,10vw,8rem)] leading-none font-semibold tracking-[-0.06em] text-white">
            {settings.teamSize}
            <span className="text-magenta">.</span>
          </p>
        </div>
      </section>

      <CtaBand title="Think you're a Wilbury?" body="We're always happy to meet people who are brilliant at the job and great to work with." href="/careers" label="Join the band" />
    </>
  )
}
