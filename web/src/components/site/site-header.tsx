'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { mainNav } from './nav'

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="wrap flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="BOOM! Healthcare Communications home">
          <Image src="/images/boom-logo.png" alt="BOOM! Healthcare Communications" width={640} height={338} priority className="h-auto w-[116px] sm:w-[128px]" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-[clamp(18px,2.2vw,32px)] text-[15px] font-semibold lg:flex">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative whitespace-nowrap py-2 text-ink transition-colors hover:text-magenta',
                  active && 'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-magenta',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Button asChild variant="brand" size="lg" className="h-11 px-5 text-[15px] font-bold">
            <Link href="/contact" aria-current={isActive(pathname, '/contact') ? 'page' : undefined}>
              Contact
            </Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon-lg" className="rounded-full lg:hidden" aria-label="Open navigation">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,380px)]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="flex flex-col px-6 pb-8 text-lg font-semibold">
              {[...mainNav, { href: '/how-we-work', label: 'How we work' }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={cn('border-b border-border py-4 text-ink', isActive(pathname, item.href) && 'text-magenta')}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="brand" size="xl" className="mt-6">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact us
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
