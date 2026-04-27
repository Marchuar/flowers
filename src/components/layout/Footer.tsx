import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const flowerSlugs = ['roses', 'tulips', 'peonies', 'chrysanthemum', 'eustoma', 'wildflowers']

export default function Footer() {
  const { t } = useTranslation()

  const flowers = flowerSlugs.map(slug => ({
    name: t(`products.${slug}.name`),
    href: '/shop',
  }))

  const info = [
    { name: t('footer.aboutUs'),     href: '/about' },
    { name: t('footer.howItWorks'),  href: '/how-it-works' },
  ]

  return (
    <footer className="bg-ink text-ink-text/65 pt-16 pb-8 px-6 md:px-10 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">

        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12">
          <div>
            <Link
              to="/"
              className="font-brand text-[36px] font-bold tracking-[0.22em] text-ink-text mb-3 block hover:text-accent transition-colors duration-300 leading-none"
            >
              STEM
            </Link>
            <p className="font-sans text-[13px] font-[400] max-w-xs text-ink-text/60 mt-3 leading-relaxed">
              {t('footer.tagline').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 rounded-full border border-ink-text/[0.15] flex items-center justify-center hover:bg-ink-text/10 hover:border-ink-text/30 transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-ink-text/60 group-hover:text-ink-text transition-colors duration-300">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="relative border-t border-b border-ink-text/[0.08]">

          {/* STEM watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
            aria-hidden
          >
            <span
              className="font-brand font-bold leading-none tracking-[0.18em] whitespace-nowrap text-ink-text"
              style={{
                fontSize: 'clamp(100px, 20vw, 260px)',
                opacity: 0.038,
              }}
            >
              STEM
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 py-12">
            <div>
              <div className="eyebrow text-ink-text/30 mb-5">{t('footer.flowersHeading')}</div>
              <ul className="flex flex-col gap-2.5">
                {flowers.map(f => (
                  <li key={f.name}>
                    <Link
                      to={f.href}
                      className="font-sans text-[13px] text-ink-text/55 hover:text-ink-text transition-colors duration-200"
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-ink-text/30 mb-5">{t('footer.infoHeading')}</div>
              <ul className="flex flex-col gap-2.5">
                {info.map(i => (
                  <li key={i.name}>
                    <Link
                      to={i.href}
                      className="font-sans text-[13px] text-ink-text/55 hover:text-ink-text transition-colors duration-200"
                    >
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-ink-text/30 mb-5">{t('footer.contactHeading')}</div>
              <ul className="flex flex-col gap-2.5">
                <li><span className="font-sans text-[13px] text-ink-text/55">Instagram</span></li>
                <li><span className="font-sans text-[13px] text-ink-text/55">hello@stem.pl</span></li>
                <li><span className="font-sans text-[13px] text-ink-text/55">Warsaw, Poland</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-sans text-[11.5px] font-[450] text-ink-text/40">{t('footer.copyright')}</p>
          <p className="font-sans text-[11.5px] font-[450] text-ink-text/35">{t('footer.orders')}</p>
        </div>
      </div>
    </footer>
  )
}
