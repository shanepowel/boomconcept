import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Eyebrow, PageHero, SectionHead, TextLink } from '@/components/site/blocks'
import { WorkplaceBadges } from '@/components/site/badges'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { getCareersRoles, getPage, getPerks, getSettings, workplace } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('careers', { stega: false })
  return { title: page.seoTitle || 'Careers', description: page.seoDescription }
}

const workingLife = [
  { title: 'Work across disciplines', body: 'A brief might bring a researcher, a medical writer and a creative together. You get to see how other people think and where your part changes the result.' },
  { title: 'Make time together count', body: 'We work remotely and face to face. Teams use the office, working sessions and client meetings for the conversations that are better in the room.' },
  { title: 'Be good company', body: 'Ask the question everyone is thinking, share what you know and give people credit for good work. That’s what being a Wilbury looks like on an ordinary day.' },
]

const questions = [
  { title: 'Where are you based?', body: 'Our teams work across London, Bournemouth and Copenhagen. A vacancy will explain where the role is based and how often you’ll need to be there.' },
  { title: 'What should I include in an introduction?', body: 'Tell us what you do, what kind of work you want to do next and why BOOM! caught your eye. A link to work you can share is welcome.' },
  { title: 'Can I ask about working arrangements or interview adjustments?', body: 'Yes. Raise it with the careers contact so you can discuss what the role needs and what would help you take part.' },
]

export default async function CareersPage() {
  const [page, perks, settings, roles] = await Promise.all([getPage('careers'), getPerks(), getSettings({ stega: false }), getCareersRoles()])
  const introduction = '/contact?topic=careers#form'

  return (
    <>
      <PageHero copy={page}>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild variant="magenta" size="xl"><a href="#join">Explore open roles <ArrowDown aria-hidden /></a></Button>
          <TextLink href="#life">Life at BOOM!</TextLink>
        </div>
      </PageHero>

      <section id="join" className="bg-night text-white">
        <div className="wrap grid gap-x-12 gap-y-6 py-[clamp(38px,6vw,76px)] lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow tone="light">Careers at BOOM!</Eyebrow>
            <h2 className="type-title text-white">Find your next role.</h2>
          </div>
          <div className="border-t border-white/25 pt-5">
            {roles.length > 0 ? (
              <ul className="divide-y divide-white/20">
                {roles.map((role) => (
                  <li key={role.id} className="pb-5 not-first:pt-5">
                    <h3 className="text-xl text-white">{role.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-magenta-soft">{[role.location, role.workingPattern].filter(Boolean).join(' · ')}</p>
                    <p className="mt-3 text-white/80">{role.summary}</p>
                    <a href={role.applicationUrl} className="mt-3 inline-flex items-center gap-2 font-bold text-white link-underline">View role and apply <span className="sr-only">for {role.title}</span><ArrowUpRight className="size-4" aria-hidden /></a>
                  </li>
                ))}
              </ul>
            ) : <p className="max-w-[50ch] text-white/85">There are no vacancies listed on this page. If you’re interested in working here, tell us what you do and what you’d like to do next.</p>}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild variant="light" size="xl"><Link href={introduction}>Introduce yourself <ArrowUpRight aria-hidden /></Link></Button>
              <a href={settings.linkedinUrl} className="text-sm font-bold text-white link-underline">Follow BOOM! for vacancies</a>
            </div>
          </div>
        </div>
      </section>

      <section id="life" className="wrap section-pad">
        <SectionHead title="Good at your job. Generous with what you know." intro="That’s our version of a Wilbury. Here’s what it means when we work together." />
        <ul className="grid gap-x-8 gap-y-5 md:grid-cols-3">
          {workingLife.map(({ title, body }) => (
            <li key={title} className="border-t border-ink pt-4">
              <h3 className="text-xl">{title}</h3>
              <p className="mt-2">{body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-7"><TextLink href="/about#band">Meet the people you could work with</TextLink></div>
      </section>

      <section className="bg-warm">
        <div className="wrap section-pad">
          <SectionHead title="Away from the brief." intro="A company birthday in Lisbon, a summer social in London and a day off for Star Wars Day. Here’s a look at life together outside the work." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[workplace.photos[1], workplace.photos[3], workplace.photos[4]].map((photo) => (
              <li key={photo.src}>
                <figure>
                  <Image src={photo.src} alt="" width={1000} height={750} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="mt-2 text-sm">{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 border-t border-ink pt-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl">{workplace.headline.boom} said BOOM! is a great place to work.</h3>
              <p className="mt-2">From the Great Place To Work® employee survey.</p>
              <a href={workplace.source} className="mt-3 inline-block text-sm font-bold text-ink link-underline">See the survey and rankings</a>
            </div>
            <WorkplaceBadges size="sm" />
          </div>
        </div>
      </section>

      <section className="wrap section-pad grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div><Eyebrow>Benefits</Eyebrow><h2 className="type-title">The good stuff.</h2></div>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {perks.map((perk) => (
            <li key={perk.title} className="border-t border-border py-4">
              <h3 className="text-lg">{perk.title}</h3>
              <p className="mt-1 text-[15px]">{perk.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-warm">
        <div className="wrap section-pad grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <h2 className="type-title">Before you apply.</h2>
            <div className="mt-5"><TextLink href={introduction}>Ask us a question</TextLink></div>
          </div>
          <Accordion type="single" collapsible className="border-t border-ink">
            {questions.map(({ title, body }) => (
              <AccordionItem value={title} key={title}>
                <AccordionTrigger className="py-4 text-base font-semibold">{title}</AccordionTrigger>
                <AccordionContent className="pb-4 text-base">{body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
