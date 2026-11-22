import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CaseStudy, Lineup, TeamMember } from '@/content/types'
import { Eyebrow, TextLink } from './blocks'

export function BriefLineup({ lineups, team, cases }: { lineups: Lineup[]; team: TeamMember[]; cases: CaseStudy[] }) {
  if (!lineups.length) return null

  return (
    <section id="lineup" aria-labelledby="lineup-title" className="bg-night text-white">
      <div className="wrap section-pad">
        <Eyebrow tone="light">Meet the line-up</Eyebrow>
        <h2 id="lineup-title" className="type-title text-white">Who would we put on your brief?</h2>
        <p className="mt-4 text-white/75">Choose a challenge to see where we’d start and who could help.</p>
        <Tabs defaultValue={lineups[0].id} orientation="vertical" className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <TabsList aria-label="Example briefs" className="grid h-auto w-full justify-stretch self-start rounded-none bg-transparent p-0">
            {lineups.map((lineup) => (
              <TabsTrigger key={lineup.id} value={lineup.id} className="h-auto group/brief gap-3 rounded-none border-0 border-b border-white/20 px-3 py-4 group-data-vertical/tabs:justify-between text-left text-base whitespace-normal text-white/85 hover:text-white data-active:bg-white data-active:text-ink data-active:hover:text-ink">
                {lineup.title}<ArrowRight className="motion-safe:transition-transform group-hover/brief:translate-x-1 group-focus-visible/brief:translate-x-1" aria-hidden />
              </TabsTrigger>
            ))}
          </TabsList>
          {lineups.map((lineup) => {
            const people = lineup.people.map((slug) => team.find((person) => person.slug === slug))
            const study = cases.find((item) => item.slug === lineup.caseSlug)

            return (
              <TabsContent key={lineup.id} value={lineup.id} className="lineup-panel min-w-0 border-t-2 border-magenta-soft pt-5">
                <p className="text-lg text-white sm:text-[1.35rem]">{lineup.approach}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-magenta-soft">
                  {lineup.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}
                </ul>
                <ul className="mt-7 grid gap-x-4 gap-y-5 min-[440px]:grid-cols-3 sm:gap-x-5">
                  {people.map((person) => person && (
                    <li key={person.slug}>
                      <Link href={`/about#person-${person.slug}`} className="group flex w-full items-center gap-4 rounded-sm min-[440px]:block">
                        <div className="relative aspect-square w-14 max-w-32 shrink-0 min-[440px]:w-full overflow-hidden rounded-full bg-night-2 ring-1 ring-white/25 ring-offset-4 ring-offset-night transition-[box-shadow] group-hover:ring-magenta-soft group-focus-visible:ring-magenta-soft">
                          {person.photo.alt && <Image src={person.photo.src} alt="" fill sizes="128px" className="object-cover object-[center_30%] grayscale motion-safe:transition-[filter,scale] motion-safe:group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0" />}
                        </div>
                        <div className="min-w-0 min-[440px]:mt-3">
                          <span className="block text-sm font-bold leading-snug text-white sm:text-base">{person.fullName}</span>
                          <span className="mt-1 block text-xs leading-snug text-white/75 sm:text-sm">{person.role}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                {study && <div className="mt-7"><TextLink href={`/work/${encodeURIComponent(study.slug)}`} light>{study.isExample ? 'See an illustrative case study' : 'See related work'}</TextLink></div>}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
