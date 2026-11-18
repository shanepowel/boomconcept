import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand, Eyebrow, PageHero, SectionHead, TextLink } from '@/components/site/blocks'
import { SubNav } from '@/components/site/sub-nav'
import { getPage, getSettings, getTeam, values } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about', { stega: false })
  return { title: page.seoTitle || 'About', description: page.seoDescription }
}

const why = [
  { title: 'Independent', body: 'Your work matters more to us, because it is personal.' },
  { title: 'Healthcare experts', body: 'Everyone here understands the science, the sector and the standards.' },
  { title: 'The right band', body: 'The right mix of skills for your brief, brought together from the start.' },
  { title: 'Genuine partnership', body: 'Open, day-to-day collaboration that makes the work better and lasts.' },
  { title: 'Process with purpose', body: 'Consistency builds trust, so we never leave delivery to chance.' },
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
          { id: 'values', label: 'What we believe' },
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

      {/* Values */}
      <section id="values" className="scroll-mt-36 bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="What we believe" title="Experience. Skill. Effort. Courage." />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.04em] after:mt-4 after:block after:h-[3px] after:w-9 after:bg-burst">{v.title}</h3>
                <p className="mt-4">{v.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-3xl text-[clamp(1.2rem,1.8vw,1.5rem)] text-ink">
            We win TOGETHER, we lose TOGETHER and, most importantly, we do everything <strong className="tracking-wide text-magenta">TOGETHER</strong>.
          </p>

          <div className="mt-[clamp(56px,7vw,96px)] grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
            <div>
              <h3 className="type-title text-[clamp(1.8rem,3vw,2.5rem)]">The agency you&apos;d hate to lose.</h3>
              <p className="mt-4">
                Chemistry and creativity win pitches. It&apos;s the everyday that makes a partnership: answering quickly, flagging risks early, and making sure the juice is worth the
                squeeze.
              </p>
            </div>
            <ol className="border-t-2 border-ink">
              {why.map((w, i) => (
                <li key={w.title} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-border py-5 sm:grid-cols-[48px_200px_1fr]">
                  <span className="text-sm font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="text-lg font-semibold text-ink">{w.title}</h4>
                  <p className="col-start-2 sm:col-start-auto">{w.body}</p>
                </li>
              ))}
            </ol>
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
