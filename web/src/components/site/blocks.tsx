import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PageCopy, Stat } from '@/content/types'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, tone = 'magenta', className }: { children: React.ReactNode; tone?: 'magenta' | 'light'; className?: string }) {
  return (
    <p
      className={cn(
        'mb-4 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] before:h-0.5 before:w-5 before:bg-current',
        tone === 'magenta' ? 'text-magenta' : 'text-magenta-soft',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function PageHero({ copy, children }: { copy: PageCopy; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-[#d6d2db]">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-full bg-[url('/images/boom-splash.webp')] bg-cover bg-center opacity-35 md:w-[55%] md:opacity-90 md:[mask-image:linear-gradient(90deg,transparent,#000_45%)]"
      />
      <div className="wrap py-[clamp(64px,9vw,128px)]">
        {copy.eyebrow ? <Eyebrow tone="light">{copy.eyebrow}</Eyebrow> : null}
        <h1 className="max-w-[820px] type-display text-white">{copy.title}</h1>
        {copy.lede ? <p className="mt-6 max-w-[640px] text-[clamp(1.08rem,1.4vw,1.25rem)] leading-relaxed text-[#d6d2db]">{copy.lede}</p> : null}
        {children}
      </div>
    </section>
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

export function TextLink({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-2 font-bold link-underline hover:text-magenta', light ? 'text-white' : 'text-ink')}>
      {children}
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
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
            'border-t-2 py-7 pr-4',
            dark ? 'border-white' : 'border-ink',
            i % 2 === 1 && 'border-l pl-4 lg:pl-6',
            i >= 2 && 'lg:border-l lg:pl-6',
            dark ? 'border-l-[#2e2e2e]' : 'border-l-border',
          )}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className={cn('block text-[clamp(2.4rem,4.6vw,4rem)] leading-none font-semibold tracking-[-0.05em]', dark ? 'text-white' : 'text-ink')}>
              {stat.value}
              <span className="text-magenta">+</span>
            </span>
            <span className="mt-2.5 block text-[15px]">{stat.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function CtaBand({ title, body, href = '/contact', label = 'Start a conversation' }: { title: string; body: string; href?: string; label?: string }) {
  return (
    <section className="bg-magenta text-white">
      <div className="wrap grid items-center gap-x-16 gap-y-6 py-[clamp(56px,7vw,96px)] md:grid-cols-[7fr_5fr]">
        <h2 className="type-title text-white">{title}</h2>
        <div>
          <p className="text-lg">{body}</p>
          <Button asChild variant="light" size="xl" className="mt-6">
            <Link href={href}>
              {label} <ArrowUpRight aria-hidden />
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
