const items = [
  'NO MIDDLEMAN',
  'WHOLESALE PRICE',
  '2H DELIVERY',
  'ECO PACKAGING',
  'FRESH DAILY',
  'WARSAW',
  'ORDER BY 9PM',
  'FREE CARE CARD',
]

function TickerItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-6 px-3 whitespace-nowrap">
      <span className="font-sans text-[11px] font-[500] tracking-[0.14em] text-bg/80">{text}</span>
      <span className="text-accent text-lg leading-none">·</span>
    </span>
  )
}

export default function Ticker() {
  const allItems = [...items, ...items, ...items, ...items]

  return (
    <div className="bg-bark overflow-hidden py-3.5 border-y border-surface/5" aria-hidden="true">
      <div
        className="flex w-max"
        style={{ animation: 'marquee 28s linear infinite', willChange: 'transform' }}
      >
        {allItems.map((item, i) => (
          <TickerItem key={i} text={item} />
        ))}
      </div>
    </div>
  )
}
