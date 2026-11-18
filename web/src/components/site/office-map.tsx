'use client'

import { useEffect, useMemo, useState } from 'react'
import { createMap } from 'svg-dotted-map'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import type { Office } from '@/content/types'
import { cn } from '@/lib/utils'
import { DottedMap } from '@/components/ui/dotted-map'

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

const REGION = { lat: { min: 48.2, max: 59.8 }, lng: { min: -11.5, max: 18.5 } }
const W = 100
const H = 66
const SAMPLES = 4000

export function OfficeMap({ offices }: { offices: Office[] }) {
  const pinned = useMemo(() => offices.filter((o) => typeof o.lat === 'number' && typeof o.lng === 'number'), [offices])
  const [active, setActive] = useState(0)
  const current = pinned[active]

  // Same projection the map uses, so HTML pins and the tooltip line up with the SVG markers.
  const positions = useMemo(() => {
    const { addMarkers } = createMap({ width: W, height: H, mapSamples: SAMPLES, region: REGION })
    return addMarkers(pinned.map((o) => ({ lat: o.lat!, lng: o.lng! })))
  }, [pinned])

  const markers = pinned.map((o, i) => ({ lat: o.lat!, lng: o.lng!, size: i === active ? 1.1 : 0.8, pulse: i === active }))
  const pos = (i: number) => ({ left: `${(positions[i].x / W) * 100}%`, top: `${(positions[i].y / H) * 100}%` })

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-warm p-[clamp(8px,2vw,24px)]">
        <div className="relative">
          <DottedMap
            width={W}
            height={H}
            mapSamples={SAMPLES}
            region={REGION}
            stagger={false}
            dotRadius={0.28}
            dotColor="#bdb4ab"
            markerColor="#d90070"
            markers={markers}
            style={{ height: "auto" }}
            role="img"
            aria-label="Map of north-west Europe showing BOOM! offices in London, Bournemouth and Copenhagen"
          />

          {pinned.map((office, i) => (
            <button
              key={office.city}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`${office.city}, ${office.detail ?? ''}`}
              className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:ring-3 focus-visible:ring-magenta/50 focus-visible:outline-none"
              style={pos(i)}
            />
          ))}

          {current ? (
            <div
              key={current.city}
              className="pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 -translate-y-[calc(100%+16px)] animate-in fade-in-0 zoom-in-95 rounded-xl bg-night px-4 py-3 text-[13px] leading-snug text-[#d6d2db] shadow-xl max-sm:hidden"
              style={pos(active)}
            >
              <strong className="block text-[15px] text-white">{current.city}</strong>
              {current.address ? <span className="block whitespace-pre-line">{current.address}</span> : <span className="block">{current.detail}</span>}
              <LocalTime timeZone={current.timeZone} className="mt-1 text-magenta-soft" />
              <span aria-hidden className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-night" />
            </div>
          ) : null}
        </div>
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
