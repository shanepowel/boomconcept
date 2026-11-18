import type { Metadata } from 'next'
import { CtaBand, Eyebrow, PageHero, SectionHead, Stats, Tags, TextLink } from '@/components/site/blocks'
import { TherapyDirectory } from '@/components/site/therapy-directory'
import { audiences, getBrandMoments, getPage, getSettings, getSpecialistAreas, getTherapyAreas } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('expertise', { stega: false })
  return { title: page.seoTitle || 'Expertise', description: page.seoDescription }
}

export default async function ExpertisePage() {
  const [page, settings, moments, specialist, areas] = await Promise.all([
    getPage('expertise'),
    getSettings(),
    getBrandMoments(),
    getSpecialistAreas(),
    getTherapyAreas(),
  ])

  return (
    <>
      <PageHero copy={page} />

      <section className="wrap pt-10">
        <Stats stats={settings.stats} />
      </section>

      {/* Moments */}
      <section className="wrap section-pad">
        <SectionHead
          eyebrow="The moments we're built for"
          title="Wherever your brand is in its life, we've been there."
          intro="Expertise isn't just knowing the disease. It's knowing what the brand needs next."
        />
        <ol className="border-t-2 border-ink">
          {moments.map((m, i) => (
            <li key={m.title} className="grid gap-x-[clamp(20px,3vw,48px)] gap-y-3 border-b border-border py-[clamp(26px,3vw,38px)] md:grid-cols-[72px_4fr_6fr]">
              <span className="text-[15px] font-bold text-magenta">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[clamp(1.3rem,2vw,1.65rem)] leading-tight">
                <span className="mb-1.5 block text-[13px] font-bold tracking-[0.12em] text-[#5e5e5e] uppercase">{m.stage}</span>
                {m.title}
              </h3>
              <div>
                <p>{m.body}</p>
                <Tags items={m.tags} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Depth */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad">
          <SectionHead
            tone="light"
            eyebrow="Hard science, made human"
            title="The harder the science, the more we enjoy it."
            intro="This is where our experience runs deepest. Each area has its own language, its own specialists and its own reasons why a message lands or doesn't."
          />
          <div className="overflow-hidden rounded-xl border border-[#2e2e2e]">
            <div className="hidden grid-cols-[3fr_4fr_5fr] gap-6 border-b border-[#2e2e2e] bg-night-2 px-7 py-3 text-xs font-bold tracking-[0.12em] text-magenta-soft uppercase md:grid">
              <span>Area</span>
              <span>Why it’s hard to communicate</span>
              <span>What we’ve worked on</span>
            </div>
            {specialist.map((s) => (
              <div key={s.name} className="grid gap-2 border-b border-[#2e2e2e] bg-[#16141b] px-7 py-6 last:border-b-0 md:grid-cols-[3fr_4fr_5fr] md:gap-6">
                <h3 className="text-xl text-white">{s.name}</h3>
                <p className="text-[16px] text-[#d0ccd6]">
                  <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-magenta-soft uppercase md:hidden">Why it’s hard</span>
                  {s.challenge}
                </p>
                <p className="text-[16px] text-[#d0ccd6]">
                  <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-magenta-soft uppercase md:hidden">What we’ve worked on</span>
                  {s.experience}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <TextLink href="/team" light>
              Meet the people behind the work
            </TextLink>
          </div>
        </div>
      </section>

      {/* Audiences + global */}
      <section className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-2">
        <div>
          <Eyebrow>Who we talk to</Eyebrow>
          <h2 className="type-title">We know who’s on the other side of the message.</h2>
          <ul className="mt-8">
            {audiences.map((a) => (
              <li key={a.title} className="relative border-b border-border py-4 pl-8 before:absolute before:top-[1.6rem] before:left-0 before:h-0.5 before:w-4 before:bg-magenta">
                <strong className="text-ink">{a.title}.</strong> {a.body}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-warm p-[clamp(28px,4vw,48px)] md:self-start">
          <Eyebrow>Global, regional, local</Eyebrow>
          <h2 className="type-title">One idea. Many markets.</h2>
          <p className="mt-4">
            We work at global, regional and local level, including emerging markets. With teams in the UK and Copenhagen, we know how a global idea needs to change to work in a local
            market, and how to keep it approved along the way.
          </p>
          <h3 className="mt-8 text-[13px] font-bold tracking-[0.14em] text-ink uppercase">Specialist knowledge</h3>
          <Tags items={['Rare disease', 'Biosimilars', 'Brand substitution', 'Generics', 'Multi-indication therapies']} />
        </div>
      </section>

      {/* Directory */}
      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead eyebrow="The full list" title="18 specialisms. 70+ therapy areas." intro="Search by condition, treatment or abbreviation." className="mb-0" />
          <TherapyDirectory areas={areas} />
        </div>
      </section>

      <CtaBand title="Got a brief in one of these areas?" body="Tell us the challenge. We'll put the right people around it." />
    </>
  )
}
