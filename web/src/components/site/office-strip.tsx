'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import type { Office } from '@/content/types'

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

export function OfficeStrip({ offices }: { offices: Office[] }) {
  const now = useNow()
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {offices.map((o) => (
        <li key={o.city} className="border-t-2 border-white pt-5">
          <h3 className="text-3xl text-white">{o.city}</h3>
          <p className="mt-1">{o.address ?? o.detail}</p>
          <p className="mt-3 inline-flex min-h-6 items-center gap-1.5 text-sm text-magenta-soft">
            {now && o.timeZone ? (
              <>
                <Clock className="size-3.5" aria-hidden />
                {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: o.timeZone }).format(now)} local time
              </>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  )
}
