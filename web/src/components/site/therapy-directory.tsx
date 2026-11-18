'use client'

import { useMemo, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TherapyArea } from '@/content/types'

const INITIAL = 6

export function TherapyDirectory({ areas }: { areas: TherapyArea[] }) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('en-GB')
    if (!q) return areas
    return areas.filter((a) => `${a.name} ${a.conditions} ${a.keywords.join(' ')}`.toLocaleLowerCase('en-GB').includes(q))
  }, [areas, query])

  const searching = query.trim().length > 0
  const visible = searching || showAll ? matches : matches.slice(0, INITIAL)

  return (
    <div>
      <div className="mt-7 mb-6 flex flex-wrap items-center justify-between gap-4">
        <label className="relative w-full max-w-[420px]">
          <span className="sr-only">Search therapy areas</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#5e5e5e]" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a condition, treatment or abbreviation"
            className="h-12 rounded-full bg-white pl-11 text-base"
          />
        </label>
        <p className="text-[15px] text-[#5e5e5e]" aria-live="polite">
          {searching ? `${matches.length} ${matches.length === 1 ? 'specialism' : 'specialisms'} found` : `${areas.length} specialisms covering 70+ therapy areas`}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="grid gap-x-10 md:grid-cols-2">
          {visible.map((a) => (
            <li key={a.name} className="border-t border-border py-4">
              <h3 className="text-lg">{a.name}</h3>
              <p className="mt-1 text-[15px] text-[#5e5e5e]">{a.conditions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg bg-magenta-tint p-5 text-ink">
          Not listed? Ask us. Our experience goes further than this page. <a href="/contact" className="font-bold link-underline">Get in touch</a>
        </p>
      )}

      {!searching && matches.length > INITIAL ? (
        <Button variant="outlineBrand" size="xl" className="mt-6" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
          {showAll ? 'Show fewer' : `Show all ${matches.length} specialisms`}
        </Button>
      ) : null}
    </div>
  )
}
