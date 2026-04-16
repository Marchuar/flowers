import { Link } from 'react-router-dom'

const flowers = [
  { name: 'Roses', href: '/shop' },
  { name: 'Tulips', href: '/shop' },
  { name: 'Peonies', href: '/shop' },
  { name: 'Chrysanthemum', href: '/shop' },
  { name: 'Eustoma', href: '/shop' },
  { name: 'Wildflowers', href: '/shop' },
]

const info = [
  { name: 'About us', href: '/about' },
  { name: 'How it works', href: '/how-it-works' },
]

export default function Footer() {
  return (
    <footer className="bg-text-primary text-surface/65 pt-16 pb-8 px-6 md:px-10 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">

        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12">
          <div>
            <Link
              to="/"
              className="font-brand text-[44px] font-bold tracking-[0.2em] text-surface mb-3 block hover:text-accent transition-colors duration-300 leading-none"
            >
              STEM
            </Link>
            <p className="font-sans text-[13px] font-light max-w-xs text-surface/50 mt-3 leading-relaxed">
              Fresh flowers at wholesale prices.<br />
              No markup, no floristry, just beautiful stems.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 rounded-full border border-surface/[0.15] flex items-center justify-center hover:bg-surface/10 hover:border-surface/30 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-surface/60 group-hover:text-surface transition-colors duration-300">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links — watermark lives inside this section, between the two border lines */}
        <div className="relative border-t border-b border-surface/[0.08]">

          {/* STEM watermark — centered exactly between the two border lines */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
            aria-hidden
          >
            <span
              className="font-brand font-normal leading-none tracking-[0.18em] whitespace-nowrap"
              style={{
                fontSize: 'clamp(100px, 20vw, 260px)',
                color: 'rgba(253,250,245,0.038)',
              }}
            >
              STEM
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 py-12">
            <div>
              <div className="eyebrow text-surface/30 mb-5">Flowers</div>
              <ul className="flex flex-col gap-2.5">
                {flowers.map(f => (
                  <li key={f.name}>
                    <Link
                      to={f.href}
                      className="font-sans text-[13px] text-surface/55 hover:text-surface transition-colors duration-200"
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-surface/30 mb-5">Info</div>
              <ul className="flex flex-col gap-2.5">
                {info.map(i => (
                  <li key={i.name}>
                    <Link
                      to={i.href}
                      className="font-sans text-[13px] text-surface/55 hover:text-surface transition-colors duration-200"
                    >
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-surface/30 mb-5">Contact</div>
              <ul className="flex flex-col gap-2.5">
                <li><span className="font-sans text-[13px] text-surface/55">Instagram</span></li>
                <li><span className="font-sans text-[13px] text-surface/55">hello@stem.pl</span></li>
                <li><span className="font-sans text-[13px] text-surface/55">Warsaw, Poland</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-sans text-[11.5px] text-surface/30">© 2026 STEM · Warsaw, Poland · Fresh daily</p>
          <p className="font-sans text-[11.5px] text-surface/25">Orders 9:00–21:00 every day</p>
        </div>
      </div>
    </footer>
  )
}
