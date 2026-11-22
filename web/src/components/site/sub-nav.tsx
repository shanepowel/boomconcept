/** In-page section links that stick under the header on long pages. */
export function SubNav({ items, label = 'On this page' }: { items: { id: string; label: string; number?: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="sticky top-[76px] z-30 border-b border-border bg-white/95 backdrop-blur">
      <ul className="wrap flex gap-x-7 overflow-x-auto py-3.5 text-[15px] font-semibold whitespace-nowrap text-ink [scrollbar-width:none]">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="hover:text-magenta">
              {item.number ? <span className="mr-1.5 text-magenta">{item.number}</span> : null}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
