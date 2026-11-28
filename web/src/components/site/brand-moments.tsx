import { ArrowRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { BrandMoment, CaseStudy } from '@/content/types'
import { Tags, TextLink } from './blocks'

export function BrandMoments({ moments, cases }: { moments: BrandMoment[]; cases: CaseStudy[] }) {
  if (!moments.length) return null

  return (
    <Tabs defaultValue="0" orientation="vertical" className="moment-player">
      <TabsList aria-label="Choose your brand’s stage" className="moment-stages">
        {moments.map((moment, index) => (
          <TabsTrigger className="moment-trigger" key={moment.stage} value={String(index)}>
            {moment.stage}<ArrowRight aria-hidden />
          </TabsTrigger>
        ))}
      </TabsList>
      {moments.map((moment, index) => {
        const study = cases.find(({ slug }) => slug === moment.caseSlug)
        return <TabsContent key={moment.stage} value={String(index)} className="moment-panel lineup-panel">
          <div className="relative z-10">
            <h3 className="type-title max-w-[18ch] text-white">{moment.title}</h3>
            <p className="mt-5 max-w-[56ch] text-base text-white/85">{moment.body}</p>
            <Tags items={moment.tags} dark />
            <div className="mt-7 grid gap-3">
              {study && <TextLink href={`/work/${encodeURIComponent(study.slug)}`} light>{study.isExample ? 'Demo project' : 'Related work'} · {study.title}</TextLink>}
              <TextLink href={`/contact?stage=${encodeURIComponent(moment.stage)}#form`} light>Talk through your brief</TextLink>
            </div>
          </div>
        </TabsContent>
      })}
    </Tabs>
  )
}
