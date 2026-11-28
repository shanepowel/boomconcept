import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/site/blocks'
import { BurstFingerprint, InsightArt } from '@/components/site/insight-art'
import { insightTopics, readingMinutes } from '@/content/insights'
import { getInsights, getPage } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPage('insights', { stega: false })
  return { title: copy.seoTitle || 'Insights', description: copy.seoDescription }
}

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [articles, copy, { topic }] = await Promise.all([getInsights(), getPage('insights'), searchParams])
  const selected = insightTopics.find((item) => item.toLowerCase() === topic)
  const featured = articles.find((article) => article.featured) ?? articles[0]
  const list = selected ? articles.filter((article) => article.topic === selected) : articles.filter((article) => article !== featured)
  const counts = Object.fromEntries(insightTopics.map((t) => [t, articles.filter((a) => a.topic === t).length]))

  return (
    <>
      <PageHero copy={copy} art={<BurstFingerprint seed="good-questions" topic="Strategy" className="block aspect-[3/2] w-full max-lg:aspect-[5/2]" />} />
      <div className="wrap pt-8 pb-[clamp(64px,8vw,120px)]">
        <nav aria-label="Filter insights by topic" className="mb-10 flex flex-wrap items-center gap-2 border-b border-border pb-5 text-sm font-bold">
          {['All', ...insightTopics].map((label) => {
            const active = label === (selected || 'All')
            const count = label === 'All' ? articles.length : counts[label]
            return (
              <Link key={label} aria-current={active ? 'page' : undefined} href={label === 'All' ? '/insights' : `/insights?topic=${label.toLowerCase()}`} className={`rounded-full px-4 py-2.5 ${active ? 'bg-ink text-white' : 'bg-warm text-ink hover:bg-magenta-tint'}`}>
                {label} <span className={active ? 'text-white/60' : 'text-ink/50'}>{count}</span>
              </Link>
            )
          })}
        </nav>

        {!selected && featured && (
          <Link href={`/insights/${encodeURIComponent(featured.slug)}`} className="insight-lead group grid overflow-hidden rounded-2xl bg-night text-white lg:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col justify-center p-[clamp(24px,5vw,64px)]">
              <p className="text-sm font-semibold text-magenta-soft">{featured.topic} · {readingMinutes(featured)} min read</p>
              <h2 className="mt-3 type-title max-w-[18ch] text-pretty text-white">{featured.title}</h2>
              <p className="mt-4 max-w-[46ch] text-lg text-white/80">{featured.summary}</p>
              <span className="mt-7 inline-flex items-center gap-2 font-bold text-white link-underline w-fit">Read the insight <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
            </div>
            <InsightArt article={featured} className="h-full min-h-[260px] w-full" />
          </Link>
        )}

        {list.length > 0 && (
          <ol className="mt-12 border-t border-ink">
            {list.map((article, i) => (
              <li key={article.slug} className="border-b border-border">
                <Link href={`/insights/${encodeURIComponent(article.slug)}`} className="insight-row group grid items-center gap-x-8 gap-y-4 py-7 md:grid-cols-[4rem_1fr_minmax(0,260px)]">
                  <span aria-hidden className="text-[clamp(2rem,3vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] text-ink/55 group-hover:text-magenta">{String(i + (selected ? 1 : 2)).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-semibold text-magenta-dark">{article.topic} · {readingMinutes(article)} min read</p>
                    <h2 className="mt-1.5 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-pretty group-hover:text-magenta-dark">{article.title}</h2>
                    <p className="mt-2 max-w-[60ch]">{article.summary}</p>
                  </div>
                  <div className="overflow-hidden rounded-xl"><InsightArt article={article} className="aspect-[8/5] w-full transition-transform duration-500 group-hover:scale-105" /></div>
                </Link>
              </li>
            ))}
          </ol>
        )}
        {selected && list.length === 0 && <p>No insights in {selected.toLowerCase()} yet. <Link href="/insights" className="link-underline">Browse all insights</Link>.</p>}
      </div>
    </>
  )
}
