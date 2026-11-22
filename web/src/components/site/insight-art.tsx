import Image from 'next/image'
import type { Insight } from '@/content/insights'

export function InsightArt({ article }: { article: Insight }) {
  if (article.image) {
    return <Image src={article.image.src} alt={article.image.alt} width={1200} height={750} sizes="(min-width: 1024px) 52vw, 90vw" className="aspect-[8/5] w-full object-cover" />
  }

  return (
    <div aria-hidden className={`insight-art insight-art--${article.topic.toLowerCase()}`}>
      <i /><i /><i /><i /><i />
    </div>
  )
}
