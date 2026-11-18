import Link from 'next/link'
import { Eyebrow } from './blocks'

export type LegalSection = { heading: string; body: React.ReactNode }

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string
  title: string
  intro: React.ReactNode
  updated?: string
  sections: LegalSection[]
}) {
  return (
    <section className="wrap section-pad">
      <div className="grid gap-[clamp(32px,6vw,96px)] lg:grid-cols-[4fr_8fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="type-title">{title}</h1>
          {updated ? <p className="mt-4 text-sm text-[#5e5e5e]">Last updated {updated}</p> : null}
          <nav aria-label="Sections" className="mt-8 hidden lg:block">
            <ol className="space-y-2 text-[15px]">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s${i + 1}`} className="hover:text-magenta">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className="mt-8 text-sm">
            <Link href="/terms" className="mr-4 font-bold text-ink link-underline">
              Terms
            </Link>
            <Link href="/privacy" className="mr-4 font-bold text-ink link-underline">
              Privacy
            </Link>
            <Link href="/cookies" className="font-bold text-ink link-underline">
              Cookies
            </Link>
          </p>
        </aside>
        <div>
          <div className="rounded-xl bg-warm p-6 text-[16px]">{intro}</div>
          <ol className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <li key={s.heading} id={`s${i + 1}`} className="scroll-mt-28">
                <h2 className="text-2xl">
                  <span className="mr-2 text-magenta">{i + 1}.</span>
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-[16px] leading-relaxed">{s.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
