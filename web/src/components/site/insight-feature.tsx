import { InsightArt } from './insight-art'
import { Eyebrow, TextLink } from './blocks'
import type { Insight } from '@/content/insights'

export function InsightFeature({ article }: { article: Insight }) {
  return (
    <article className="grid overflow-hidden border border-ink/20 lg:grid-cols-[1.06fr_1fr]">
      <div className="grid content-center bg-warm p-[clamp(24px,5vw,68px)]">
        <Eyebrow>{article.topic}</Eyebrow>
        <h2 className="type-title max-w-[19ch] text-pretty">{article.title}</h2>
        <p className="mt-4 max-w-[46ch]">{article.summary}</p>
        <div className="mt-6"><TextLink href={`/insights/${encodeURIComponent(article.slug)}`}>Read the insight</TextLink></div>
      </div>
      <InsightArt article={article} />
    </article>
  )
}
