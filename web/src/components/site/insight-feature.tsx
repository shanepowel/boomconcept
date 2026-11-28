import { InsightArt } from './insight-art'
import { Eyebrow, TextLink } from './blocks'
import type { Insight } from '@/content/insights'

export function InsightFeature({ article, showArt = true }: { article: Insight; showArt?: boolean }) {
  return (
    <article className={showArt ? 'grid overflow-hidden border border-ink/20 lg:grid-cols-[1.06fr_1fr]' : 'overflow-hidden border border-ink/20'}>
      <div className="grid content-center bg-warm p-[clamp(24px,5vw,68px)]">
        <Eyebrow>{article.topic}</Eyebrow>
        <h2 className={`type-title text-pretty ${showArt ? 'max-w-[19ch]' : 'max-w-[28ch]'}`}>{article.title}</h2>
        <p className="mt-4 max-w-[46ch]">{article.summary}</p>
        <div className="mt-6"><TextLink href={`/insights/${encodeURIComponent(article.slug)}`}>Read the insight</TextLink></div>
      </div>
      {showArt && <InsightArt article={article} />}
    </article>
  )
}
