'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import type { Office } from '@/content/types'
import { cityIllustrations } from './city-illustrations'

function useNow() {
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
  return now
}

function localTime(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false, timeZone }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  const weekday = !['Sat', 'Sun'].includes(get('weekday'))
  const label = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(now)
  // Core hours from BOOM!'s job advert: 8.45am to 5.30pm.
  return { label, daytime: minutes >= 7 * 60 && minutes < 19 * 60, open: weekday && minutes >= 8 * 60 + 45 && minutes < 17 * 60 + 30 }
}

export function OfficeStrip({ offices, tone = 'dark' }: { offices: Office[]; tone?: 'dark' | 'light' }) {
  const now = useNow()
  const dark = tone === 'dark'

  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {offices.map((o) => {
        const Illustration = cityIllustrations[o.city.toLowerCase()]
        const time = now && o.timeZone ? localTime(now, o.timeZone) : null
        return (
          <li
            key={o.city}
            className={
              dark
                ? 'group overflow-hidden rounded-2xl border border-[#2e2e2e] bg-night-2 transition hover:-translate-y-1 hover:border-magenta'
                : 'group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:border-magenta'
            }
          >
            <div className={dark ? 'relative bg-[#16141b] px-6 pt-6 text-white' : 'relative bg-warm px-6 pt-6 text-ink'}>
              {Illustration ? <Illustration className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" /> : <div className="h-28" />}
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={dark ? 'text-2xl text-white' : 'text-2xl'}>{o.city}</h3>
                <span className={dark ? 'text-sm text-[#a9a5b0]' : 'text-sm text-[#5e5e5e]'}>{o.detail}</span>
              </div>
              {o.address ? <p className="mt-1 text-[15px] whitespace-pre-line">{o.address}</p> : null}
              <p className={dark ? 'mt-3 flex min-h-6 items-center gap-2 text-sm text-magenta-soft' : 'mt-3 flex min-h-6 items-center gap-2 text-sm text-magenta'}>
                {time ? (
                  <>
                    {time.daytime ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
                    {time.label} local time
                    <span className={dark ? 'text-[#a9a5b0]' : 'text-[#5e5e5e]'}>· {time.open ? 'office hours' : 'out of hours'}</span>
                  </>
                ) : null}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
