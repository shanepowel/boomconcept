import Image from 'next/image'
import type { Insight } from '@/content/insights'

/**
 * A burst "fingerprint": every insight gets its own spark, drawn from its title, in its topic's
 * colours. The same title always draws the same burst, so each article has a recognisable cover.
 */

const PALETTES: Record<string, string[]> = {
  Science: ['#ff5fae', '#e5007d', '#ff9fcf', '#b36bff'],
  Strategy: ['#b36bff', '#7f8bff', '#ff5fae', '#d5b6ff'],
  Technology: ['#5fd0f5', '#7f8bff', '#b9ecff', '#ff5fae'],
}

function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function BurstFingerprint({ seed, topic, className, label }: { seed: string; topic: string; className?: string; label?: string }) {
  const rand = random(hash(seed))
  const colours = PALETTES[topic] ?? PALETTES.Science
  const count = 11 + Math.floor(rand() * 9)
  const cx = 420 + (rand() - 0.5) * 120
  const cy = 250 + (rand() - 0.5) * 60
  const turn = rand() * Math.PI * 2
  const rays = Array.from({ length: count }, (_, i) => {
    const angle = turn + (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.25
    const length = 70 + Math.pow(rand(), 1.4) * 260
    const dots = 2 + Math.floor(rand() * 7)
    return { angle, length, dots, colour: colours[i % colours.length], width: 2 + rand() * 3 }
  })
  const id = `fp-${hash(seed).toString(36)}`

  return (
    <svg viewBox="0 0 800 500" className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-core`}>
          <stop offset="0%" stopColor="#fff" />
          <stop offset="30%" stopColor={colours[0]} />
          <stop offset="100%" stopColor={colours[1]} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-haze`}>
          <stop offset="0%" stopColor={colours[0]} stopOpacity="0.35" />
          <stop offset="100%" stopColor={colours[0]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="var(--night)" />
      <circle cx={cx} cy={cy} r="300" fill={`url(#${id}-haze)`} />
      <g className="fingerprint__rays" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {rays.map((ray, i) => {
          const cos = Math.cos(ray.angle)
          const sin = Math.sin(ray.angle)
          return (
            <g key={i}>
              <line x1={cx + cos * 40} y1={cy + sin * 40} x2={cx + cos * ray.length} y2={cy + sin * ray.length} stroke={ray.colour} strokeWidth={ray.width} strokeLinecap="round" opacity="0.85" />
              {Array.from({ length: ray.dots }, (_, j) => {
                const r = 70 + ((ray.length - 70) * (j + 1)) / (ray.dots + 0.5)
                return <circle key={j} cx={cx + cos * r} cy={cy + sin * r} r={3 + (j === ray.dots - 1 ? 2.5 : 0)} fill={ray.colour} />
              })}
            </g>
          )
        })}
      </g>
      <circle cx={cx} cy={cy} r="70" fill={`url(#${id}-core)`} opacity="0.8" />
    </svg>
  )
}

export function InsightArt({ article, className = 'aspect-[8/5] w-full' }: { article: Insight; className?: string }) {
  if (article.image) {
    return <Image src={article.image.src} alt={article.image.alt} width={1200} height={750} sizes="(min-width: 1024px) 52vw, 90vw" className={`${className} object-cover`} />
  }
  return <BurstFingerprint seed={article.slug} topic={article.topic} className={`fingerprint block ${className}`} />
}
