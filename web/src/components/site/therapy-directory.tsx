'use client'

import { useMemo, useState } from 'react'
import { SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TherapyArea } from '@/content/types'

const INITIAL = 6

function normalise(text: string) {
  return text.toLocaleLowerCase('en-GB').replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

export function TherapyDirectory({ areas }: { areas: TherapyArea[] }) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const matches = useMemo(() => {
    const terms = normalise(query).split(' ').filter(Boolean)
    if (!terms.length) return areas
    return areas.filter((area) => {
      const content = normalise(`${area.name} ${area.conditions} ${area.keywords.join(' ')}`)
      return terms.every((term) => content.includes(term))
    })
  }, [areas, query])

  const searching = normalise(query).length > 0
  const visible = searching || showAll ? matches : matches.slice(0, INITIAL)

  return (
    <div>
      <div className="mt-7 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-[520px]">
          <label htmlFor="therapy-search" className="sr-only">Search therapy areas</label>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#5e5e5e]" aria-hidden />
          <Input
            id="therapy-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a condition, treatment or abbreviation"
            className="h-12 rounded-full bg-white pr-12 pl-11 text-base"
          />
          {query && <Button type="button" variant="ghost" size="icon" aria-label="Clear therapy search" onClick={() => {
            setQuery('')
            document.getElementById('therapy-search')?.focus()
          }} className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"><X aria-hidden /></Button>}
        </div>
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
          Try a condition, an abbreviation or a broader term. <Link href="/contact?topic=credentials#form" className="font-bold link-underline">Ask for relevant credentials</Link>.
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
