import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="bg-warm">
      <div className="wrap flex min-h-[55vh] flex-col justify-center py-16">
        <p aria-hidden className="editorial-display text-magenta-dark">404</p>
        <h1 className="mt-4 type-title">This page went BOOM!</h1>
        <p className="mt-4 max-w-[50ch] text-lg">The page may have moved. You can head home or explore our work.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="magenta" size="xl">
            <Link href="/">
              Back to the home page <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outlineBrand" size="xl">
            <Link href="/work">See our work</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
