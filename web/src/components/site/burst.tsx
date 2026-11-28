'use client'

import { useEffect, useRef } from 'react'

/**
 * A colour-powder explosion drawn on canvas, in the colours of the BOOM! fuse spark.
 * Original artwork generated in code: no stock imagery. It bursts once on load, then drifts.
 * With reduced motion it renders the settled cloud as a still image.
 */

const PALETTE = ['#e5007d', '#ff5fae', '#7a2fb5', '#4b2bd1', '#1fa8e0', '#5fd0f5', '#e8333c', '#ff8a3d']

type Speck = { a: number; d: number; r: number; c: string; alpha: number; delay: number; wobble: number; phase: number }

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function build(count: number, seed = 18) {
  const rand = rng(seed)
  const jets = Array.from({ length: 22 }, () => ({ a: rand() * Math.PI * 2, reach: 0.45 + rand() * 0.6, c: PALETTE[Math.floor(rand() * PALETTE.length)] }))
  const clouds: Speck[] = []
  const specks: Speck[] = []

  // Soft clouds of colour, gathered around the jets so the burst has direction.
  for (let i = 0; i < 170; i++) {
    const jet = jets[Math.floor(rand() * jets.length)]
    const d = Math.pow(rand(), 1.3) * 0.62 * jet.reach
    clouds.push({
      a: jet.a + (rand() - 0.5) * (0.5 - d * 0.4),
      d,
      r: 0.03 + (0.16 - d * 0.14) * rand() + 0.02,
      c: rand() < 0.8 ? jet.c : PALETTE[Math.floor(rand() * PALETTE.length)],
      alpha: 0.18 + rand() * 0.32,
      delay: rand() * 0.12,
      wobble: 0.004 + rand() * 0.01,
      phase: rand() * Math.PI * 2,
    })
  }

  // Fine powder: dense in the core, streaking out along the jets.
  for (let i = 0; i < count; i++) {
    const onJet = rand() < 0.65
    const jet = jets[Math.floor(rand() * jets.length)]
    const a = onJet ? jet.a + (rand() - 0.5) * 0.22 * (1 - rand() * 0.7) : rand() * Math.PI * 2
    const d = onJet ? Math.pow(rand(), 0.75) * jet.reach : Math.pow(rand(), 2.2) * 0.35
    specks.push({
      a,
      d,
      r: 0.5 + Math.pow(rand(), 2.5) * 2.6,
      c: onJet && rand() < 0.8 ? jet.c : PALETTE[Math.floor(rand() * PALETTE.length)],
      alpha: 0.35 + rand() * 0.6,
      delay: rand() * 0.18,
      wobble: 0.002 + rand() * 0.006,
      phase: rand() * Math.PI * 2,
    })
  }
  return { clouds, specks }
}

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4)

export function Burst({ className, originX = 0.62, originY = 0.48, seed = 18, followNarrow = true }: { className?: string; originX?: number; originY?: number; seed?: number; followNarrow?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let scene = build(3400, seed)
    let frame = 0
    let start = 0
    let visible = true

    const resize = () => {
      const box = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = box.width
      height = box.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scene = build(width < 640 ? 1600 : 3400, seed)
    }

    const draw = (time: number) => {
      const elapsed = (time - start) / 1000
      const size = Math.min(Math.max(width, height) * 0.62, Math.min(width, height) * 1.05)
      // On narrow screens the text sits low, so the burst moves up and out of its way.
      const narrow = followNarrow && width < 1024
      const ox = width * (narrow ? 0.62 : originX)
      const oy = height * (narrow ? 0.26 : originY)
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'screen'

      for (const cloud of scene.clouds) {
        const p = reduced ? 1 : easeOut((elapsed - cloud.delay) / 1.6)
        if (p <= 0) continue
        const drift = reduced ? 0 : Math.sin(elapsed * 0.4 + cloud.phase) * cloud.wobble * size
        const x = ox + Math.cos(cloud.a) * cloud.d * size * p + drift
        const y = oy + Math.sin(cloud.a) * cloud.d * size * p + drift * 0.6
        const r = cloud.r * size * (0.4 + 0.6 * p)
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, cloud.c)
        g.addColorStop(1, 'transparent')
        ctx.globalAlpha = cloud.alpha * Math.min(1, p * 1.4)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const speck of scene.specks) {
        const p = reduced ? 1 : easeOut((elapsed - speck.delay) / 1.25)
        if (p <= 0) continue
        const drift = reduced ? 0 : Math.sin(elapsed * 0.6 + speck.phase) * speck.wobble * size
        const x = ox + Math.cos(speck.a) * speck.d * size * p + drift
        const y = oy + Math.sin(speck.a) * speck.d * size * p + drift
        ctx.globalAlpha = speck.alpha * (1 - speck.d * 0.45)
        ctx.fillStyle = speck.c
        ctx.beginPath()
        ctx.arc(x, y, speck.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // The flash at the moment of the bang.
      if (!reduced && elapsed < 0.6) {
        const flash = ctx.createRadialGradient(ox, oy, 0, ox, oy, size * 0.35)
        flash.addColorStop(0, 'rgba(255,255,255,0.9)')
        flash.addColorStop(1, 'transparent')
        ctx.globalAlpha = 1 - elapsed / 0.6
        ctx.fillStyle = flash
        ctx.fillRect(0, 0, width, height)
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      if (!reduced && visible) frame = requestAnimationFrame(draw)
    }

    resize()
    const onResize = () => {
      resize()
      if (reduced) draw(performance.now())
    }
    window.addEventListener('resize', onResize)

    const observer = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (!reduced && visible && !was) frame = requestAnimationFrame(draw)
    })
    observer.observe(canvas)

    start = performance.now()
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [originX, originY, seed, followNarrow])

  return <canvas ref={ref} aria-hidden className={className} />
}
