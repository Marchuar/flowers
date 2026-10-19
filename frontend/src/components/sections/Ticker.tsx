import { useTranslation } from 'react-i18next'

function TickerItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-6 px-3 whitespace-nowrap">
      <span className="font-sans text-[11px] font-[500] tracking-[0.14em] text-text-secondary/75">
        {text}
      </span>
      <span className="text-lg leading-none text-accent/50">·</span>
    </span>
  )
}

export default function Ticker() {
  const { t } = useTranslation()
  const items = t('ticker.items', { returnObjects: true }) as string[]
  const allItems = [...items, ...items, ...items, ...items]

  return (
    <div
      className="overflow-hidden py-3.5 bg-bg-subtle border-t border-b border-border/40"
      aria-hidden="true"
    >
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
