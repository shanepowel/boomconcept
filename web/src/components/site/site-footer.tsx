import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SiteSettings } from '@/content/types'
import { footerNav } from './nav'

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-night text-[15px] text-[#b9b5bf]">
      <div className="wrap grid gap-10 pt-14 pb-12 md:grid-cols-[4fr_8fr]">
        <div>
          <Link href="/" className="inline-block bg-white px-4 py-2" aria-label="BOOM! Healthcare Communications home">
            <Image src="/images/boom-logo.png" alt="BOOM! Healthcare Communications" width={640} height={338} className="h-auto w-[124px]" />
          </Link>
          <p className="mt-5 max-w-xs">
            Independent healthcare communications for pharma, biotech and medtech.
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{settings.offices.map((office) => office.city).join(' · ')}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild variant="magenta" size="xl">
              <Link href="/contact">
                Start a conversation <ArrowUpRight aria-hidden />
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
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-[#2e2e2e] py-6 text-[13px]">
        <div className="space-y-1">
          <p>
            {settings.name} Limited · Registered in England and Wales no. {settings.companyNumber} · VAT no. {settings.vatNumber} · Registered office: {settings.registeredOffice}
          </p>
          <p>
            {settings.danishEntity.name} · CVR {settings.danishEntity.cvr} · Copenhagen
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          {settings.legal.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
