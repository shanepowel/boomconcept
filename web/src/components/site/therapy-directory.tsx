'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TherapyArea } from '@/content/types'

/**
 * The therapy-area burst: every specialism is a ray out of the BOOM! spark, as long as the
 * number of conditions we've worked in, with a dot for each condition. Searching lights up the
 * matching rays and dots; hovering, focusing or tapping a ray opens its detail.
 */

const COLOURS = ['#ff5fae', '#b36bff', '#5fd0f5', '#ff8a3d', '#e5007d', '#7f8bff']

function normalise(text: string) {
  return text.toLocaleLowerCase('en-GB').replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

/** Splits "Crohn's & UC (ulcerative colitis), HLH" into conditions, ignoring commas inside brackets. */
function splitConditions(text: string) {
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (const char of text) {
    if (char === '(') depth++
    if (char === ')') depth--
    if (char === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else current += char
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

type Ray = TherapyArea & { conditionList: string[]; angle: number; length: number; colour: string }

const INNER = 80
const STEP = 34
const MAX = 490
// Every label sits on one outer ring so neighbouring short rays never collide.
const LABEL_RING = 520

export function TherapyDirectory({ areas }: { areas: TherapyArea[] }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string | null>(null)
  const [live, setLive] = useState(false)
  const figure = useRef<HTMLDivElement>(null)

  const rays: Ray[] = useMemo(() => areas.map((area, i) => {
    const conditionList = splitConditions(area.conditions)
    return {
      ...area,
      conditionList,
      angle: (i / areas.length) * Math.PI * 2 - Math.PI / 2,
      length: Math.min(MAX, INNER + 60 + conditionList.length * STEP),
      colour: COLOURS[i % COLOURS.length],
    }
  }), [areas])

  const terms = normalise(query).split(' ').filter(Boolean)
  const searching = terms.length > 0
  const matches = (text: string) => terms.every((term) => normalise(text).includes(term))
  const matchingRays = rays.filter((ray) => !searching || matches(`${ray.name} ${ray.conditions} ${ray.keywords.join(' ')}`))
  const matchingNames = new Set(matchingRays.map((ray) => ray.name))
  const conditionCount = rays.reduce((sum, ray) => sum + ray.conditionList.length, 0)

  // The detail panel follows the ray in focus, else the first search match, else the biggest specialism.
  const biggest = rays.reduce((a, b) => (b.conditionList.length > a.conditionList.length ? b : a), rays[0])
  const selected = rays.find((ray) => ray.name === active && matchingNames.has(ray.name)) ?? (searching ? matchingRays[0] : undefined) ?? rays.find((ray) => ray.name === active) ?? biggest

  useEffect(() => {
    const node = figure.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLive(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="therapy-burst">
      <div className="mt-7 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-[520px]">
          <label htmlFor="therapy-search" className="sr-only">Search therapy areas</label>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/60" aria-hidden />
          <Input
            id="therapy-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a condition, treatment or abbreviation"
            className="h-12 rounded-full border-white/20 bg-white/5 pr-12 pl-11 text-base text-white placeholder:text-white/50 focus-visible:border-magenta-soft"
          />
          {query && <Button type="button" variant="ghost" size="icon" aria-label="Clear therapy search" onClick={() => {
            setQuery('')
            document.getElementById('therapy-search')?.focus()
          }} className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full text-white hover:bg-white/10 hover:text-white"><X aria-hidden /></Button>}
        </div>
        <p className="text-[15px] text-white/70" aria-live="polite">
          {searching
            ? `${matchingRays.length} ${matchingRays.length === 1 ? 'specialism' : 'specialisms'} found`
            : `${rays.length} specialisms · ${conditionCount} conditions and counting`}
        </p>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <div ref={figure} className={`therapy-burst__figure ${live ? 'is-live' : ''} ${searching ? 'is-searching' : ''}`}>
          <svg viewBox="-770 -585 1540 1170" role="group" aria-label="Therapy areas as a burst. Each ray is a specialism; its length shows how many conditions we have worked in.">
            <defs>
              <radialGradient id="tb-core">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="35%" stopColor="#ff5fae" />
                <stop offset="100%" stopColor="#7a2fb5" stopOpacity="0" />
              </radialGradient>
              <filter id="tb-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle r="150" fill="url(#tb-core)" opacity="0.55" className="therapy-burst__core" />
            {rays.map((ray, i) => {
              const cos = Math.cos(ray.angle)
              const sin = Math.sin(ray.angle)
              const on = matchingNames.has(ray.name)
              const isSelected = selected?.name === ray.name
              // Labels straight above and below the spark sit a little further out to clear their neighbours.
              const labelR = Math.abs(cos) < 0.15 ? LABEL_RING + 34 : LABEL_RING
              const anchor = Math.abs(cos) < 0.36 ? 'middle' : cos > 0 ? 'start' : 'end'
              const labelY = sin * labelR + (sin > 0.5 ? 24 : sin < -0.5 ? -4 : 8)
              return (
                <g
                  key={ray.name}
                  role="button"
                  tabIndex={on ? 0 : -1}
                  aria-pressed={isSelected}
                  aria-label={`${ray.name}: ${ray.conditionList.length} conditions`}
                  className={`therapy-burst__ray ${on ? '' : 'is-dim'} ${isSelected ? 'is-selected' : ''}`}
                  style={{ '--ray-colour': ray.colour, '--ray-delay': `${i * 45}ms` } as React.CSSProperties}
                  onMouseEnter={() => setActive(ray.name)}
                  onFocus={() => setActive(ray.name)}
                  onClick={() => setActive(ray.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActive(ray.name)
                    }
                  }}
                >
                  {/* Generous invisible hit area so thin rays are easy to hover and tap. */}
                  <line x1={cos * INNER} y1={sin * INNER} x2={cos * labelR} y2={sin * labelR} className="therapy-burst__hit" />
                  <line x1={cos * INNER} y1={sin * INNER} x2={cos * ray.length} y2={sin * ray.length} className="therapy-burst__line" pathLength={1} filter={isSelected ? 'url(#tb-glow)' : undefined} />
                  {ray.conditionList.map((condition, j) => {
                    const r = INNER + 60 + j * STEP
                    const hit = searching && matches(condition)
                    return <circle key={condition} cx={cos * r} cy={sin * r} r={hit ? 11 : isSelected ? 7 : 5.5} className={`therapy-burst__dot ${hit ? 'is-hit' : ''}`} style={{ '--dot-delay': `${i * 45 + 250 + j * 40}ms` } as React.CSSProperties} />
                  })}
                  <line x1={cos * (ray.length + 14)} y1={sin * (ray.length + 14)} x2={cos * (labelR - 14)} y2={sin * (labelR - 14)} className="therapy-burst__leader" />
                  <text x={cos * labelR} y={labelY} textAnchor={anchor} className="therapy-burst__label">{ray.name}</text>
                </g>
              )
            })}
            <text y="12" textAnchor="middle" className="therapy-burst__centre">BOOM!</text>
          </svg>
        </div>

        <div className="therapy-burst__panel" aria-live="polite">
          {selected && matchingRays.length > 0 ? (
            <>
              <span aria-hidden className="therapy-burst__swatch" style={{ background: selected.colour }} />
              <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-white">{selected.name}</h3>
              <p className="mt-1 text-sm font-semibold text-magenta-soft">{selected.conditionList.length} {selected.conditionList.length === 1 ? 'condition' : 'conditions'}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {selected.conditionList.map((condition) => (
                  <li key={condition} className={`rounded-full border px-3 py-1.5 text-[14px] ${searching && matches(condition) ? 'border-transparent bg-white text-ink' : 'border-white/20 text-white/85'}`}>{condition}</li>
                ))}
              </ul>
              <Link href="/contact?topic=credentials#form" className="mt-6 inline-flex items-center gap-2 font-bold text-white link-underline">
                Request {selected.name.toLocaleLowerCase('en-GB')} credentials <ArrowRight className="size-4" aria-hidden />
              </Link>
            </>
          ) : (
            <p className="text-white/85">
              Nothing matches that yet. Try a condition, an abbreviation or a broader term, or <Link href="/contact?topic=credentials#form" className="font-bold text-white link-underline">ask for relevant credentials</Link>.
            </p>
          )}
          <p className="mt-8 hidden text-sm text-white/55 lg:block">Hover or tab through the rays. Each dot is a condition.</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="sr-only">All specialisms</h3>
        <ul className="flex flex-wrap gap-2">
          {rays.map((ray) => {
            const on = matchingNames.has(ray.name)
            return (
              <li key={ray.name}>
                <button
                  type="button"
                  disabled={!on}
                  aria-pressed={selected?.name === ray.name}
                  onClick={() => setActive(ray.name)}
                  className={`therapy-chip ${selected?.name === ray.name ? 'is-selected' : ''}`}
                  style={{ '--ray-colour': ray.colour } as React.CSSProperties}
                >
                  <span aria-hidden className="therapy-chip__dot" />
                  {ray.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
