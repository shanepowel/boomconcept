'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import type { Office } from '@/content/types'
import { cn } from '@/lib/utils'
import { LAND_DOTS, MAP, project } from './europe-dots'

export function mapsUrl(office: Office) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address ? `${office.address}, ${office.city}` : `${office.city}, ${office.detail ?? ''}`)}`
}

/** Local time for an office, rendered after mount so server and browser output match. */
export function useLocalTime(timeZone?: string) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    const first = window.setTimeout(tick, 0)
    const id = window.setInterval(tick, 30_000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(id)
    }
  }, [])
  if (!now || !timeZone) return null
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(now)
}

function LocalTime({ timeZone, className }: { timeZone?: string; className?: string }) {
  const time = useLocalTime(timeZone)
  if (!time) return null
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <Clock className="size-3.5" aria-hidden />
      {time} local time
    </span>
  )
}

export function OfficeMap({ offices }: { offices: Office[] }) {
  const pinned = offices.filter((o) => typeof o.lat === 'number' && typeof o.lng === 'number')
  const [active, setActive] = useState(0)
  const current = pinned[active]

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-warm">
        <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="block h-auto w-full" role="img" aria-label="Map of north-west Europe showing BOOM! offices in London, Bournemouth and Copenhagen">
          <defs>
            <radialGradient id="map-fade" cx="45%" cy="55%" r="65%">
              <stop offset="72%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="map-mask">
              <rect width="100%" height="100%" fill="url(#map-fade)" />
            </mask>
          </defs>
          <path d={LAND_DOTS} stroke="#b9b0a7" strokeWidth={6.4} strokeLinecap="round" fill="none" mask="url(#map-mask)" />
        </svg>

        {pinned.map((office, i) => {
          const { x, y } = project(office.lat!, office.lng!)
          const isActive = i === active
          return (
            <button
              key={office.city}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={`${office.city}, ${office.detail ?? ''}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 focus-visible:outline-none"
              style={{ left: `${(x / MAP.width) * 100}%`, top: `${(y / MAP.height) * 100}%` }}
            >
              <span className={cn('absolute inset-1 rounded-full bg-magenta/40 motion-safe:animate-ping', !isActive && 'opacity-0 group-hover:opacity-100')} />
              <span
                className={cn(
                  'relative block size-4 rounded-full border-[3px] border-white bg-magenta shadow-[0_2px_10px_rgba(217,0,112,0.45)] transition-transform group-focus-visible:ring-3 group-focus-visible:ring-magenta/50',
                  isActive ? 'scale-125' : 'bg-ink',
                )}
              />
            </button>
          )
        })}

        {current ? (
          <div
            key={current.city}
            className="pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 -translate-y-[calc(100%+18px)] animate-in fade-in-0 zoom-in-95 rounded-xl bg-night px-4 py-3 text-[13px] leading-snug text-[#d6d2db] shadow-xl max-sm:hidden"
            style={{
              left: `${(project(current.lat!, current.lng!).x / MAP.width) * 100}%`,
              top: `${(project(current.lat!, current.lng!).y / MAP.height) * 100}%`,
            }}
          >
            <strong className="block text-[15px] text-white">{current.city}</strong>
            {current.address ? <span className="block whitespace-pre-line">{current.address}</span> : <span className="block">{current.detail}</span>}
            <LocalTime timeZone={current.timeZone} className="mt-1 text-magenta-soft" />
            <span aria-hidden className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-night" />
          </div>
        ) : null}
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {pinned.map((office, i) => (
          <li key={office.city}>
            <div
              className={cn(
                'flex h-full flex-col gap-1 rounded-xl border p-4 transition-colors',
                i === active ? 'border-magenta bg-magenta-tint/60' : 'border-border bg-white hover:border-ink',
              )}
            >
              <button type="button" onClick={() => setActive(i)} className="flex items-center gap-2 text-left text-lg font-semibold text-ink">
                <MapPin className={cn('size-4', i === active ? 'text-magenta' : 'text-[#5e5e5e]')} aria-hidden />
                {office.city}
                <span className="sr-only">: show on map</span>
              </button>
              <p className="text-[15px]">{office.address ?? office.detail}</p>
              <LocalTime timeZone={office.timeZone} className="text-sm text-[#5e5e5e]" />
              <a href={mapsUrl(office)} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold text-ink link-underline [text-underline-offset:4px]">
                View on Google Maps <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
