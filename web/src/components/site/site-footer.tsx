import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SiteSettings } from '@/content/types'
import { footerNav } from './nav'
import { CookieSettingsButton } from './cookie-consent'

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-night text-[15px] text-[#b9b5bf]">
      <div className="wrap grid gap-10 pt-14 pb-12 md:grid-cols-[4fr_8fr]">
        <div>
          <Link href="/" className="inline-block" aria-label="BOOM! Healthcare Communications home">
            <Image src="/images/boom-logo-reversed.png" alt="BOOM! Healthcare Communications" width={640} height={338} className="h-auto w-[140px]" />
          </Link>
          <p className="mt-5 max-w-xs">
            Independent healthcare communications for pharma, biotech and medtech.
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{settings.offices.map((office) => office.city).join(' · ')}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild variant="magenta" size="xl">
              <Link href="/contact">
                Start a conversation <ArrowRight aria-hidden />
              </Link>
            </Button>
            <a href={settings.linkedinUrl} className="font-semibold text-white link-underline">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[0.14em] text-white">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white hover:underline hover:decoration-magenta">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="grid gap-x-10 gap-y-6 border-t border-white/10 py-8 text-[13px] leading-relaxed md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <address className="not-italic">
            <p className="font-semibold text-white">{settings.name} Limited</p>
            <p>Registered in England and Wales, no. {settings.companyNumber}</p>
            <p>VAT no. {settings.vatNumber}</p>
            <p>{settings.registeredOffice}</p>
          </address>
          <address className="not-italic">
            <p className="font-semibold text-white">{settings.danishEntity.name}</p>
            <p>CVR {settings.danishEntity.cvr}</p>
            <p>Copenhagen, Denmark</p>
          </address>
          <nav aria-label="Legal" className="lg:text-right">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:items-end">
              {settings.legal.map((item) => (
                <li key={item.href}><a href={item.href} className="whitespace-nowrap hover:text-white hover:underline hover:decoration-magenta">{item.label}</a></li>
              ))}
              <li><CookieSettingsButton className="whitespace-nowrap hover:text-white hover:underline hover:decoration-magenta" /></li>
            </ul>
          </nav>
        </div>
        <p className="border-t border-white/10 py-5 text-[12px] text-white/50">© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
