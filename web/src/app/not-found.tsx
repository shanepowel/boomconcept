import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-[#d6d2db]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[url('/images/boom-splash.webp')] bg-cover bg-center opacity-40" />
      <div className="wrap flex min-h-[70vh] flex-col justify-center py-24">
        <p className="text-[clamp(5rem,16vw,12rem)] leading-none font-semibold tracking-[-0.06em] text-white">
        4<span className="text-magenta">0</span>4
        </p>
        <h1 className="mt-4 type-title text-white">This page went BOOM!</h1>
        <p className="mt-4 max-w-[520px] text-lg">It may have moved when we rebuilt the site. Try one of these instead, or get in touch and we&apos;ll point you in the right direction.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="magenta" size="xl">
            <Link href="/">
              Back to the home page <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="light" size="xl">
            <Link href="/services">Our services</Link>
          </Button>
          <Button asChild variant="light" size="xl">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
