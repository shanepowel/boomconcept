import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PageCopy, Stat } from '@/content/types'
import type { SectionCopy } from '@/content/page-sections'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, tone = 'magenta', className }: { children: React.ReactNode; tone?: 'magenta' | 'light'; className?: string }) {
  return (
    <p
      className={cn(
        'mb-4 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] before:h-0.5 before:w-5 before:bg-current',
        tone === 'magenta' ? 'text-magenta-dark' : 'text-magenta-soft',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function PageHero({ copy, children, artwork = 'groove' }: { copy: PageCopy; children?: React.ReactNode; artwork?: 'groove' | 'echo' | 'press' }) {
  return (
    <section className="page-masthead border-b border-border bg-warm">
      <div className="wrap masthead-grid">
        <div>
          {copy.eyebrow && <Eyebrow>{copy.eyebrow}</Eyebrow>}
          <h1 className="editorial-display max-w-[18ch]">{copy.title}</h1>
          {copy.lede && <p className="mt-6 max-w-[58ch] text-lg leading-relaxed">{copy.lede}</p>}
          {children}
        </div>
        {copy.image ? (
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden masthead-photo bg-night-2">
              <Image src={copy.image.src} alt={copy.image.alt} fill sizes="(min-width: 1024px) 44vw, 90vw" className="object-cover" />
            </div>
            {(copy.image.caption || copy.image.credit) && <figcaption className="mt-2 text-sm">{[copy.image.caption, copy.image.credit].filter(Boolean).join(' · ')}</figcaption>}
          </figure>
        ) : (
          <div aria-hidden="true" className={`record-sleeve record-sleeve--${artwork}`}>
            <span className="record-disc" /><span className="record-label" />
          </div>
        )}
      </div>
    </section>
  )
}

export function ReadingLayout({ back, chapters, children }: {
  back: { href: string; label: string }
  chapters: { id: string; title: string }[]
  children: React.ReactNode
}) {
  return (
    <article className="wrap section-pad reading-layout">
      <aside className="reading-index">
        <TextLink href={back.href}>{back.label}</TextLink>
        {chapters.length > 0 && (
          <nav aria-label="Article sections" className="mt-5 border-t border-ink">
            <ul className="divide-y divide-border">
              {chapters.map(({ id, title }) => (
                <li key={id}><a href={`#${id}`} className="block py-2.5 text-sm font-semibold hover:text-magenta-dark">{title}</a></li>
              ))}
            </ul>
          </nav>
        )}
      </aside>
      <div className="min-w-0">{children}</div>
    </article>
  )
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  action,
  tone = 'magenta',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  action?: React.ReactNode
  tone?: 'magenta' | 'light'
  className?: string
}) {
  return (
    <div className={cn('mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-5', className)}>
      <div className="max-w-[720px]">
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <h2 className={cn('type-title', tone === 'light' && 'text-white')}>{title}</h2>
        {intro ? <p className={cn('mt-4 max-w-[600px]', tone === 'light' && 'text-[#d0ccd6]')}>{intro}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function EditableSectionHead({
  page,
  id,
  defaults,
  ...props
}: Omit<React.ComponentProps<typeof SectionHead>, keyof SectionCopy> & { page: PageCopy; id: string; defaults: SectionCopy }) {
  const copy = page.sections?.[id]

  return (
    <SectionHead
      eyebrow={copy?.eyebrow ?? defaults.eyebrow}
      title={copy?.title?.trim() ? copy.title : defaults.title}
      intro={copy?.intro ?? defaults.intro}
      {...props}
    />
  )
}

export function TextLink({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-2 font-bold link-underline hover:text-magenta', light ? 'text-white hover:text-magenta-soft' : 'text-ink')}>
      {children}
      {/* ↗ signals leaving the site, so keep it for external links only. */}
      {/^https?:\/\//.test(href)
        ? <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        : <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  )
}

export function Stats({ stats, dark }: { stats: Stat[]; dark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            'border-t-2 py-5 pr-4',
            dark ? 'border-white' : 'border-ink',
            i % 2 === 1 && 'border-l pl-4 lg:pl-6',
            i >= 2 && 'lg:border-l lg:pl-6',
            dark ? 'border-l-[#2e2e2e]' : 'border-l-border',
          )}
        >
          <div className="flex flex-col-reverse">
            <dt className="mt-2 text-[15px]">{stat.label}</dt>
            <dd className={cn('text-[clamp(2rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em]', dark ? 'text-white' : 'text-ink')}>
              {stat.value}+
            </dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

export function CtaBand({ title, body, href = '/contact', label = 'Start a conversation' }: { title: string; body: string; href?: string; label?: string }) {
  return (
    <section className="bg-magenta-dark text-white">
      <div className="wrap grid items-center gap-x-16 gap-y-6 py-[clamp(56px,7vw,96px)] md:grid-cols-[7fr_5fr]">
        <h2 className="type-title text-white">{title}</h2>
        <div>
          <p className="text-lg">{body}</p>
          <Button asChild variant="light" size="xl" className="mt-6">
            <Link href={href}>
              {label} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Tags({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className={cn('rounded-full border px-3 py-1 text-[13px] font-semibold', dark ? 'border-[#3c3944] text-white' : 'border-border bg-white text-ink')}>
          {t}
        </li>
      ))}
    </ul>
  )
}
