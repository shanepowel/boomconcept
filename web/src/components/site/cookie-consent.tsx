'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'

/**
 * Cookie consent for non-essential (analytics) cookies.
 *
 * The choice is kept in a first-party, strictly necessary cookie so it survives visits.
 * Nothing non-essential runs until the visitor accepts: wrap any future analytics in
 * <WithAnalyticsConsent>, which renders its children only after an "accepted" choice.
 * Accept and Reject are given equal weight, as the ICO expects.
 */

type Choice = 'accepted' | 'rejected'
const COOKIE = 'boom-consent'
const OPEN_EVENT = 'boom:consent-open'
const CHANGE_EVENT = 'boom:consent-change'

function readChoice(): Choice | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)boom-consent=(accepted|rejected)/)
  return (match?.[1] as Choice | undefined) ?? null
}

function saveChoice(choice: Choice) {
  const sixMonths = 60 * 60 * 24 * 182
  document.cookie = `${COOKIE}=${choice}; Max-Age=${sixMonths}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

const noopSubscribe = () => () => {}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CHANGE_EVENT, onChange)
}

/** The visitor's saved choice; null on the server and before a choice is made. */
export function useConsent() {
  return useSyncExternalStore(subscribe, readChoice, () => null)
}

/** Renders analytics (or any non-essential script) only after the visitor accepts. */
export function WithAnalyticsConsent({ children }: { children: React.ReactNode }) {
  return useConsent() === 'accepted' ? <>{children}</> : null
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  )
}

export function CookieBanner() {
  const choice = useConsent()
  // False during server render and hydration, true once running in the browser.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const [reopened, setReopened] = useState(false)

  useEffect(() => {
    const open = () => setReopened(true)
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  if (!mounted || (choice && !reopened)) return null

  const decide = (value: Choice) => {
    saveChoice(value)
    setReopened(false)
  }

  return (
    <section
      role="region"
      aria-label="Cookie choices"
      className="cookie-banner fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-[400px]"
    >
      <span aria-hidden className="cookie-banner__spark" />
      <h2 className="text-lg font-semibold text-white">Cookies? Only if you say so.</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-white/80">
        We’d like to use analytics cookies to see which pages help people most. Nothing like that is set unless you accept. {choice && <>You currently have analytics {choice === 'accepted' ? 'on' : 'off'}.</>}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button type="button" variant="magenta" size="lg" className="h-11" onClick={() => decide('accepted')}>Accept</Button>
        <Button type="button" variant="outlineBrand" size="lg" className="h-11 border-white/50 text-white hover:bg-white hover:text-ink" onClick={() => decide('rejected')}>Reject</Button>
      </div>
      <Link href="/cookies" className="mt-3 inline-block text-sm text-white/80 link-underline hover:text-white">Read the cookie policy</Link>
    </section>
  )
}
