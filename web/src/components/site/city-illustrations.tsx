// Simple line illustrations of each office city, drawn for the site in the brand style.
// Strokes use currentColor; accents use the magenta and burst colours.

type Props = { className?: string }

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function LondonIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden>
      {/* London Eye */}
      <g {...stroke} opacity={0.55}>
        <circle cx="178" cy="66" r="38" />
        <circle cx="178" cy="66" r="3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6
          return <line key={i} x1={178} y1={66} x2={178 + 38 * Math.cos(a)} y2={66 + 38 * Math.sin(a)} />
        })}
        <path d="M166 120 L178 66 L190 120" />
      </g>
      {/* Elizabeth Tower */}
      <g {...stroke}>
        <path d="M62 120 V60 H86 V120" />
        <path d="M60 60 H88 V48 H60 Z" />
        <circle cx="74" cy="38" r="8" />
        <path d="M60 30 H88 L74 8 Z" />
        <line x1="74" y1="8" x2="74" y2="2" />
        <path d="M68 70 H80 M68 82 H80 M68 94 H80 M68 106 H80" opacity={0.6} />
      </g>
      <circle cx="74" cy="38" r="2.5" fill="#d90070" />
      {/* Westminster skyline */}
      <path d="M20 120 V96 H34 V86 H44 V120 M86 120 V100 H100 V92 H112 V120 M112 120 V104 H128 V120" {...stroke} opacity={0.75} />
      <path d="M10 120 H230" {...stroke} />
      <path d="M14 128 Q30 124 46 128 T78 128 T110 128 T142 128 T174 128 T206 128 T230 128" fill="none" stroke="#ff5aa8" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function BournemouthIllustration({ className }: Props) {
  const huts = ['#d90070', '#19b5d6', '#f6c343', '#8a2bb8', '#ff5aa8']
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden>
      {/* Sun */}
      <circle cx="196" cy="34" r="14" fill="none" stroke="#f6c343" strokeWidth={2.4} />
      <g stroke="#f6c343" strokeWidth={2.4} strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          return <line key={i} x1={196 + 20 * Math.cos(a)} y1={34 + 20 * Math.sin(a)} x2={196 + 26 * Math.cos(a)} y2={34 + 26 * Math.sin(a)} />
        })}
      </g>
      {/* Pier */}
      <g {...stroke}>
        <path d="M96 78 H232" />
        <path d="M96 72 H232" opacity={0.6} />
        {[104, 124, 144, 164, 184, 204, 224].map((x) => (
          <line key={x} x1={x} y1={78} x2={x} y2={110} />
        ))}
        <path d="M206 72 V58 Q216 48 226 58 V72" />
      </g>
      {/* Beach huts */}
      {huts.map((c, i) => {
        const x = 12 + i * 17
        return (
          <g key={c}>
            <path d={`M${x} 104 V88 L${x + 7} 80 L${x + 14} 88 V104 Z`} fill={c} opacity={0.9} />
            <path d={`M${x + 4} 104 V94 H${x + 10} V104`} fill="none" stroke="#0e0d12" strokeWidth={1.4} opacity={0.6} />
          </g>
        )
      })}
      {/* Sand and sea */}
      <path d="M6 104 H100 Q110 104 116 110" {...stroke} />
      <path d="M100 116 Q116 112 132 116 T164 116 T196 116 T234 116" fill="none" stroke="#19b5d6" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M86 128 Q102 124 118 128 T150 128 T182 128 T214 128 T234 128" fill="none" stroke="#ff5aa8" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function CopenhagenIllustration({ className }: Props) {
  const houses = [
    { x: 14, w: 30, h: 58, c: '#f6c343' },
    { x: 44, w: 26, h: 70, c: '#d90070' },
    { x: 70, w: 30, h: 62, c: '#19b5d6' },
    { x: 100, w: 26, h: 74, c: '#ff5aa8' },
    { x: 126, w: 30, h: 60, c: '#8a2bb8' },
    { x: 156, w: 26, h: 68, c: '#f6c343' },
  ]
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden>
      {/* Nyhavn houses with stepped gables */}
      {houses.map(({ x, w, h, c }) => {
        const top = 112 - h
        const s = w / 6
        const gable = `M${x} 112 V${top + 10} H${x + s} V${top + 5} H${x + 2 * s} V${top} H${x + 4 * s} V${top + 5} H${x + 5 * s} V${top + 10} H${x + w} V112 Z`
        return (
          <g key={x}>
            <path d={gable} fill={c} opacity={0.88} />
            {[0, 1, 2].map((r) =>
              [0, 1].map((col) => (
                <rect key={`${r}-${col}`} x={x + 6 + col * (w - 18)} y={top + 18 + r * 14} width={6} height={8} fill="#0e0d12" opacity={0.45} rx={1} />
              )),
            )}
          </g>
        )
      })}
      <path d="M8 112 H232" {...stroke} />
      {/* Boat with mast */}
      <g {...stroke}>
        <path d="M184 112 H228 L220 124 H192 Z" />
        <line x1="204" y1="112" x2="204" y2="62" />
        <path d="M204 66 L224 104 H204" opacity={0.7} />
      </g>
      <path d="M8 130 Q24 126 40 130 T72 130 T104 130 T136 130 T168 130 T200 130 T232 130" fill="none" stroke="#19b5d6" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export const cityIllustrations: Record<string, (p: Props) => React.JSX.Element> = {
  london: LondonIllustration,
  bournemouth: BournemouthIllustration,
  copenhagen: CopenhagenIllustration,
}
