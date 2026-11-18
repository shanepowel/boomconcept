import Image from 'next/image'
import { workplace } from '@/lib/data'
import { cn } from '@/lib/utils'

/** The five Great Place To Work® 2026 Best Workplaces badges, supplied by BOOM!. */
export function WorkplaceBadges({
  size = 'md',
  showRanks = false,
  dark = false,
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  showRanks?: boolean
  dark?: boolean
  className?: string
}) {
  if (showRanks) {
    return (
      <ul className={cn('grid grid-cols-3 gap-4 sm:grid-cols-5', className)} aria-label="Great Place To Work® Best Workplaces 2026">
        {workplace.badges.map((b) => (
          <li key={b.src}>
            <a href={workplace.source} title={`${b.rank} ${b.label}`}>
              <Image src={b.src} alt={b.alt} width={252} height={252} className="aspect-square w-full rounded-sm shadow-sm" />
            </a>
            <p className={cn('mt-2 text-[13px] leading-snug', dark ? 'text-[#d0ccd6]' : 'text-body')}>
              <strong className={dark ? 'text-magenta-soft' : 'text-magenta'}>{b.rank}</strong>
              <span className="block">{b.label}</span>
            </p>
          </li>
        ))}
      </ul>
    )
  }

  const [main, ...rest] = workplace.badges
  const big = { sm: 'size-16', md: 'size-28 sm:size-32', lg: 'size-32 sm:size-40' }[size]
  const small = { sm: 'size-12', md: 'size-20 sm:size-24', lg: 'size-24 sm:size-28' }[size]
  return (
    <ul className={cn('flex flex-wrap items-end gap-3', className)} aria-label="Great Place To Work® Best Workplaces 2026">
      <li>
        <a href={workplace.source} title={`${main.rank} ${main.label}`}>
          <Image src={main.src} alt={main.alt} width={554} height={554} className={cn(big, 'rounded-sm shadow-sm')} />
        </a>
      </li>
      {rest.map((b) => (
        <li key={b.src}>
          <a href={workplace.source} title={`${b.rank} ${b.label}`}>
            <Image src={b.src} alt={b.alt} width={252} height={252} className={cn(small, 'rounded-sm shadow-sm')} />
          </a>
        </li>
      ))}
    </ul>
  )
}
