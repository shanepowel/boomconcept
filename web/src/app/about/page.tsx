import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand, Eyebrow, PageHero, SectionHead, TextLink } from '@/components/site/blocks'
import { SubNav } from '@/components/site/sub-nav'
import { beliefs, bestFit, getPage, getSettings, getTeam, values } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about', { stega: false })
  return { title: page.seoTitle || 'About', description: page.seoDescription }
}

const why = [
  { title: 'Independent', body: "Your work matters more to us. It's personal." },
  { title: 'Healthcare experts', body: 'Everyone here is a healthcare communications specialist, so quality is built in.' },
  { title: 'The right band', body: 'We build the team around your needs, and bring in specific expertise whenever it helps.' },
  { title: 'Genuine partnership', body: 'Long-term relationships that grow, built on the everyday, not just the pitch.' },
  { title: 'Process with purpose', body: 'Process underpins our performance, because consistency builds trust.' },
]

export default async function AboutPage() {
  const [page, team, settings] = await Promise.all([getPage('about'), getTeam(), getSettings()])
  const founder = team.find((m) => m.isFounder) ?? team[0]
  const leaders = team.filter((m) => m !== founder)

  return (
    <>
      <PageHero copy={page}>
        <ul className="mt-10 flex" aria-label="The leadership team">
          {team.map((m) => (
            <li key={m.slug} className="-ml-3 first:ml-0">
              <Image src={m.photo.src} alt={m.photo.alt} width={184} height={184} className="size-[clamp(56px,7vw,88px)] rounded-full border-4 border-night object-cover" />
            </li>
          ))}
        </ul>
      </PageHero>
      <SubNav
        items={[
          { id: 'story', label: 'Our story' },
          { id: 'beliefs', label: 'What we believe' },
          { id: 'why', label: 'Why BOOM!' },
          { id: 'band', label: 'The band' },
        ]}
      />

      {/* Story */}
      <section id="story" className="wrap section-pad scroll-mt-36">
        <div className="grid items-center gap-[clamp(40px,6vw,96px)] md:grid-cols-[7fr_5fr]">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="type-title">Ten years inside pharma. Then he switched sides.</h2>
            <p className="mt-5 text-lg">{founder.bio}</p>
            {founder.linkedinUrl ? (
              <a href={founder.linkedinUrl} className="mt-6 inline-block text-[15px] font-bold text-ink link-underline">
                {founder.name} on LinkedIn
              </a>
            ) : null}
          </div>
          <figure className="mx-auto w-full max-w-[420px]">
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

      {/* Beliefs */}
      <section id="beliefs" className="scroll-mt-36 bg-warm">
        <div className="wrap section-pad">
          <SectionHead
            eyebrow="What we believe"
            title="We believe in achieving TOGETHER."
            intro="Creativity and chemistry win pitches. It's the everyday that produces great results and long partnerships, so that's where our beliefs live."
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <li key={b.title} className={i === 0 ? 'flex flex-col rounded-2xl bg-night p-7 text-[#d6d2db] lg:row-span-2' : 'flex flex-col rounded-2xl bg-white p-7'}>
                <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                <h3 className={i === 0 ? 'mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-white' : 'mt-3 text-xl'}>{b.title}</h3>
                <p className={i === 0 ? 'mt-2 text-lg font-semibold text-magenta-soft' : 'mt-1 font-semibold text-magenta'}>{b.short}</p>
                <p className="mt-3 text-[16px]">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we succeed + why BOOM! */}
      <section id="why" className="wrap section-pad scroll-mt-36">
        <SectionHead eyebrow="How we succeed" title="Experience. Skill. Effort. Courage." intro="Four things we bring to every brief, and the reason clients stay." />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.04em] after:mt-4 after:block after:h-[3px] after:w-9 after:bg-burst">{v.title}</h3>
              <p className="mt-4">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(56px,7vw,96px)] grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow>Why choose BOOM!</Eyebrow>
            <h3 className="type-title text-[clamp(1.8rem,3vw,2.5rem)]">The agency you&apos;d absolutely hate to lose.</h3>
            <p className="mt-4">
              It&apos;s not one single thing that makes working with us a success. It&apos;s several, and they depend on each other. Our aim is simple: to be the agency our
              clients would hate to lose, and the place our people would hate to leave.
            </p>
            <p className="mt-6 rounded-xl bg-magenta-tint px-5 py-4 text-[15px] text-ink">
              <strong>Proud to be a great place to work.</strong> Five 2026 UK Best Workplaces badges, including Wellbeing, Development and Women.
            </p>
          </div>
          <div>
            <ol className="border-t-2 border-ink">
              {why.map((w, i) => (
                <li key={w.title} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-border py-5 sm:grid-cols-[48px_200px_1fr]">
                  <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="text-lg font-semibold text-ink">{w.title}</h4>
                  <p className="col-start-2 sm:col-start-auto">{w.body}</p>
                </li>
              ))}
            </ol>
            <h4 className="mt-10 text-[13px] font-bold tracking-[0.14em] text-ink uppercase">Who we work best with</h4>
            <ul className="mt-3 space-y-2">
              {bestFit.map((f) => (
                <li key={f} className="relative pl-7 before:absolute before:top-[0.8rem] before:left-0 before:h-0.5 before:w-4 before:bg-magenta">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The band */}
      <section id="band" className="wrap section-pad scroll-mt-36">
        <SectionHead
          eyebrow="The band"
          title="Great alone. Better TOGETHER."
          intro="The Traveling Wilburys were five musicians who could each fill a stadium, and who made something better together. That's how we build teams: senior specialists, brought together around your brief."
        />
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((m) => (
            <li key={m.slug} className="flex flex-col">
              <Image src={m.photo.src} alt={m.photo.alt} width={600} height={630} className="aspect-[4/4.2] w-full rounded-xl bg-warm object-cover object-[center_25%]" />
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
      </section>

      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad grid items-end gap-10 md:grid-cols-[7fr_5fr]">
          <div>
            <SectionHead
              tone="light"
              className="mb-0"
              eyebrow="The wider team"
              title={`${settings.teamSize} specialists in all.`}
              intro={`Strategists, medical writers, researchers, creatives, digital producers, project managers and client service leads across ${settings.offices
                .map((o) => o.city)
                .join(', ')}. Every brief gets the line-up it needs.`}
            />
            <div className="mt-8">
              <TextLink href="/careers" light>
                Think you&apos;re a Wilbury?
              </TextLink>
            </div>
          </div>
          <p className="text-[clamp(4rem,10vw,8rem)] leading-none font-semibold tracking-[-0.06em] text-white">
            {settings.teamSize}
            <span className="text-magenta">.</span>
          </p>
        </div>
      </section>

      <CtaBand title="Let's work something out." body="Tell us what you're working on and we'll bring the right people to the first conversation." />
    </>
  )
}
