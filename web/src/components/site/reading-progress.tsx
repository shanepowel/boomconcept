'use client'

import { useEffect, useRef } from 'react'

/** A thin burst-coloured bar under the header that fills as you read the article. */
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const article = document.querySelector(target)
    if (!article || !bar.current) return
    let frame = 0
    const update = () => {
      frame = 0
      const box = article.getBoundingClientRect()
      const total = box.height - window.innerHeight * 0.6
      const done = Math.min(1, Math.max(0, -box.top / Math.max(total, 1)))
      bar.current?.style.setProperty('--progress', String(done))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [target])

  return <div ref={bar} aria-hidden className="reading-progress" />
}
