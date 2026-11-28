import Image from 'next/image'
import type { Insight } from '@/content/insights'
import { Burst } from './burst'

const topicSeeds: Record<string, number> = { science: 41, strategy: 7, technology: 23 }

export function InsightArt({ article }: { article: Insight }) {
  if (article.image) {
    return <Image src={article.image.src} alt={article.image.alt} width={1200} height={750} sizes="(min-width: 1024px) 52vw, 90vw" className="aspect-[8/5] w-full object-cover" />
  }

  return (
    <div aria-hidden className="relative aspect-[8/5] w-full overflow-hidden bg-night">
      <Burst className="absolute inset-0 h-full w-full" seed={topicSeeds[article.topic.toLowerCase()] ?? 18} originX={0.5} originY={0.5} followNarrow={false} />
    </div>
  )
}
