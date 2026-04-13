export default function Footer() {
  const flowers = ['Roses', 'Tulips', 'Peonies', 'Chrysanthemum', 'Eustoma', 'Wildflowers']
  const info = ['About us', 'How it works', 'Delivery zones', 'FAQ', 'Privacy policy']
  const contact = ['Instagram', 'hello@stem.pl', 'Warsaw, Poland']

  return (
    <footer className="bg-text-primary text-surface/70 pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-surface/10">
          <div>
            <div className="font-display text-5xl font-light tracking-[0.2em] text-surface mb-3">STEM</div>
            <p className="font-sans text-sm font-light max-w-xs">
              Fresh flowers at wholesale prices. No markup, no floristry, just beautiful stems.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com" className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center hover:bg-surface/10 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12">
          <div>
            <div className="eyebrow text-surface/40 mb-4">Flowers</div>
            <ul className="flex flex-col gap-2">
              {flowers.map(f => (
                <li key={f}><a onClick={e => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }} className="font-sans text-sm hover:text-surface transition-colors">{f}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-surface/40 mb-4">Info</div>
            <ul className="flex flex-col gap-2">
              {info.map(i => (
                <li key={i}><a href="#" className="font-sans text-sm hover:text-surface transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-surface/40 mb-4">Contact</div>
            <ul className="flex flex-col gap-2">
              {contact.map(c => (
                <li key={c}><span className="font-sans text-sm">{c}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-surface/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-sans text-xs text-surface/40">© 2025 STEM · Warsaw, Poland · Fresh daily</p>
          <p className="font-sans text-xs text-surface/30">Orders accepted 9:00–21:00 every day</p>
        </div>
      </div>
    </footer>
  )
}
