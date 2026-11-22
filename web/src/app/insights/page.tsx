import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, PageHero } from '@/components/site/blocks'
import { InsightArt } from '@/components/site/insight-art'
import { InsightFeature } from '@/components/site/insight-feature'
import { insightTopics } from '@/content/insights'
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

  return (
    <>
      <PageHero copy={copy} artwork="press" />
      <div className="wrap pt-7 pb-[clamp(64px,8vw,120px)]">
        <nav aria-label="Filter insights by topic" className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4 text-sm font-bold">
          {['All', ...insightTopics].map((label) => {
            const active = label === (selected || 'All')
            return <Link key={label} aria-current={active ? 'page' : undefined} href={label === 'All' ? '/insights' : `/insights?topic=${label.toLowerCase()}`} className={`rounded-full px-4 py-2.5 ${active ? 'bg-ink text-white' : 'bg-warm text-ink hover:bg-magenta-tint'}`}>{label}</Link>
          })}
        </nav>
        {!selected && featured && <InsightFeature article={featured} />}
        {list.length > 0 && (
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:gap-12">
            {list.map((article) => (
              <li key={article.slug}>
                <Link href={`/insights/${encodeURIComponent(article.slug)}`} className="group block border-b border-border pb-6">
                  <InsightArt article={article} />
                  <Eyebrow className="mt-5 mb-2">{article.topic}</Eyebrow>
                  <h2 className="flex items-start justify-between gap-4 text-2xl group-hover:text-magenta-dark">{article.title}<ArrowUpRight className="size-5 shrink-0" aria-hidden /></h2>
                  <p className="mt-2">{article.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {selected && list.length === 0 && <p>No insights in {selected.toLowerCase()} yet. <Link href="/insights" className="link-underline">Browse all insights</Link>.</p>}
      </div>
    </>
  )
}
