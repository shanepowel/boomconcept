'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type SectionLink = { id: string; label: string; number?: string }

export function SubNav({ items, label = 'On this page' }: { items: SectionLink[]; label?: string }) {
  const [current, setCurrent] = useState('')
  const nav = useRef<HTMLElement>(null)
  const disclosure = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const threshold = 80 + (window.matchMedia('(min-width: 64rem)').matches ? nav.current?.offsetHeight ?? 0 : 0) + 24
      const sections = items.map(({ id }) => document.getElementById(id)).filter((node) => node !== null)
      setCurrent(sections.filter((node) => node.getBoundingClientRect().top <= threshold).at(-1)?.id ?? '')
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    schedule()
    window.addEventListener('hashchange', schedule)
    window.addEventListener('pageshow', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', schedule)
      window.removeEventListener('pageshow', schedule)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [items])

  const links = items.map(({ id, label: name, number }) => (
    <li key={id}>
      <a href={`#${id}`} aria-current={current === id ? 'location' : undefined}
        onClick={() => {
          if (disclosure.current?.open) {
            disclosure.current.open = false
            const target = document.getElementById(id)
            target?.setAttribute('tabindex', '-1')
            target?.focus({ preventScroll: true })
          }
        }}
        className="block border-b-2 border-transparent py-2 hover:text-magenta-dark aria-current:border-magenta aria-current:text-magenta-dark">
        {number && <span className="mr-1.5">{number}</span>}{name}
      </a>
    </li>
  ))

  return (
    <nav ref={nav} aria-label={label} className="border-b border-border bg-white lg:sticky lg:top-[76px] lg:z-30 lg:bg-white/95 lg:backdrop-blur">
      <details ref={disclosure} className="group wrap lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[15px] font-bold text-ink [&::-webkit-details-marker]:hidden">
          {label}<ChevronDown aria-hidden className="size-4 group-open:rotate-180" />
        </summary>
        <ul className="grid gap-x-6 pb-3 text-[15px] font-semibold text-ink sm:grid-cols-2">{links}</ul>
      </details>
      <ul className="wrap hidden flex-wrap gap-x-7 py-1.5 text-[15px] font-semibold text-ink lg:flex">{links}</ul>
    </nav>
  )
}
